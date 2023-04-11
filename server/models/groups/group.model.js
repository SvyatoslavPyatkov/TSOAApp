export default (sequelize, Sequelize) => {
    const groupModel = sequelize.define("group", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        enrollment_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        expulsion_date: {
            type: Sequelize.DATEONLY,
            allowNull: true
        }
    });
    
    return groupModel;
};