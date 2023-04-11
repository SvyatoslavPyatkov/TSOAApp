export default (sequelize, Sequelize) => {
    const groupDocumentTypeModel = sequelize.define("group_document_type", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return groupDocumentTypeModel;
};