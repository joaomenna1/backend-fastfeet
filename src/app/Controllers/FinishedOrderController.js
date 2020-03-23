import * as Yup from 'yup';

import Order from '../Models/Order';

class FinishedController {
  async update(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.number().required(),
      end_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { order_id, end_date } = req.body;

    const withdrawlProduct = await Order.findByPk(order_id);

    if (!withdrawlProduct) {
      return res.status(401).json({ error: 'Not found order!' });
    }

    const dateWithdrawl = withdrawlProduct.update({
      end_date,
    });

    return res.json(dateWithdrawl);
  }
}

export default new FinishedController();
