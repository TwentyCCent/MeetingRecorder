const Note = require('../data/models/note');

class NoteService{
    async createNote(data) {
        const note = await Note.create({
            dailyMeetingId_Fk: data.dailyMeetingId_Fk,
            userId_Fk: data.userId_Fk,
            ambiance: data.ambiance,
            timeMeeting: data.timeMeeting,
            globalQuality: data.globalQuality
        },
        {
            fields: ['dailyMeetingId_Fk', 'userId_Fk', 'ambiance', 'timeMeeting', 'globalQuality']
        });
        //return note;
    }
}

module.exports = new NoteService();