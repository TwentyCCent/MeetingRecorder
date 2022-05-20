const DailyMeeting = require('../data/models/dailyMeeting');
const Project = require('../data/models/project');

class DailyMeetingService {

    constructor() {

    }

    async createMeeting(data) {
        return await DailyMeeting.create({
            dateMeeting: data.dateMeeting, projectId_FK: data.projectId,
        },
        {
            fields: ['dateMeeting', 'projectId_FK']
        });
    }

    async getMeetingsFromProject(Id) {
        return await DailyMeeting.findAll({
            include: [{
                model: Project,
                where: {
                    projectId: Id
                },
                attributes: []
            }],
            attributes: ['dailyMeetingId', 'dateMeeting', 'filePath',"projectId_FK", "updatedAt", "createdAt"]
        });
    }

    async updateMeeting(meetingId, path) {
        const user = await DailyMeeting.update({
            filePath: path
        },
            {
               where: {dailyMeetingId: meetingId}
            });
    }

    async getFilePath(meetingId){
        const filePath = await DailyMeeting.findOne({
            where: {
                dailyMeetingId: meetingId
            },
            attributes:['filePath']
        },
        )

        return filePath;
    }
}

module.exports = new DailyMeetingService();