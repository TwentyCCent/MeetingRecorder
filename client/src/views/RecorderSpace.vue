<template>
  <v-layout>
    <v-flex>
      <v-row id="pageR">
        <div>
          <v-row class="ma-4">
            <v-card
              id="cardFirst"
              elevation="3"
              color="grey lighten-2"
              class="pa-3"
            >
              <v-card-title
                class="ma-0 pa-0"
                style="max-height: 64px; display: flex"
              >
                <h3 style="margin-left: 10px">Recorder</h3>

                <div id="record">
                  <span> Screen</span>
                  <v-switch
                    style="margin-left: 16px"
                    inset
                    class="switch"
                    color="primary"
                    :input-value="switch1"
                    v-model="switch1"
                  ></v-switch>
                  <span> Audio</span>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-title>
                <spectrum-analyser
                  :style="{ opacity: isRecording ? 1 : 0.5, display: 'block' }"
                />
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions id="titre">
                <v-btn
                  class="mx-2"
                  rounded
                  dark
                  xLarge
                  elevation="5"
                  color="grey"
                  @click="recordAudio()"
                  ><v-icon large color="black" dark>mdi-play</v-icon>
                  <v-icon large color="red" dark>mdi-record-rec</v-icon></v-btn
                >
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  elevation="5"
                  color="grey"
                  @click="pauseRecording()"
                  ><v-icon large color="black" dark>mdi-pause</v-icon></v-btn
                >
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  elevation="5"
                  color="grey"
                  @click="stopRecording()"
                  ><v-icon large color="black" dark>mdi-stop</v-icon></v-btn
                >
                <div>
                  <v-row>
                    <p id="info">Time : {{ time }} sec.</p>
                  </v-row>
                  <v-row>
                    <!-- v-if="state !== 'inactive'" -->
                    <p id="info">
                      {{ state }}
                    </p>
                  </v-row>
                </div>
              </v-card-actions>
            </v-card>
          </v-row>

          <v-row class="ma-4">
            <v-card
              id="cardFirst"
              elevation="3"
              color="grey lighten-2"
              class="pa-3"
              style="height: 367px"
            >
              <v-card-title class="">
                <h3>{{ projectLabel }}</h3>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-title>
                <h4>Daily meeting</h4>
              </v-card-title>
              <v-divider></v-divider>

              <v-list
                rounded
                color="grey lighten-2"
                style="max-height: 200px"
                class="overflow-y-auto"
              >
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="meeting in meetings"
                    :key="meeting.dailyMeetingId"
                  >
                    <v-list-item-content>
                      <v-list-item-title @click="getFile(meeting)">
                        {{ meeting.dateMeeting | formatDate }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-row>
        </div>

        <div style="display: flex; flex-direction: column">
          <div style="display: flex; flex-direction: row">
            <div>
              <v-row class="ma-4">
                <v-card
                  id="cardContainer"
                  elevation="3"
                  color="grey lighten-2"
                  class="pa-3"
                >
                  <v-card-title>
                    <h3>Audio record</h3>
                  </v-card-title>
                  <v-divider></v-divider>
                  <div
                    class="overflow-y-auto"
                    style="max-height: 350px; margin-top: 10px"
                  >
                    <div
                      id="divAudio"
                      v-for="(el, i) in listAudioElement"
                      :key="i"
                    >
                      <audio
                        elevation="4"
                        controls=""
                        :src="el.mediaUrl"
                      ></audio>
                      <div id="divAudioBtn">
                        <v-btn
                          elevation="4"
                          id="btnAudio"
                          small
                          rounded
                          color="success"
                          @click="saveFile(el.blob)"
                          >Save</v-btn
                        >
                        <v-btn
                          elevation="4"
                          id="btnAudio"
                          small
                          rounded
                          color="error"
                          >Discard</v-btn
                        >
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-row>
            </div>

            <div>
              <v-row class="ma-4">
                <v-card
                  id="cardContainer"
                  elevation="3"
                  color="grey lighten-2"
                  class="pa-3"
                >
                  <v-card-title>
                    <h3>Screen record</h3>
                  </v-card-title>
                  <!-- <v-divider></v-divider>
              <div id="video-list" class="containerFile"></div> -->

                  <v-divider></v-divider>
                  <div
                    class="overflow-y-auto"
                    style="max-height: 350px; margin-top: 10px"
                  >
                    <div
                      id="divAudio"
                      v-for="(el, i) in listVideoElement"
                      :key="i"
                    >
                      <video
                        elevation="4"
                        controls=""
                        :src="el.mediaUrl"
                      ></video>
                      <div id="divAudioBtn">
                        <v-btn
                          elevation="4"
                          id="btnAudio"
                          small
                          rounded
                          color="success"
                          @click="saveFile(el.blob)"
                          >Save</v-btn
                        >
                        <v-btn
                          elevation="4"
                          id="btnAudio"
                          small
                          rounded
                          color="error"
                          >Discard</v-btn
                        >
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-row>
            </div>
          </div>
          <div>
            <v-row class="ml-4 mt-2">
              <v-card
                style="width: 950px; height: 256px"
                elevation="3"
                color="grey lighten-2"
                class="pa-3"
              >
                <v-card-title>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      width: 100%;
                    "
                  >
                    <h3>Timestamp</h3>
                    <h4>at {{ timestamp }} seconds</h4>
                    <v-btn color="success" @click="getTime">Mark time</v-btn>
                  </div>
                </v-card-title>
                <v-divider></v-divider>
                <v-container color="white" fluid>
                  <v-textarea
                    color="black"
                    clearable
                    clear-icon="mdi-close-circle"
                    counter
                    label="Enter your comment"
                    :rules="rules"
                    :value="value"
                    style="width: 100%; height: 90px"
                    rows="3"
                  ></v-textarea>
                </v-container>
                <div
                  style="
                    display: flex;
                    justify-content: center;
                    margin-top: 8px;
                  "
                >
                  <v-btn color="success">Save comment</v-btn>
                </div>
              </v-card>
            </v-row>
          </div>
        </div>
      </v-row>

      <v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
              style="width: 82%; margin: auto"
            >
              Note this meeting
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Note this meeting </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="[
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10',
                      ]"
                      label="Ambiance*"
                      required
                      v-model="ambianceNote"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="[
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10',
                      ]"
                      label="Time management*"
                      required
                      v-model="timeNote"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="[
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10',
                      ]"
                      label="Global quality*"
                      required
                      v-model="globalNote"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveNote()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import SpectrumAnalyser from "@/components/SpectrumAnalyser";
