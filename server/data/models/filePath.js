const { Sequelize, DataTypes, Model } = require('sequelize');
const DailyMeeting = require('./dailyMeeting');

class FilePath extends Model {

    static async init(sequelizeInstance) {
        super.init({
            filePathId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dailyMeetingId_Fk: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                   model: DailyMeeting,
                   key: 'dailyMeetingId'
                }
            }
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Pathfile'
        });

        super.sync();
    }
}

module.exports = FilePath;