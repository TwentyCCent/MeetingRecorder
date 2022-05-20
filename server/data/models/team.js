const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('./user');
const Project = require('./project');


class Team extends Model {

    static async init(sequelizeInstance) {
        super.init({
            projectId_Fk: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Project,
                    key: 'projectId'
                }
            },
            userId_Fk: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               references: {
                  model: User,
                  key: 'userId'
               }
            },
            isScrumMaster: {
                type: DataTypes.TINYINT,
                allowNull: false
            }
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Team',
            removeAttribute: 'id',
        });
        
        super.sync();
    }
}

module.exports = Team;