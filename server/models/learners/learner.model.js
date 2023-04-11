import db from '../index.js';
const learnersHasLearnerDocumentModel = db.learnersHasLearnerDocumentModel;
const passportModel = db.passportModel;

export default (sequelize, Sequelize) => {
    const learnerModel = sequelize.define("learner", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        patronymic: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birth_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        employment_place: {
            type: Sequelize.STRING,
            allowNull: false
        },
        working_position: {
            type: Sequelize.STRING,
            allowNull: false
        },
        work_phone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        work_record: {
            type: Sequelize.STRING,
            allowNull: true
        },
        work_record_on_position: {
            type: Sequelize.STRING,
            allowNull: true
        },
        SNILS: {
            type: Sequelize.STRING,
            allowNull: true
        },
        INN: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    learnerModel.hasMany(learnersHasLearnerDocumentModel, { onDelete: "cascade" });
    learnerModel.hasOne(passportModel, { onDelete: "cascade"});
    
    return learnerModel;
};