"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('./app/controller/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controller/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

routes
  .post('/user', _UserController2.default.postStore)
  .post('/session', _SessionController2.default.postStore);

routes
  .use(_auth2.default)
  .get('/user', _UserController2.default.getIndex)
  .put('/user', _UserController2.default.update);

exports. default = routes