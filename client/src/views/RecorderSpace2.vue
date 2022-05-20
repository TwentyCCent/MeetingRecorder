This file is a mock up for record audio file .ogg
<template>
  <div>
    <button class="primary" @click="recordAudio()" style="margin:10px;">record</button>
    <button class="primary" @click="stop()">stop and upload</button>
  </div>
</template>

<script>
import recorderService from '../services/RecordService'

export default {
  name: "recorderSpace2",
  data() {
    return {
      stream: null,
      mediaRecorder: null,
    };
  },

  mounted() {},
  methods: {
    onDataAvailable(event) {
      console.log("recorder started");
      this.upload(event.data)
    },

    async recordAudio() {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      this.mediaRecorder = new MediaRecorder(this.stream);
      
      this.mediaRecorder.ondataavailable = this.onDataAvailable;

      this.mediaRecorder.start();
    },

    stop() {
      this.mediaRecorder.stop();
    },

    upload(blob) {
        recorderService.saveRecording(blob);
    },
  },
};
</script>
