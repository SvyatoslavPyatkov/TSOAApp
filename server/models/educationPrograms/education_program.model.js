export default (sequelize, Sequelize) => {
    const eduProgramModel = sequelize.define("education_program", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        //Продолжительность обучения в часах
        duration: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    
    return eduProgramModel;
};