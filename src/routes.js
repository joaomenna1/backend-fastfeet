import { Router } from 'express';

import UserController from './app/Controllers/UserController';

const routes = new Router();

routes.get('/user', UserController.store);

export default routes;
