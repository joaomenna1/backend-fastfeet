import * as Yup from 'yup';

import Recipient from '../Models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validations fails' });
    }

    const recipientExist = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExist) {
      return res.status(400).json({ error: 'recipient already exist!' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await Recipient.create(req.body, { new: true });

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Validations fails' });
    }

    const { name, street, number, complement, state, city, cep } = req.body;

    await recipient.update({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });

    return res.json({ name, street, number, complement, state, city, cep });
  }
}

export default new RecipientController();