import RecorderService from "../services/RecordService";
import NoteService from "../services/NoteService";

export default {
  name: "recorderSpace",
  components: {
    SpectrumAnalyser,
  },
  data() {
    return {
      switch1: true,
      time: 0,
      timestamp: 0,
      interval: 0,
      isStop: false,
      state: "inactive",
      stream: null,
      mediaRecorder: null,
      chunks: [],
      isRecording: false,
      rules: [(v) => v.length <= 250 || "Max 250 characters"],
      value: "",
      //Note
      dialog: false,
      ambianceNote: undefined,
      timeNote: undefined,
      globalNote: undefined,
      noteService: undefined,
      //Data binding
      meetings: [],
      selectedMeeting: undefined,
      listAudioElement: [],
      listVideoElement: [],
      RecorderService: undefined,
    };
  },
  props: {
    connect: undefined,
    projectId: undefined,
    projectLabel: undefined,
  },
  mounted() {
    this.recorderService = new RecorderService();
    this.noteService = new NoteService();
    //Securization page access
    if (this.connect !== 1) {
      this.$router.push({ path: "/" });
    } else {
      this.recorderService.getMeetings(this.projectId).then((meetings) => {
        this.meetings = meetings;
      });
    }
  },
  methods: {
    timer() {
      this.interval = setInterval(() => {
        if (!this.isStop) {
          this.time++;
        }
      }, 1000);
    },

    async recordAudio() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support recording!");
      }
      this.isRecording = true;

      this.time = 0;
      this.isStop = false;
      /////////////////////////////////////////// A revoir
      clearInterval(this.interval);
      this.timer();

      if (this.switch1 === true) {
        console.log("record audio started");

        navigator.mediaDevices
          .getUserMedia({
            audio: true,
          })
          .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (e) => {
              console.log("record audio");

              this.chunks.push(e.data);
            };
            this.mediaRecorder.onstop = (e) => {
              this.isStop = true;

              console.log("record screen stopped", e.data);
              this.createMediaElement("audio", "audio/mp3");
              //stream.getTracks().forEach(track => track.stop())
            };
            this.mediaRecorder.onerror = (e) => {
              console.log(e.error);
            };
            this.mediaRecorder.start();

            //state of the MediaRecorder object (inactive, recording, or paused.)
            this.state = this.mediaRecorder.state;
          })
          .catch((err) => {
            alert(`The following error occurred: ${err}`);
          });
      } else {
        this.time = 0;

        navigator.mediaDevices
          .getDisplayMedia({
            mediaSource: "screen",
          })
          .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (e) => {
              console.log("record screen", e.data);
              this.chunks.push(e.data);
            };
            this.mediaRecorder.onstop = (e) => {
              this.isStop = true;
              console.log("record screen stopped", e.data);
              this.createMediaElement("video", this.chunks[0].type);
            };
            this.mediaRecorder.start();

            //state of the MediaRecorder object (inactive, recording, or paused.)
            this.state = this.mediaRecorder.state;
          })
          .catch((err) => {
            alert(`The following error occurred: ${err}`);
          });
      }
    },

    // stops audio or video
    stopRecording() {
      this.isRecording = false;
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        /////////////////////////////////////////// A revoir
        clearInterval(this.interval);
        this.state = this.mediaRecorder.state;
      }
    },

    // pause and resume
    pauseRecording() {
      if (this.state === "recording") {
        this.mediaRecorder.pause();
        this.state = this.mediaRecorder.state;
        this.isStop = true;
      } else if (this.state === "paused") {
        this.mediaRecorder.resume();
        this.state = this.mediaRecorder.state;
        this.isStop = false;
      }
    },

    // add element to mediaList with the file
    createMediaElement(mediaType, fileType) {
      const blob = new Blob(this.chunks, {
        type: fileType,
      });

      const mediaURL = window.URL.createObjectURL(blob);
      console.log("mediaUrl", mediaURL);

      if (mediaType === "audio") {
        this.listAudioElement.push({ blob: blob, mediaUrl: mediaURL });
      } else if (mediaType === "video") {
        this.listVideoElement.push({ blob: blob, mediaUrl: mediaURL });
      }

      this.mediaRecorder = null;
      this.chunks = [];
    },

    saveFile(file) {
      console.log("Save file test");
      if (this.selectedMeeting !== undefined) {
        console.log(file, this.selectedMeeting);
        this.recorderService.saveRecording(file, this.selectedMeeting);
      } else {
        alert("Please, select your meeting");
      }
    },

    async getFile(meeting) {
      this.listVideoElement = [];
      this.listAudioElement = [];
      console.log(meeting.filePath);
        if (meeting.filePath !== null) {
          this.selectedMeeting = meeting.dailyMeetingId;
          this.listAudioElement.push({
            blob: "",
            mediaUrl: "http://localhost:3000/upload/" + meeting.dailyMeetingId,
          });
        } else {
          this.selectedMeeting = meeting.dailyMeetingId;
        }

    },

    getTime() {
      this.timestamp = this.time;
    },

    saveNote() {
      this.dialog = false;
      console.log(this.ambianceNote, this.timeNote, this.globalNote);

      this.noteService.createNote(
        1,
        6,
        this.ambianceNote,
        this.timeNote,
        this.globalNote
      );
    },
  },
};
</script>

