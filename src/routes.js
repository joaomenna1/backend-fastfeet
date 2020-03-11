import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'server ok' }));

export default routes;
