import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import databaseConfiguration from '../config/config';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = databaseConfiguration[env];
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable);
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// sequelize.sync({ force: true });

export default db;

