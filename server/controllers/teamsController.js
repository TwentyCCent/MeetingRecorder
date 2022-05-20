const { response } = require('express');
const TeamsService = require('../services/teamsServices');

class TeamsController {
    constructor() {

    }

    async createMember(request, response) {
        const data = request.body;
        console.log("DATA");
        console.table(data);
        const member = await TeamsService.createTeam(data.projectId, data.userId, 0);
        console.log("DATA RESPONSE");
        console.log(member);
        response.status(200).send(member);
    }

    async getTeams(request, response) {
        const teams = await TeamsService.getTeams(request.body.Id);

        response.status(200).send(teams);
    }

    async getUsersFromProject(request, response) {
        const Id = request.params.Id;
        const users = await TeamsService.getUsersFromProject(Id);

        response.status(200).send(users);
    }

    async getUsers(request, response) {
        const users = await TeamsService.getUsers(request.params.Id);

        response.status(200).send(users);
    }

}

module.exports = new TeamsController();