const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('./user');
const DailyMeeting = require('./dailyMeeting');


class Note extends Model {

    static async init(sequelizeInstance) {
        super.init({
            dailyMeetingId_Fk: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: DailyMeeting,
                    key: 'dailyMeetingId'
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
            ambiance: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            timeMeeting: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            globalQuality: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Note',
            removeAttribute: 'id',
        });
        
        super.sync();
    }
}

module.exports = Note;