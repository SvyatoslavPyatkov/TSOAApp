import Sequelize from 'sequelize';
import dbConfig from '../config/db.config.js';
import recordModel from './record.model.js'

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    define: dbConfig.define
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.recordModel = recordModel(sequelize, Sequelize);

export default db;