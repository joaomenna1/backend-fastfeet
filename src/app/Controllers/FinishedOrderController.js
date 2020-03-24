import { Op } from 'sequelize';

import Order from '../Models/Order';
import Deliveryman from '../Models/Deliverymen';
import Signature from '../Models/Signature';

class FinishedController {
  async update(req, res) {
    const { deliverymanId, orderId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exists.' });
    }

    const order = await Order.findOne({
      where: {
        id: orderId,
        start_date: { [Op.not]: null },
        signature_id: null,
      },
    });

    if (!order) {
      return res.status(401).json({ error: 'Order delivery does not exists.' });
    }

    const { signature_id } = req.body;

    const signatureExist = await Signature.findByPk(signature_id);

    if (!signatureExist) {
      return res
        .status(401)
        .json({ error: 'Customer signature does not exists.' });
    }

    await order.update({
      end_date: new Date(),
      signature_id,
      status: 'ENTREGUE',
    });

    return res.json({});
  }
}

export default new FinishedController();
