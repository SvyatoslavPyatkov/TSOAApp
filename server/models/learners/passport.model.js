export default (sequelize, Sequelize) => {
    const passportModel = sequelize.define("passport", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        patronymic: {
            type: Sequelize.STRING,
            allowNull: true
        },
        series: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        issued_by: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        issued_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        birth_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.ENUM("мужской", "женский"),
            allowNull: false
        }
    });

    return passportModel;
};