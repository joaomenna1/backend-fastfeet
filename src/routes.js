import { Router } from 'express';

import UserController from './app/Controllers/UserController';
import SessionsController from './app/Controllers/SessionsController';
import RecipientController from './app/Controllers/RecipientController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/sessions', SessionsController.store);
routes.post('/user', authMiddleware, UserController.store);

/* Routes recipients */
routes.post('/recipients/', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
