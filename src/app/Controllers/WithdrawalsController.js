import * as Yup from 'yup';

import Order from '../Models/Order';

class WithdrawalsController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { start_date } = req.body;
    const { order_id } = req.params;

    const withdrawalProduct = await Order.findByPk(order_id);

    if (!withdrawalProduct) {
      return res.status(401).json({ error: 'Not found order!' });
    }

    const {
      id,
      recipient_id,
      delivery_id,
      signature_id,
      product,
      canceled_at,
      end_date,
    } = withdrawalProduct.update({
      start_date,
    });

    return res.json({
      id,
      recipient_id,
      delivery_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });
  }
}

export default new WithdrawalsController();
