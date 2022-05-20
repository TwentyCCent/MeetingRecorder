import axios from 'axios';

export default class NoteService {

    async createNote( meetingId, userId, ambianceNote, timeNote, globalNote) {
        return await axios.post(
            'http://localhost:3000/note' ,{
                dailyMeetingId_Fk: meetingId,
                userId_Fk: userId,
                ambiance: ambianceNote,
                timeMeeting: timeNote,
                globalQuality: globalNote
            }
         )
    }
}