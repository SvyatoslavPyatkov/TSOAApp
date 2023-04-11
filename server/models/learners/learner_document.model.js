export default (sequelize, Sequelize) => {
    const learnerDocumentModel = sequelize.define("learner_document", {
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
        document_path: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return learnerDocumentModel;
};