import * as Yup from 'yup';

import Order from '../Models/Order';
import Recipient from '../Models/Recipient';
import Deliverymen from '../Models/Deliverymen';

/* Etapa importante do projeto não desista! */
class RegisterOrders {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res
        .status(401)
        .json({ error: 'Recipient not found or does not exist.' });
    }

    const deliveryman = await Deliverymen.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res
        .status(401)
        .json({ error: 'Deliveryman not found or does not exist.' });
    }

    const register = await Order.create(req.body);

    return res.json(register);
  }
}

export default new RegisterOrders();
