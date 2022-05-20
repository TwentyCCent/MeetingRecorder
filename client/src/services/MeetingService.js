import axios from 'axios';

export default class MeetingService {

    async getMeeting(projectId){
        const meetings =  await axios.get(
            'http://localhost:3000/meetings/'+ projectId
         );

         return meetings.data
    }

    async createMeeting(dateMeeting, projectId){
        const meeting = await axios.post(
            'http://localhost:3000/meetings',
            {
                dateMeeting: dateMeeting, projectId: projectId
            }
        )
        console.log(meeting.data);
        return meeting.data;

        // console.log("meetings.data"),
        // console.log(meetings.data)
    }

}

