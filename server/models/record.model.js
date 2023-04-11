export default (sequelize, Sequelize) => {
    const recordModel = sequelize.define("record", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
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
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return recordModel;
};