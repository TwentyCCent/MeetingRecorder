const {response} = require('express');
const MeetingsService = require('../services/dailyMeetingsService')

class MeetingsController {
    constructor() {

    }

    async getMeetingsFromProject(request, response) {
        const Id = request.params.Id;
        const meetings = await MeetingsService.getMeetingsFromProject(Id);

        response.status(200).send(meetings);
    }

    async getFilePathOfMeeting(request, response) {
        const meetingId = request.params.Id;
        const filePath = await MeetingsService.getFilePath(meetingId);

        response.status(200).send(filePath);
    }

    async createMeeting(request, response) {
        const data = request.body;
        const meeting = await MeetingsService.createMeeting(data);

        response.status(200).send(meeting);
    }
}

module.exports = new MeetingsController();