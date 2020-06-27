<template>
  <v-container>
    <v-divider inset></v-divider>
    <h1>BOSS状态</h1>
    <v-row>
      <v-col col="6"><a class="exbig">{{ bossData.round }}</a><a class="big">周目</a></v-col>
      <v-col col="6"><a class="exbig">{{ bossData.boss }}</a><a class="big">号boss</a></v-col>
    </v-row>
    <v-row>
      <v-col col="12"><span :style="{'color':getProgressLinearColor()}" :class="{ exbig: !bossData.challenger }">{{ bossData.remind_hp.toLocaleString() }}</span>/{{ bossData.total_hp.toLocaleString() }}</v-col>
    </v-row>
    <template v-if="bossData.challenger">
      <v-row>
          <v-col col="12">
              <a style="font-size:32px;color:#003300;">{{ bossData.challenger.name }}</a>
              <a v-if="bossData.challenger"> 正在挑战boss </a>
          </v-col>
      </v-row>
    </template>
    <v-row style="margin-bottom: 25px">
        <v-col col="12">
            <v-progress-linear
              :value="bossData.remind_hp/bossData.total_hp*100"
              :color="getProgressLinearColor()"
              height="10"
            />
        </v-col>
    </v-row>

    <v-row justify="center">
      <v-col>
        <v-btn x-large color="success" min-width="100%">报刀</v-btn>
      </v-col>
      <v-col>
        <v-btn x-large color="warning" min-width="100%">补时刀</v-btn>
      </v-col>
      <v-col>
        <v-btn x-large color="warning" min-width="100%">尾刀</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn x-large color="error" min-width="100%">掉刀</v-btn>
      </v-col>
      <v-col>
        <v-btn x-large color="error" min-width="100%">挂树</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn x-large color="primary" min-width="100%"> 申请出刀 </v-btn>
      </v-col>
      <v-col>
        <v-btn x-large min-width="100%"> 取消申请 </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn x-large min-width="100%">预约BOSS</v-btn>
      </v-col>
      <v-col>
        <v-btn x-large min-width="100%"> 取消预约 </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';

Vue.use(VueCookies);

export default {
  name: 'Boss',
  data() {
    return {
      bossData: {
        round: Number,
        boss: Number,
        remind_hp: Number,
        total_hp: Number,
        challenger: Object
      }
    }
  },
  mounted() {
    const gid = Vue.$cookies.get('gid');
    axios.get(`/api/boss?gid=${gid}`).then(res => {
      this.bossData = res.data;
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    getProgressLinearColor() {
      const percentage = this.bossData.remind_hp / this.bossData.total_hp * 100;
      if (percentage > 70) {
        return '#67C23A';
      } else if (percentage > 50) {
        return '#9ACD32';
      } else if (percentage > 30) {
        return '#FFA500';
      } else {
        return '#FF0000';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  body{
    text-align:center;
  }
  .big{
    font-size:30px;
  }
  .exbig{
    font-size:46px;
  }
  .v-row {
    margin-bottom: 15px;
  }
</style>
