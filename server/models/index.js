import Sequelize from 'sequelize';
import dbConfig from '../config/db.config.js';

import learnerModel from './learners/learner.model.js';
import genderModel from './learners/gender.model.js';
import passportModel from './learners/passport.model.js';
import learnerDocumentModel from './learners/learner_document.model.js';
import learnerDocumentTypeModel from './learners/learner_document_type.model.js';
import learnersHasLearnerDocumentModel from './learners/learners_has_learner_document.model.js';

import groupModel from './groups/group.model.js';
import groupDocumentModel from './groups/group_document.model.js';
import groupDocumentTypeModel from './groups/group_document_type.model.js';
import groupsHasGroupDocumentModel from './groups/groups_has_group_document.model.js';

import eduProgramModel from './educationPrograms/education_program.model.js';

import recordModel from './record.model.js' //УДАЛИТЬ

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    define: dbConfig.define
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.learnerModel = learnerModel(sequelize, Sequelize);
db.genderModel = genderModel(sequelize, Sequelize);
db.passportModel = passportModel(sequelize, Sequelize);
db.learnerDocumentModel = learnerDocumentModel(sequelize, Sequelize);
db.learnerDocumentTypeModel = learnerDocumentTypeModel(sequelize, Sequelize);
db.learnersHasLearnerDocumentModel = learnersHasLearnerDocumentModel(sequelize, Sequelize);

db.groupModel = groupModel(sequelize, Sequelize);
db.groupDocumentModel = groupDocumentModel(sequelize, Sequelize);
db.groupDocumentTypeModel = groupDocumentTypeModel(sequelize, Sequelize);
db.groupsHasGroupDocumentModel = groupsHasGroupDocumentModel(sequelize, Sequelize);

db.eduProgramModel = eduProgramModel(sequelize, Sequelize);
db.learnerModel = learnerModel(sequelize, Sequelize);

db.recordModel = recordModel(sequelize, Sequelize); // УДАЛИТЬ

export default db;