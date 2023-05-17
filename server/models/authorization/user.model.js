export default (sequelize, Sequelize) => {
    const userModel = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
            
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hashed_password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return userModel;
};