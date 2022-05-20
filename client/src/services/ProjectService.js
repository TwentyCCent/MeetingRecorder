import axios from 'axios';
// import jwt_decode from 'jwt-decode';


export default class ProjectService {

    async createProject(label) {
        const project=  await axios.post(
            'http://localhost:3000/projects',
             { label: label, userId: parseInt(localStorage.sub)}
         )
         return project.data;


    }

    async getProjects(userId){
        const projects =  await axios.get(
            'http://localhost:3000/projects/'+ userId
         );

         return projects.data;
    }

}

