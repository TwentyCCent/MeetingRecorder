<template>
  <v-layout align-center justify-center>
    <v-flex>
      <div>
        <v-card class="mx-auto" max-width="500">
          <v-toolbar color="black" dark>
            <v-toolbar-title>My projects</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list>
            <v-list-group
              v-for="(project, index) in projects"
              :key="project.projectId"
              @click="getProjectId(project)"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="project.label"></v-list-item-title>
                </v-list-item-content>
              </template>

              <div id="divListProjet">
                <!-- list card of meetings -->
                <v-card class="mx-auto" max-width="200">
                  <v-toolbar color="blue">
                    <v-toolbar-title>Meetings</v-toolbar-title>
                  </v-toolbar>
                  <v-list-item
                    v-for="(meeting, index) in meetings[project.projectId]"
                    :key="meeting.dailyMeetingId"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="meeting.dateMeeting"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>

                <!-- list card of members -->
                <v-card class="mx-auto" max-width="200">
                  <v-toolbar color="blue">
                    <v-toolbar-title>Team</v-toolbar-title>
                  </v-toolbar>
                  <v-list-item v-for="member in users[project.projectId]" :key="member.userId">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="member.login"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </div>

              <div id="divButtonProjet">
                <!-- button to show project manager in a right panel -->
                <v-btn @click.stop="draw = !draw">Manage Project</v-btn>

                <!-- button navigate to recorderSpace Page -->
                <v-btn to="/recorderSpace"> Recording </v-btn>
              </div>
            </v-list-group>
          </v-list>
        </v-card>
        <v-spacer></v-spacer>
        <!-- ----------------------- side bar des projects et add members----------------------------------------------------------------------------------------- -->
        <div>
          <v-navigation-drawer v-model="draw" right absolute temporary>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Add Members</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="user in usersAddTeam"
              :key="user.Id"
              @click="getUserId(user)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="user.login"> </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <div style="padding-top: 50px">
              <!-- <v-toolbar dense floating>
                <v-text-field
                  hide-details
                  prepend-icon="mdi-magnify"
                  single-line
                ></v-text-field>
              </v-toolbar> -->

              <v-btn href="" target="_blank" @click="addMemberToTeam">
                <span
                  class="mr-2"
                  style="background-color : black, text-color: white"
                  >add</span
                >
              </v-btn>
            </div>

            <v-divider></v-divider>

            <v-list dense> </v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>New Meeting</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list> </v-list>

            <form @submit="createMeeting">
              <input type="datetime-local" v-model="dateMeeting" />

              <input @click.stop="draw = !draw" type="submit" value="Create" />
            </form>

            <v-divider></v-divider>

            <v-list dense> </v-list>
          </v-navigation-drawer>

          <!-----------------------------side bar du bouton create new project----------------------------------------------------------------------- -->
        </div>

        <div align="center" style="padding-top: 40px">
          <v-btn href="" target="_blank" @click.stop="drawer = !drawer" text>
            <span class="mr-2">Create New Project</span>
          </v-btn>

          <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>New Project</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <form @submit="createProject">
              <v-text-field
                class="mx-2"
                label="Name Project"
                v-model="label"
                rows="1"
                style="padding-top: 40px"
              ></v-text-field>

              <input
                @click.stop="drawer = !drawer"
                type="submit"
                value="Create"
              />

              <!-- <input  href="" target="_blank">
              <span
                class="mr-2"
                style="background-color : black, text-color: white"
                >Create</span
              >
            </input> -->
            </form>
            <v-divider></v-divider>

            <v-list dense> </v-list>
          </v-navigation-drawer>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ProjectService from "../services/ProjectService";
import MeetingService from "../services/MeetingService";
import TeamService from "../services/TeamService";

export default {
  name: "Project2",
  data: () => ({
    projects: [],
    users: [],
    meetings: {},
    usersAddTeam: [],
    projectIdClicked: undefined,
    userIdClicked: [],
    userClicked: [],
    projectClicked: [],

    dateMeeting: undefined,
    projectService: undefined,
    TeamService: undefined,
    MeetingService: undefined,

    // side-bar

    drawer: null,
    draw: null,

    //label create project
    label: "",
  }),

  methods: {
    async createProject(event) {
      event.preventDefault();

      // création du projet
      const project = await this.projectService.createProject(this.label);

      // affichage de la console
      console.log("ici");
      console.log(project);

      // Mise en place du projet
      this.projects.push(project);

      // appel de la liste des users pour le nouveau projet
      await this.TeamService.getMembers(project.projectId).then((users) => {
        this.users.push(users);
      });
    },

    async getProjectId(project) {
      this.projectIdClicked = project.projectId;
      this.projectClicked = project;
      //console.log("projects");
      //console.log(this.projectIdClicked);
    },

    async createMeeting(event) {
      event.preventDefault();

      const meeting = await this.MeetingService.createMeeting(
        this.dateMeeting,
        this.projectIdClicked
      );

      // ce console log permet de formatter le tableau => ne pas toucher
      console.log("this.meetings");
      //console.table(this.meetings[0]);
      this.meetings[this.projectIdClicked].push(meeting);

      console.log(this.meetings[this.projectIdClicked]);
      // console.log("this.meetings");
      // console.log(this.meetings);
    },

    async getUserId(user) {
      this.userClicked = user;
      console.log(user);
      this.userIdClicked = user.userId;
      console.log(this.userIdClicked);
    },

    async addMemberToTeam() {
      await this.TeamService.createTeamAdd(
        this.userIdClicked,
        this.projectIdClicked
      );
      this.users.push(this.userClicked);

      // ce console log permet de formatter le tableau => ne pas toucher
      // console.log("this.users");
      // console.log(this.users);

      //this.users[this.projectIdClicked-1].push(this.userClicked);

      // appel de la liste des users pour le nouveau projet
    },
  },

  props: {
    connect: undefined,
  },

  mounted() {
    //Securization page access
    if (this.connect !== 1) {
      this.$router.push({ path: "/" });
    } else {
      this.projectService = new ProjectService();
      this.TeamService = new TeamService();
      this.MeetingService = new MeetingService();

      this.projectService.getProjects(localStorage.sub).then((projects) => {
        this.projects = projects;
        projects.forEach((project) => {
          this.TeamService.getMembers(project.projectId).then((users) => {
            this.users.push(users);
            // console.log("users init");
            // console.log(this.users);
          });
        });
        projects.forEach((project) => {
          this.MeetingService.getMeeting(project.projectId).then((meetings) => {
            // this.meetings.push({
            //   projectId: meetings[0].projectId_Fk,
            //   meetings: meetings});
            this.meetings[project.projectId] = meetings;

            //console.log(project.projectId);
          });
        });
        console.log("meeting init");
        console.table(this.meetings);
        console.log("meeting init fini");
        this.TeamService.getUsers(localStorage.sub).then((users) => {
          this.usersAddTeam = users;
          //this.usersAddTeam.push(usersAddTeam);
          // console.log("users");
          // console.log(users);
        });
      });
    }
  },
};
</script>
<style>
#divListProjet {
  display: flex;
}

#divButtonProjet {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin: 10px;
}
</style>