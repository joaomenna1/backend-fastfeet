import Sequelize from 'sequelize';

import User from '../app/Models/User';
import Recipient from '../app/Models/Recipient';
import File from '../app/Models/File';
import Deliveryman from '../app/Models/Deliverymen';

import databaseConfig from '../config/database';

const models = [User, Recipient, File, Deliveryman];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
