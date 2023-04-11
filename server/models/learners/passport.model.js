export default (sequelize, Sequelize) => {
    const passportModel = sequelize.define("passport", {
        passport_number: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        passport_series: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        issue_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        issuer: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return passportModel;
};