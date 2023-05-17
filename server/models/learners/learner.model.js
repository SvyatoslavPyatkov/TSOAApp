export default (sequelize, Sequelize) => {
    const learnerModel = sequelize.define("learner", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        SNILS: {
            type: Sequelize.STRING,
            allowNull: true
        },
        INN: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    
    return learnerModel;
};