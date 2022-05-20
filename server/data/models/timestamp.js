const { Sequelize, DataTypes, Model } = require('sequelize');
const DailyMeeting = require('./dailyMeeting')

class TimeStamp extends Model {

    static async init(sequelizeInstance) {
        super.init({
            timestampId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            timeSecond: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            commentary: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dailyMeetingId_FK: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                   model: DailyMeeting,
                   key: 'dailyMeetingId'
                }
            }
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Timestamp'
        });

        super.sync();
    }
}

module.exports = TimeStamp;