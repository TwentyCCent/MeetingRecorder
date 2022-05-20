export default class Meeting {
    id = 0;
    projectId;
    dateMeeting;
    record;
    
    constructor(projectId, dateMeeting) {
      this.projectId = projectId;
      this.dateMeeting = dateMeeting;
      id++;
    }
  }