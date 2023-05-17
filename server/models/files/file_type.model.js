export default (sequelize, Sequelize) => {
    const fileTypeModel = sequelize.define("file_type", {
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
    
    return fileTypeModel;
};