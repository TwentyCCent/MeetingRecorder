<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm12 md12>
      <v-row class="text-center">
        <v-col cols="12">
          <img
            :src="require('../assets/logoMicro.png')"
            class="my-5"
            contain
            height="200"
          />
        </v-col>

        <v-col class="mb-5">
          <h1 class="display-2 font-weight-bold mb-4">
            Welcome to {{ title }}
          </h1>

          <p class="subheading font-weight-regular">
            Your daily meeting recording and management application,
            <br />Try the best application to simplify your daily life
            <a href="https://discord.com" target="_blank">Discord Community</a>
          </p>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-btn elevation="5" large x-large color="primary lighten-2">
          Download for desktop
        </v-btn>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{

      title: "Meeting Recorder",
    }
  },
  props: {
  },

};
</script>

<style>
</style>
