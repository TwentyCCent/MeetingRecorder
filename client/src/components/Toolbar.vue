<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        :src="require('../assets/logoMicro.png')"
        transition="scale-transition"
        width="40"
      />
      <h1>{{ title }}</h1>
    </div>

    <v-spacer></v-spacer>

    <h3 class="mx-4" v-if="connect === 1">{{ login }}</h3>
    <AccountAvatar  v-if="connect === 1" />
    <div v-if="connect !== 1">
      <router-link to="/login">
        <span class="login mr-2">Sign in</span
        ><span class="login mr-2">|</span></router-link
      ><router-link to="/register">
        <span class="login mr-2">Sign up</span>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script>
import AccountAvatar from "./AccountAvatar.vue";
//import {bus} from '../main';

export default {
  name: "Toolbar",
  props: {
    title: undefined,
    connect: undefined,
    login: undefined
  },
  components: {
    AccountAvatar,
  },
  data() {
    return {
      
    };
  },

  watch: {},
  mounted() {},
  methods: {
    
  },
};
</script>

<style>
.v-application span.login {
  color: white;
  margin-left: 4px;
}
</style>