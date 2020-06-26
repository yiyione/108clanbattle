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
          src=".\assets\pcr.png"
          transition="scale-transition"
          width="40%"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click.stop="loginDialog = true"
        target="_blank"
        text
      >
        <span class="mr-2">登录</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-dialog v-model="loginDialog" max-width="350">
      <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>请输入群号和Token</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="群号"
              name="groupId"
              prepend-icon="mdi-account-multiple"
              type="text"
              v-model="input.groupId"
            ></v-text-field>

            <v-text-field
              id="token"
              label="Token"
              name="token"
              prepend-icon="mdi-lock"
              type="password"
              v-model="input.token"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login(input.groupId, input.token)">登录</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-content>
      <Welcome/>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';

import Welcome from './components/Welcome';

Vue.use(VueCookies);

export default {
  name: 'App',

  components: {
    Welcome,
  },

  data: () => ({
    loginDialog: false,
    hasLogin: false,
    input: {
      groupId: "",
      token: ""
    }
  }),
  created() {
     document.title="公主连结·108集团";
  },
  methods: {
    login(gid, token) {
      axios.get(`/api/login?gid=${gid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        Vue.$cookies.set('gid', gid);
        Vue.$cookies.set('uid', res.uid);
        this.hasLogin = true;
        this.loginDialog = false;
      }).catch(err => {
        console.log(err);
      });
    },
    logout() {
      this.hasLogin = false;
    }
  }
};
</script>
