import File from '../Models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }

  async index(req, res) {
    const response = await File.findAll({
      order: ['id'],
      attributes: ['id', 'name', 'path', 'url'],
    });

    return res.json(response);
  }
}

export default new FileController();
