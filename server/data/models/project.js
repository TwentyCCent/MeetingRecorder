const { Sequelize, DataTypes, Model } = require('sequelize');

class Project extends Model {

    static async init(sequelizeInstance) {
        super.init({
            projectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            label: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Project'
        });

        super.sync();
    }
}

module.exports = Project;