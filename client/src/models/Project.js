export default class Project {
    id = 0;
    name;
    ownerUser;
    listUser;
    listMeeting;

    constructor(name, ownerUser) {
        this.id;
        this.name = name;
        this.ownerUser = ownerUser;
        this.listUser = [ownerUser];
        this.listMeeting = [];
        id++;
    }
}