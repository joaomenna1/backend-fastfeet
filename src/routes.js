import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/Controllers/UserController';
import SessionsController from './app/Controllers/SessionsController';
import RecipientController from './app/Controllers/RecipientController';
import FileController from './app/Controllers/FileController';
import SignatureController from './app/Controllers/SignatureController';
import DeliverymanController from './app/Controllers/DeliverymanController';
import RegisterOrderController from './app/Controllers/RegisterOrdersController';
import WithdrawalsController from './app/Controllers/WithdrawalsController';
import FinishedOrderController from './app/Controllers/FinishedOrderController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

/* User admin */
routes.post('/user', authMiddleware, UserController.store);
/* sessions */
routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);

/* Routes recipients management (Destinatários) */
routes.post('/recipients/', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

/* Routes Delivery management (Entregadores) */
routes.post('/couriers', DeliverymanController.store);
routes.get('/couriers', DeliverymanController.index);
routes.put('/couriers/:id', DeliverymanController.update);
routes.delete('/couriers/:id', DeliverymanController.destroy);

/* Routes Files (avatars) */
routes.post('/files', upload.single('files'), FileController.store);
routes.get('/files', FileController.index);

/* Routes Signatures (assinaturas do destinatários) */
routes.post('/signature', upload.single('sign'), SignatureController.store);

/* Routes for register (product) orders recipient and deliveryman */
routes.post('/register_order', RegisterOrderController.update);

/* Routes for withdrawals product */
routes.put('/withdrawals', WithdrawalsController.update);

/* Router for finished order */
routes.put('/finish_order', FinishedOrderController.update);
export default routes;
