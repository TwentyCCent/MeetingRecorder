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
              v-for="project in projects"
              :key="project.projectId"
              @click="getProjectInfo(project.projectId, project.label)"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    <h2 style="color: black">
                      {{ project.label }}
                    </h2>
                  </v-list-item-title>
                </v-list-item-content>
              </template>

              <div
                id="divListProjet"
                style="
                  display: flex;
                  justify-content: space-around;
                  margin-bottom: 20px;
                "
              >
                <!-- list card of meetings -->
                <!-- <v-card class="mx-auto" max-width="200">
                  <v-toolbar color="blue">
                    <v-toolbar-title>Meetings</v-toolbar-title>
                  </v-toolbar>
                  <v-list-item
                    v-for="meeting in meetings"
                    :key="meeting.dailyMeetingId"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{
                        meeting.dateMeeting | formatDate
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card> -->
                <div style="display: flex; flex-direction: column; color: grey">
                  <h3>Meetings</h3>
                  <ul v-for="meeting in meetings" :key="meeting.dailyMeetingId">
                    <li>{{ meeting.dateMeeting | formatDate }}</li>
                  </ul>
                </div>

                <!-- list card of members -->
                <!-- <v-card class="mx-auto" max-width="200">
                  <v-toolbar color="blue">
                    <v-toolbar-title>Team</v-toolbar-title>
                  </v-toolbar>
                  <v-list-item v-for="user in users" :key="user.userId">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="user.login"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card> -->
                <div style="display: flex; flex-direction: column; color: grey">
                  <h3>Team</h3>
                  <ul v-for="user in users" :key="user.userId">
                    <li>{{ user.login }}</li>
                  </ul>
                </div>
              </div>

              <div
                id="divButtonProjet"
                style="display: flex; justify-content: space-around"
              >
                <!-- button to show project manager in a right panel -->
                <v-btn @click.stop="draw = !draw">Manage Project</v-btn>

                <!-- button navigate to recorderSpace Page -->
                <v-btn @click="goToRecorder()"> Recording </v-btn>
              </div>
            </v-list-group>
          </v-list>
        </v-card>
        <v-spacer></v-spacer>

        <!-- ----------------------- side bar des projects et add members----------------------------------------------------------------------------------------- -->
        <v-navigation-drawer v-model="draw" right absolute temporary>
          <div class="overflow-y-auto" style="display: flex; flex-direction: column; justify-content: space-evenly; margin: auto; padding: 10px;">
            <div>
              <h3>Compose your team</h3>
              <v-combobox
                v-model="selectedUser"
                :items="userLogin"
                label="Select one member"
                dense
                outlined
                style="padding-top: 10px;"
              ></v-combobox>

              <div>
                <v-btn target="_blank" @click="addMemberToTeam()" style="margin-bottom: 15px;">
                  <span
                    class="mr-2"
                    style="background-color : black, text-color: white; width: 200px;"
                    >Add member to the team</span
                  >
                </v-btn>
              </div>

              <v-divider></v-divider>
            </div>
            <div style="margin-top:10px">
              <h3>Create a new meeting</h3>

              <form>
                <input
                  outlined
                  type="datetime-local"
                  style="
                    width: 235px;
                    height: 40px;
                    border: 1px solid rgba(0, 0, 0, 0.42);
                    border-radius: 4px;
                    margin-top: 10px;
                  "
                  v-model="selectedDateTime"
                />

                <div style="padding-top: 25px; margin-bottom: 15px">
                  <v-btn href="" target="_blank" @click="createMeeting()">
                    <span
                      class="mr-2"
                      style="background-color : black, text-color: white; width: 200px;"
                      >Add meeting</span
                    >
                  </v-btn>
                </div>
              </form>

              <v-divider></v-divider>

              <v-list dense> </v-list>
            </div>
          </div>
        </v-navigation-drawer>
        <!-----------------------------side bar du bouton create new project----------------------------------------------------------------------- -->

        <div align="center" style="padding-top: 40px">
          <v-btn dark color="primary lighten-2" elevator='4' @click.stop="drawer = !drawer">
            <span class="mr-2">Create New Project</span>
          </v-btn>

          <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title><h3>New Project</h3></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <form>
              <v-text-field
                class="mx-2"
                label="Name Project"
                v-model="label"
                rows="1"
                style="padding-top: 15px"
              ></v-text-field>
              <v-btn @click.stop="drawer = !drawer" @click="createProject" style="margin-bottom: 10px">Create project</v-btn>
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
import { bus } from "../main";

export default {
  name: "Project3",
  data: () => ({
    projects: [],
    users: [],
    meetings: [],
    usersAddTeam: [],
    userLogin: [],
    selectedUser: undefined,
    selectedDateTime: undefined,
    projectIdClicked: undefined,
    projectLabel: undefined,
    label: undefined,
    userIdClicked: [],
    userExist: undefined,

    projectService: undefined,
    teamService: undefined,
    meetingService: undefined,

    // side-bar
    drawer: null,
    draw: null,
  }),

  methods: {
    createProject(event) {
      event.preventDefault();
      if (this.label !== undefined) {
        this.projectService.createProject(this.label).then((project) => {
          //console.log("ici");
          //console.log(project);
          this.projects.push(project);
        });
        this.label = undefined;
      } else {
        alert("Enter the name of your new project");
      }
    },

    async getProjectInfo(projectId, projectLabel) {
      this.projectIdClicked = projectId;
      this.projectLabel = projectLabel;
      //console.log(this.projectIdClicked);

      await this.teamService.getMembers(this.projectIdClicked).then((users) => {
        //console.log("test user");
        //console.log(users);
        this.users = users;
        console.log(this.users);
      });

      await this.meetingService
        .getMeeting(this.projectIdClicked)
        .then((meetings) => {
          //console.log('test meeting');
          //console.log(meetings);
          this.meetings = meetings;
        });
    },

    async createMeeting() {
      if (this.selectedDateTime !== undefined) {
        console.log(this.selectedDateTime);
        const meeting = await this.meetingService.createMeeting(
          this.selectedDateTime,
          this.projectIdClicked
        );
        //console.log(meeting);
        this.meetings.push(meeting);
        this.selectedDateTime = undefined;
        this.draw = !this.draw;
      } else {
        alert("Select date and time of your new meeting");
      }
    },

    async addMemberToTeam() {
      this.userExist = this.users.find(
        (user) => user.login === this.selectedUser
      );
      if (this.selectedUser !== undefined && this.userExist === undefined) {
        this.userIdClicked = this.usersAddTeam.find(
          (user) => user.login === this.selectedUser
        );
        //console.log(this.projectIdClicked, this.userIdClicked.userId);
        const member = await this.teamService.createTeamAdd(
          this.userIdClicked.userId,
          this.projectIdClicked
        );
        this.users.push(member[0]);
        this.draw = !this.draw;
      } else {
        alert(
          "Select a member in the list or member is already in your team's project"
        );
      }
    },

    goToRecorder() {
      bus.$emit("projectId", this.projectIdClicked);
      bus.$emit("projectLabel", this.projectLabel);
      this.$router.push({ path: "/recorderSpace" });
    },
  },

  props: {
    connect: undefined,
  },

  mounted() {
    this.projectService = new ProjectService();
    this.teamService = new TeamService();
    this.meetingService = new MeetingService();
    //Securization page access
    if (this.connect !== 1) {
      this.$router.push({ path: "/" });
    } else {
      this.projectService.getProjects(localStorage.sub).then((projects) => {
        this.projects = projects;
        console.log(this.projects);
      });

      this.teamService.getUsers(localStorage.sub).then((users) => {
        this.usersAddTeam = users;
        users.forEach((user) => {
          this.userLogin.push(user.login);
        });
        console.table(users);
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