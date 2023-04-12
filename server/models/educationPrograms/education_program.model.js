export default (sequelize, Sequelize) => {
    const eduProgramModel = sequelize.define("education_program", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
            
        },
        education_program: {
            type: Sequelize.STRING,
            allowNull: false
        },
        training_duration: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return eduProgramModel;
};