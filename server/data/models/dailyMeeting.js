const { Sequelize, DataTypes, Model } = require('sequelize');
const Project = require('./project')

class DailyMeeting extends Model {

    static async init(sequelizeInstance) {
        super.init({
            dailyMeetingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            dateMeeting: {
                type: DataTypes.DATE,
                allowNull: false
            },
            filePath: {
                type: DataTypes.STRING,
                allowNull: true
            },
            projectId_FK: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                   model: Project,
                   key: 'projectId'
                }
            },
        },
            {
                sequelize: sequelizeInstance,
                modelName: 'DailyMeeting'
            });

        super.sync();
    }
}

module.exports = DailyMeeting;