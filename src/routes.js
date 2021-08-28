import { Router } from 'express';

import User from './app/controller/UserController'
import Session from './app/controller/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes
  .post('/user', User.postStore)
  .post('/session', Session.postStore);

routes
  .use(authMiddleware)
  .get('/user', User.getIndex)
  .put('/user', User.update);

export default routes