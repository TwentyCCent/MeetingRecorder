export default class TimeStamp {
    id = 0;
    meetingId;
    time;
    comment;
    
    constructor(meetingId, time, comment) {
      this.meetingId = meetingId;
      this.time = time;
      this.comment = comment;
      id++;
    }
  }