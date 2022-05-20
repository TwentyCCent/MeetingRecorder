const { response } = require('express');
const ProjectsService = require('../services/projectsServices');

class ProjectsController {
    constructor() {

    }

    async getProjects(request, response) {
        const projects = await ProjectsService.getProjects();

        response.status(200).send(projects);
    }

    async getProject(request, response) {
        const projectId = request.params.projectId;
        const project = await ProjectsService.getProject(projectId);

        response.status(200).send(project);
    }

    async createProject(request, response) {
        const data = request.body;
        const project = await ProjectsService.createProject(data);

        response.status(200).send(project);
    }

    async deleteProject(request, response) {
        const projectId = request.params.projectId;
        const project = await ProjectsService.deleteProject(projectId);

        response.status(200).send("deleted");
    }

    async updateProject(request, response) {
        const projectId = request.params.projectId;
        const label = request.params.label;
        const project = await ProjectsService.updateProject(projectId, label);

        response.status(200).send("updated");
    }

    async getProjectsFromUser(request, response) {
        //const userId = request.headers.authorization;
        
        const Id = request.params.Id;
        const projects = await ProjectsService.getProjectsFromUser(Id);

        response.status(200).send(projects);
    }
}


module.exports = new ProjectsController();