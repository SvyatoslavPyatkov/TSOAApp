export default (sequelize, Sequelize) => {
    const learnersHasLearnerDocumentModel = sequelize.define("learners_has_learner_document", {
        learner_id: {
            type: Sequelize.INTEGER,
            references: {
                model: learnerModel,
                key: 'id'
            }
        },
        learner_document_id: {
            type: Sequelize.INTEGER,
            references: {
                model: learnerDocumentModel,
                key: 'id'
            }
        }
    });
    
    return learnersHasLearnerDocumentModel;
};