export default (sequelize, Sequelize) => {
    const disciplineModel = sequelize.define("discipline", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
            
        },
        discipline: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
    
    return disciplineModel;
};