<style>
.switch .v-input--selection-controls__input div {
  color: red;
}
.switch .v-input--selection-controls__input input {
  background-color: red;
}
#titre {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 6px;
}
#record {
  display: flex;
  align-items: center;
  margin-left: 130px;
}
#info {
  margin: 0px;
  padding: 0px;
  margin-left: 10px;
  display: flex;
  align-content: flex-end;
  justify-content: flex-start;
  width: auto;
  min-width: 120px;
}

#cardFirst {
  width: 460px;
  min-width: 320px;
  margin: auto;
}

#pageR {
  display: flex;
  justify-content: center;
  margin: auto;
}

audio,
video {
  margin: 8px 0px;
}

audio:first-child,
video:first-child {
  margin-left: 0;
}

audio:last-child,
video:last-child {
  margin-right: 0;
}

video {
  border: 1px #eaeaea solid;
  width: 340px;
  height: 220px;
}

.button i {
  margin-left: 10px;
  font-size: x-large;
}
.button:first-child {
  margin-left: 0;
}
.button:last-child {
  margin-right: 0;
}

.gallery {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
}

.containerFile {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6px;
}

#cardContainer {
  min-width: 460px;
  min-height: 420px;
}
.col {
  padding: 6px;
}

#divAudio {
  display: flex;
  align-content: center;
  justify-content: center;
}

#divAudioBtn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 4px;
}

#btnAudio {
  height: 22px;
}

#saveBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 26px;
  border-radius: 13px;
  margin: auto;
  margin-left: 15px;
  box-shadow: 2px 2px 2px black;

  transition: all, 0.5s, cubic-bezier(0.65, -0.25, 0.25, 1.95);
  background: white;
}
#saveBtn:hover,
#saveBtn:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 5px 3px 5px black;
  color: rgba(0, 0, 0, 0.65);
}

#saveBtn:hover {
  transform: translateY(-1px);
}

#saveBtn:active {
  background-color: #f0f0f1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 5px 3px 5px black;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
</style>
