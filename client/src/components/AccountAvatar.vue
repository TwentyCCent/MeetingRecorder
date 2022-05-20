<template>
  <v-menu  offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-1" icon large color="black" dark v-bind="attrs" v-on="on">
        <v-icon large color="black">mdi-account</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item >
        <v-list-item-title >My account</v-list-item-title>
      </v-list-item>
      <v-list-item >
        <v-list-item-title >Settings</v-list-item-title>
      </v-list-item>
      <v-list-item >
        <v-list-item-title @click="signOut()">Disconnect</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {bus} from '../main';
export default {

  name: "AccountAvatar",
  data: () => ({
  }),
  methods:{
      signOut(){
          localStorage.clear();
          bus.$emit("connect", 0);
          this.$router.push({ path: "/" });
      }
  },
};
</script>

<style>
</style>