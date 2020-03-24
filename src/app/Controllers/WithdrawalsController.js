import * as Yup from 'yup';
import { parseISO, isAfter, isBefore, setHours } from 'date-fns';

import Order from '../Models/Order';
import Deliveryman from '../Models/Deliverymen';

class WithdrawalsController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { orderId, deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Delivery does not exists.' });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(401).json({ error: 'Order does not exists.' });
    }

    /* Procuro e conto as vezes daquele entregador tem no banco de dados
    de acordo com WHERE */
    const { count } = await Order.findAndCountAll({
      where: {
        deliveryman_id: deliverymanId,
        start_date: null,
        signature_id: null,
      },
    });

    if (count === 5) {
      return res
        .status(401)
        .json({ error: 'Permitted withdrawal numbers are only 5 times' });
    }

    const { start_date } = req.body;
    const dateISO = parseISO(start_date);

    if (
      isBefore(dateISO, setHours(new Date(), 8)) ||
      isAfter(dateISO, setHours(new Date(), 18))
    ) {
      return res.status(400).json({
        error: 'allowed time is only from 8 am to 6 pm from withdrawals',
      });
    }

    await order.update({ start_date, status: 'RETIRADA' });

    return res.json({});
  }
}

export default new WithdrawalsController();
