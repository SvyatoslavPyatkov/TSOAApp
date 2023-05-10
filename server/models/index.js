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
import competenceModel from './educationPrograms/competence.model.js';
import disciplineModel from './educationPrograms/discipline.model.js';


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
db.competenceModel = competenceModel(sequelize, Sequelize);
db.disciplineModel = disciplineModel(sequelize, Sequelize);

// Связи отношений базы данных

//learners и passports 1:1
db.learnerModel.hasOne(db.passportModel, {
    foreignKey: 'learner_id'
})

// genders и learners 1:M
db.genderModel.hasMany(db.learnerModel, {
    foreignKey: 'gender_id'
})

// learners и learner_documents M:N
db.learnerModel.belongsToMany(db.learnerDocumentModel, {
    through: db.learnersHasLearnerDocumentModel,
    foreignKey: 'learner_id'
});
db.learnerDocumentModel.belongsToMany(db.learnerModel, {
    through: db.learnersHasLearnerDocumentModel,
    foreignKey: 'learner_document_id' 
});

// learner_documents и learner_document_types M:1
db.learnerDocumentTypeModel.hasMany(db.learnerDocumentModel, {
    foreignKey: 'learner_document_type_id'
})

// groups и learners 1:M
db.groupModel.hasMany(db.learnerModel, {
    foreignKey: 'group_id'
})

// groups и group_documents супер M:N
db.groupModel.belongsToMany(db.groupDocumentModel, {
    through: db.groupsHasGroupDocumentModel,
    foreignKey: 'group_id'
});
db.groupDocumentModel.belongsToMany(db.groupModel, {
    through: db.groupsHasGroupDocumentModel,
    foreignKey: 'group_document_id'
});

// group_documents и group_document_types M:1
db.groupDocumentTypeModel.hasMany(db.groupDocumentModel, {
    foreignKey: 'group_document_type_id'
});

// education_programs и groups 1:M
db.eduProgramModel.hasMany(db.groupModel, {
    foreignKey: 'education_program_id'
});

// education_programs и competencies 1:M
db.eduProgramModel.hasMany(db.competenceModel, {
    foreignKey: 'education_program_id'
});

// education_programs и disciplines 1:M
db.eduProgramModel.hasMany(db.disciplineModel, {
    foreignKey: 'education_program_id'
});

export default db;