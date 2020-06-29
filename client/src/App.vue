<template>
  <v-app>
    <v-app-bar
      app
      color='primary'
      dark
    >
      <div class='d-flex align-center'>
        <v-img
          alt='Vuetify Logo'
          class='shrink mr-2'
          contain
          src='./assets/pcr.png'
          transition='scale-transition'
          width='40%'
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click.stop='clickLoginBtn()'
        target='_blank'
        text
      >
        <span class='mr-2'>{{loginInfo.name}}</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-dialog v-model='loginInfo.loginDialog' max-width='400'>
      <v-card>
        <v-toolbar
          color='primary'
          dark
          flat
        >
          <v-toolbar-title>请输入群号和Token</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label='群号'
              name='groupId'
              prepend-icon='mdi-account-multiple'
              type='text'
              v-model='input.groupId'
            ></v-text-field>

            <v-text-field
              id='token'
              label='Token'
              name='token'
              prepend-icon='mdi-lock'
              type='password'
              v-model='input.token'
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-alert v-model="input.error" type='error'>
            {{input.errorMessage}}
          </v-alert>
          <v-spacer></v-spacer>
          <v-btn color='primary' @click='login(input.groupId, input.token)'>登录</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-content>
      <Welcome :key="welcomeKey"/>
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
    loginInfo: {
      loginDialog: false,
      login: false,
      name: '登录'
    },
    input: {
      groupId: '',
      token: '',
      error: false,
      errorMessage: ''
    },
    welcomeKey: 0
  }),
  created() {
    document.title='公主连结·108集团';
    const name = Vue.$cookies.get('name');

    if (name) {
      this.loginInfo = {
        login: true,
        name: name
      }
    }
  },
  methods: {
    clickLoginBtn() {
      if (!this.loginInfo.login) {
        this.input.error = false;
        this.loginInfo.loginDialog = true;
      } else {
        this.logout();
      }
    },
    login(gid, token) {
      axios.get(`/api/login?gid=${gid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        Vue.$cookies.set('gid', gid);
        Vue.$cookies.set('uid', res.data.uid);
        Vue.$cookies.set('name', res.data.name);
        this.loginInfo = {
          login: true,
          loginDialog: false,
          name: res.data.name
        };
        this.refreshWelcomeComponent();
      }).catch(err => {
        console.log(err);
        this.input.error = true;
        this.input.errorMessage = "登录失败";
      });
    },
    logout() {
      this.loginInfo = {
        loginDialog: false,
        login: false,
        name: '登录'
      };

      Vue.$cookies.remove('gid');
      Vue.$cookies.remove('uid');
      Vue.$cookies.remove('name');

      this.refreshWelcomeComponent();
    },
    refreshWelcomeComponent() {
      ++ this.welcomeKey;
    }
  }
};
</script>
