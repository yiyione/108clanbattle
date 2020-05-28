<template>
  <v-container>
    <v-divider inset></v-divider>
    <h1>BOSS状态</h1>
    <v-row>
      <v-col :span="12"></v-col>
      <v-col :span="12"><a class="exbig">{{ bossData.round }}</a><a class="big">周目</a></v-col>
      <v-col :span="12"><a class="exbig">{{ bossData.boss }}</a><a class="big">号boss</a></v-col>
      <v-col :span="12"></v-col>
    </v-row>
    <v-row>
      <v-col :span="24"><span :style="{'color':getProgressLinearColor()}" :class="{ exbig: !bossData.challenger }">{{ bossData.remind_hp.toLocaleString() }}</span>/{{ bossData.total_hp.toLocaleString() }}</v-col>
    </v-row>
    <template v-if="bossData.challenger">
      <v-row>
          <v-col :span="24">
              <a style="font-size:32px;color:#003300;">{{ bossData.challenger.name }}</a>
              <a v-if="bossData.challenger"> 正在挑战boss </a>
          </v-col>
      </v-row>
    </template>
    <v-row style="margin-bottom: 25px">
        <v-col :span="24">
            <v-progress-linear
              :value="bossData.remind_hp/bossData.total_hp*100"
              :color="getProgressLinearColor()"
              height="10"
            />
        </v-col>
    </v-row>

    <v-row align="center">
      <v-col>
      </v-col>
      <v-col>
        <v-btn large color="success">报刀</v-btn>
      </v-col>
      <v-col>
        <v-btn large color="warning">补时刀</v-btn>
      </v-col>
      <v-col>
        <v-btn large color="warning">尾刀</v-btn>
      </v-col>
      <v-col>
        <v-btn large color="error">掉刀</v-btn>
      </v-col>
      <v-col>
        <v-btn large color="error">挂树</v-btn>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col>
      </v-col>
      <v-col>
        <v-btn large color="primary">申请出刀</v-btn>
      </v-col>
      <v-col>
        <v-btn large>取消申请</v-btn>
      </v-col>
      <v-col>
        <v-btn large>预约BOSS</v-btn>
      </v-col>
      <v-col>
        <v-btn large>取消预约</v-btn>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require('axios');
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
    axios.get('/api/boss?gid=1020774592').then(res => {
      res.data.challenger = undefined;
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
    font-size:32px;
  }
  .exbig{
    font-size:48px;
  }
  .v-row {
    margin-bottom: 15px;
  }
  v-button {
    width: 80px;
  }
</style>
