const FilePath = require('../data/models/filePath')

class PathFileService {

    async createPathFile(meetingId, filePath) {
        await FilePath.create({
            dailyMeetingId_Fk: meetingId,
            path: filePath
        }, {
            fields: ['dailyMeetingId_Fk', 'path']
        });
    }

    async getFilePath(meetingId) {
        const filePath = await FilePath.findAll({
            where: {
                dailyMeetingId_Fk: meetingId
            },
            attributes: ['filePathId', 'path']
        },
        )
        return filePath;
    }
}

module.exports = new PathFileService();