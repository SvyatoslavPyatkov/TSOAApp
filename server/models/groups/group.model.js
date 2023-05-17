export default (sequelize, Sequelize) => {
    const groupModel = sequelize.define("group", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return groupModel;
};