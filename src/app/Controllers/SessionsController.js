import jwt from 'jsonwebtoken';

import User from '../Models/User';


class SessionController {
  async store(req, res) {
    return res.json({"ok"});
  }
}

export default new SessionController();
