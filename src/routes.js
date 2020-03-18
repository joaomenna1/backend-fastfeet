import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/Controllers/UserController';
import SessionsController from './app/Controllers/SessionsController';
import RecipientController from './app/Controllers/RecipientController';
import FileController from './app/Controllers/FileController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

/* User admin */
routes.post('/user', authMiddleware, UserController.store);
/* sessions */
routes.post('/sessions', SessionsController.store);

/* routes.use(authMiddleware); */
/* Routes recipients */
routes.post('/recipients/', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

/* Files */
routes.post('/files', upload.single('files'), FileController.store);

export default routes;
