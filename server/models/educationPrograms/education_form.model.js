export default (sequelize, Sequelize) => {
    const eduFormModel = sequelize.define("education_form", {
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
    
    return eduFormModel;
};