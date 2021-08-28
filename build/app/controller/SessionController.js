"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class SessionController {
  async postStore(req, res) {
    const { email, password } = req.body

    const user = await _User2.default.findOne({ email: email
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
      token: _jsonwebtoken2.default.sign(
        { id, name, email },
        _auth2.default.secret,
        { expiresIn: _auth2.default.expiresIn }
      )
    })
  }
}

exports. default = new SessionController();