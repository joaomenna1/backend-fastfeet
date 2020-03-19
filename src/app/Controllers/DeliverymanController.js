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
    const { page = 1 } = req.query;

    const response = await Deliverymen.findAll({
      order: ['id'],
      attributes: ['id', 'name', 'email', 'avatar_id'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id } = req.params;

    const deliveryman = await Deliverymen.findByPk(id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    const { name, email } = req.body;

    await deliveryman.update({ name, email });

    return res.json({ name, email });
  }

  // eslint-disable-next-line consistent-return
  async destroy(req, res) {
    const { id } = req.params;
    const deliverymanExist = await Deliverymen.findByPk(id);

    if (!deliverymanExist) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    await Deliverymen.destroy({
      where: { id: req.params.id },
    })
      .then(() => res.json({ message: 'removed.' }))
      .catch(() => res.json({ error: 'fails in methods remove' }));
  }
}

export default new DeliverymanControler();
