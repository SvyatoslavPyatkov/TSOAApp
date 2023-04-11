export default (sequelize, Sequelize) => {
    const genderModel = sequelize.define("gender", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return genderModel;
};