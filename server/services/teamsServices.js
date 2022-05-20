const { getUsersFromProject } = require('../controllers/teamsController');
const Project = require('../data/models/project');
const Team = require('../data/models/team');
const User = require('../data/models/user');
const { Op } = require("sequelize");

class TeamsService {

    constructor() {

    }
    
    async createTeam(projectId, userId, isScrum) {
        var user;
        await Team.create({
            projectId_Fk: projectId,
            userId_Fk: userId,
            isScrumMaster: isScrum
        },
        {
            fields: ['projectId_Fk', 'userId_Fk', 'isScrumMaster']
        }).then((member) => {
            user = User.findAll({
                where: {userId: member.userId_Fk}, 
                attributes:['userId', 'login']})
        });
        console.log("service server");
        console.log(user);
        return user;  
    }

    async getTeams() {
        return await Team.findAll();
    }

    async getUsersFromProject(Id) {
        return await User.findAll({
            include: [{
                model: Project,
                where: {
                    projectId: Id
                },
                attributes: []
            }],
            attributes: ['userId', 'login']
        });
    }

    async getUsers(Id) {
        return await User.findAll({
            include: [{
                model: Project,
                attributes: []
            }],
            where: {
                userId: {
                    [Op.ne]: Id 
                  }
            },
            attributes: ['userId', 'login']
        });
    }

    async createTeamAdd(data) {
        const team = await Team.create({
            projectId_Fk: data.projectId,
            userId_Fk: data.userId,
            isScrumMaster: 0,
        },
        {
            fields: ['projectId_Fk', 'userId_Fk', 'isScrumMaster']
        });
        return team;
    }
}

module.exports = new TeamsService();