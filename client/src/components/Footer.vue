<template>
  <v-footer app color="primary" dark padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.name"
        color="white"
        text
        rounded
        class="my-2"
      >
        <router-link id="link" :to="link.path">
          {{ link.name }}
        </router-link>
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        Created By <strong>SushiTeam</strong> ©{{ new Date().getFullYear() }} —
        All rights reserved
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      links: [
        {
          name: "Home",
          path: "/",
        },
        {
          name: "Project",
          path: "/Project3",
        },
        {
          name: "Recording",
          path: "/recorderSpace",
        },
      ],
    };
  },
};
</script>

<style>
#link {
  color: white;
}
</style>