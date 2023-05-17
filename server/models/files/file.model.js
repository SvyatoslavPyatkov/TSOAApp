export default (sequelize, Sequelize) => {
    const fileModel = sequelize.define("file", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        original_file_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        extension: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    
    return fileModel;
};