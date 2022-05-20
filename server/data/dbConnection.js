var { Sequelize } = require('sequelize');
const Project = require('./models/project');
const Team = require('./models/team');
const Note = require('./models/note');
const User = require('./models/user');
const DailyMeeting = require('./models/dailyMeeting');
const Timestamp = require('./models/timestamp');
const FilePath = require('./models/filePath');

class DbConnection {
    constructor() {
        this.sequelize = new Sequelize('dbMeetingRecorder', 'root', 'Azerty@123', {
            host: 'localhost',
            dialect: 'mysql'
        });
    }

    initialize() {
        this.sequelize.authenticate().then(async () => {
            console.log('connected to db');

            await User.init(this.sequelize);
            await Project.init(this.sequelize);
            await Team.init(this.sequelize);
            await DailyMeeting.init(this.sequelize);
            await FilePath.init(this.sequelize);
            await Timestamp.init(this.sequelize);
            await Note.init(this.sequelize);

            //Relation manage if you don't want make it with references
            User.belongsToMany(Project, { through: Team, foreignKey: 'userId_Fk', sourceKey: 'userId' });
            Project.belongsToMany(User, { through: Team, foreignKey: 'projectId_Fk', sourceKey: 'projectId' });

            User.belongsToMany(DailyMeeting, { through: Note, foreignKey: 'userId_Fk', sourceKey: 'userId' });
            DailyMeeting.belongsToMany(User, { through: Note, foreignKey: 'dailyMeetingId_Fk', sourceKey: 'dailyMeetingId' });

            Project.hasMany(DailyMeeting);
            DailyMeeting.belongsTo(Project, {
                foreignKey: 'projectId_Fk',
                targetKey: 'projectId'
            });

            DailyMeeting.hasMany(FilePath);
            FilePath.belongsTo(DailyMeeting, {
                foreignKey: 'dailyMeetingId_Fk',
                targetKey: 'dailyMeetingId'
            }),

            DailyMeeting.hasMany(Timestamp);
            Timestamp.belongsTo(DailyMeeting, {
                foreignKey: 'dailyMeetingId_Fk',
                targetKey: 'dailyMeetingId'
            });

        })
    }
}

module.exports = new DbConnection();