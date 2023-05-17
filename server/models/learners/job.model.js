export default (sequelize, Sequelize) => {
    const jobModel = sequelize.define("job", {
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
    
    return jobModel;
};