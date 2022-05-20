import axios from 'axios';
// import jwt_decode from 'jwt-decode';


export default class TeamService {

    async createTeam(userId, projectId, isScrum) {
        return await axios.post(
            'http://localhost:3000/teams' ,
            {
                userId: userId,
                projectId: projectId,
                isScrum: isScrum
            }
         )
    }

    async getMembers(projectId) {
        const users = await axios.get(
            'http://localhost:3000/teams/' + projectId
        );
        return users.data;
    }

    async getUsers(userId){
        const users = await axios.get(
            'http://localhost:3000/users/'+userId
        );
        return users.data;
    }

    async createTeamAdd(userId, projectId){
        const users = await axios.post(
            'http://localhost:3000/members' ,
            {userId: userId, projectId: projectId}
        );
        return users.data;
    }

}

