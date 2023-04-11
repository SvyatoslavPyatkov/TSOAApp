export default (sequelize, Sequelize) => {
    const learnerDocumentTypeModel = sequelize.define("learner_document_type", {
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
    
    return learnerDocumentTypeModel;
};