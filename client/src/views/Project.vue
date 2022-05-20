<template>
  <v-layout>
    <v-row no-gutters>
      <!-- Espace Sidebar toggle -->
      <div>
        <Sidebar />
      </div>
      <div id="tableau">
        <!-- Espace page -->
        <v-sheet
          height="100%"
          width="100%"
          class="overflow-hidden"
          style="position: relative"
        >
          <v-container class="fill-height">
            <v-row >
              <!-- Menu accordion -->
              <h1>My projects</h1>
              <v-expansion-panels id="accordion" focusable>
                <v-expansion-panel v-for="(item, i) in 5" :key="i">
                  <v-expansion-panel-header>Item</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
            <!-- Button Sidebar toggle -->
            <v-row align="center" justify="center">
              <v-btn color="pink" dark @click.stop="drawer = !drawer">
                Ajouter un membre à un projet
              </v-btn>
            </v-row>
          </v-container>

          <!--  Sidebar right -->
          <v-navigation-drawer right v-model="drawer" absolute temporary>
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  src="https://randomuser.me/api/portraits/men/78.jpg"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Gestion équipe </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-btn elevation="5">Valider</v-btn>
          </v-navigation-drawer>
        </v-sheet>
      </div>
    </v-row>
  </v-layout>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "Project",
  data() {
    return {
      drawer: null,
      items: [
        { title: "Choix projet", icon: "mdi-view-dashboard" },
        { title: "Choix membre", icon: "mdi-forum" },
      ],
    };
  },
  components: {
    Sidebar,
  },
  props: {
    connect: undefined,
  },
  mounted() {
    // if(this.connect !== 1){
    //   this.$router.push({ path: "/" });
    // }
  },
};
</script>

<style>
#tableau{
  display: flex;
  width: 80%;
  margin: auto;
}
#accordion{
  margin: 20px;
}
</style>