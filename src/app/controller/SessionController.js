import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async postStore(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email: email
    });

    if(!user) {
      return res.status(401).json({ message: 'User unauthorized' });
    }

    if(!(await user.checkPassword(password))) {
      return res.status(400).json({ message: 'Password incorrect'})
    }

    const { id, name } = user;

    return res.status(200).json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign(
        { id, name, email },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      )
    })
  }
}

export default new SessionController();