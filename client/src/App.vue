<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://i0.hdslb.com/bfs/bigfun/d2cc202ca3c6f15b46d035e0b76e14a0d215d6fc.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://game.bilibili.com/pcr/"
        target="_blank"
        text
      >
        <span class="mr-2">公主连结·108集团公会</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Welcome/>
    </v-content>
  </v-app>
</template>

<script>
import Welcome from './components/Welcome';

export default {
  name: 'App',

  components: {
    Welcome,
  },

  data: () => ({
    //
  }),
  created() {
     document.title="公主连结·108集团";
  }
};
</script>
