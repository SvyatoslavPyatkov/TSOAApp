export default (sequelize, Sequelize) => {
    const competenceModel = sequelize.define("competence", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
            
        },
        competence: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'competencies'
    });
    
    return competenceModel;
};

