import * as Yup from 'yup';
import Deliverymen from '../Models/Deliverymen';
import File from '../Models/File';

class DeliverymanControler {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.string().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const deliverymanExist = await Deliverymen.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExist) {
      return res.status(401).json({ error: 'Deliveryman  exist.' });
    }

    const { name, email } = await Deliverymen.create(req.body);

    return res.json({ name, email, message: 'Deliveryman success created ' });
  }

  async show(req, res) {
    return res.json();
  }

  async index(req, res) {
    const deliverymens = Deliverymen.findAll({
      order: ['id'],
      attributes: ['id', 'name', 'avatar_id', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymens);
  }

  async update(req, res) {
    return res.json();
  }

  async destroy(req, res) {
    return res.json();
  }
}

export default new DeliverymanControler();
