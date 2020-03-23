import * as Yup from 'yup';

import Order from '../Models/Order';

class WithdrawalsController {
  async update(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { order_id, start_date } = req.body;

    const withdrawlProduct = await Order.findByPk(order_id);

    if (!withdrawlProduct) {
      return res.status(401).json({ error: 'Not found order!' });
    }

    const dateWithdrawl = withdrawlProduct.update({
      start_date,
    });

    return res.json(dateWithdrawl);
  }
}

export default new WithdrawalsController();
