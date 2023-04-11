export default (sequelize, Sequelize) => {
    const groupsHasgroupDocumentModel = sequelize.define("groups_has_group_document", {
        group_id: {
            type: Sequelize.INTEGER,
            references: {
                model: groupModel,
                key: 'id'
            }
        },
        group_document_id: {
            type: Sequelize.INTEGER,
            references: {
                model: groupDocumentModel,
                key: 'id'
            }
        }
    });
    
    return groupsHasgroupDocumentModel;
};