<template>
  <v-app>
    <!-- <v-navigation-drawer app> </v-navigation-drawer> -->
    <Toolbar
      v-bind:title="title"
      v-bind:connect="connect"
      v-bind:login="login"
    />
    <v-main>
      <v-container fluid fill-height class="pa-0">
        <router-view :connect="connect" :projectId="projectId" :projectLabel="projectLabel"></router-view>
      </v-container>
    </v-main>
    
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import Footer from "./components/Footer.vue";
import {bus} from './main';

export default {
  name: "App",

  components: {
    Toolbar,
    Footer,
  },
 
  data() {
    return {
      title: "Meeting Recorder",
      connect: 0,
      login: undefined,
      projectId: undefined,
      projectLabel: undefined
    };
  },

  created() {
    bus.$on("connect", (data) => {
      this.connect = data;
    });
    bus.$on("login", (data) => {
      this.login = data;
    });
    bus.$on("projectId", (data) => {
      this.projectId = data;
    });
    bus.$on("projectLabel", (data) => {
      this.projectLabel = data;
    });
  },
  
  watch: {},
  mounted() {},
  methods: {},
};
</script>
