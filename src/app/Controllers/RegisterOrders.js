import * as Yup from 'yup';

import Order from '../Models/Order';

class RegisterOrders {
  async store(req, res) {
    const schema = Yup.object().shape({});

    return res.json();
  }
}

export default new RegisterOrders();
