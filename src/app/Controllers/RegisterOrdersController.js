import * as Yup from 'yup';

import Order from '../Models/Order';
import Recipient from '../Models/Recipient';
import Deliverymen from '../Models/Deliverymen';

class RegisterOrdersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

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

    const response = await Order.create({
      product,
      recipient_id,
      deliveryman_id,
      status: 'PENDENTE',
    });

    return res.json(response);
  }
}

export default new RegisterOrdersController();

/*
  funcionalidade para adicionar no futuro
  se o produto existe dentro de bd, verificar se é a mesma palavra
  tanto em maisculo e minusculo
*/
