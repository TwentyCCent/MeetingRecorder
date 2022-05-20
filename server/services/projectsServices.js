const Project = require('../data/models/project');
const User = require('../data/models/user');
const TeamsService = require('../services/teamsServices')

class ProjectsService {
    constructor() {

    }

    async getProjectsFromUser(Id) {
        return await Project.findAll({
            include: [{
                model: User,
                attributes: [],
                where: {
                    userId: Id
                }
            }],
            attributes: ['projectId', 'label']
        });
    }

    // async getProjects() {
    //     return await Project.findAll({
    //         where: {}
    //     });
    // }

    async getProject(projectId) {
        return await Project.findByPk(projectId);
    }

    async createProject(data) {
        return new Promise((resolve) => {
            Project.create({
                label: data.label

            }, {
                fields: ['label']
            })
            
            .then(async (project) => {
                console.log(data.userId, project.projectId, data.label);

                TeamsService.createTeam(project.projectId, data.userId, 1);
                
                resolve(project);

            });
        })
    }

    async

    async deleteProject(projectId) {
        await Project.destroy({
            where: { projectId: projectId }
        });
    }

    async updateProject(projectId, label) {
        await Project.update({
            label: label
        }, {
            where: { projectId: projectId }
        })
    }
}

module.exports = new ProjectsService();