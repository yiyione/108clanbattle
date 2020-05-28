<template>
  <v-container>
    <h3>BOSS状态</h3>
    <v-row>
        <v-col :span="12"><a class="exbig">{{ bossData.cycle }}</a><a class="big">周目</a></v-col>
        <v-col :span="12"><a class="exbig">{{ bossData.num }}</a><a class="big">号boss</a></v-col>
    </v-row>
    <v-row>
        <v-col :span="24"><a :class="{ exbig: !bossData.challenger }">{{ bossData.health.toLocaleString() }}</a>/{{ bossData.full_health.toLocaleString() }}</v-col>
    </v-row>
    <template v-if="bossData.challenger">
        <v-row>
            <v-col :span="24">
                <a style="font-size:32px;color:#003300;">{{ find_name(bossData.challenger) }}</a>
                <a v-if="bossData.lock_type==1">正在挑战boss</a>
                <a v-else>锁定 boss 留言：{{ bossData.challenging_comment }}</a>
            </v-col>
        </v-row>
    </template>
    <v-row style="margin-bottom: 25px">
        <v-col :span="24">
            <v-progress-linear :value="bossData.health/bossData.full_health*100" :show-text="false" :color="bossData.challenger ? '#909399' : '#67C23A'" />
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
      clanList: [{
        memberList: [{
          daoList: [{
            isShow: Boolean
          }],
          isShow: Boolean
        }],
        isShow: Boolean
      }]
    }
  },
  mounted() {
    axios.get('/api/clans').then(res => {
      res.data.forEach(item => item.isShow = false);
      this.clanList = res.data;
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    showMembers(item) {
      if (!item.isShow) {
        axios.get(`/api/members?gid=${item.gid}&cid=${item.cid}`).then(res => {
          res.data.forEach(child => {
            child.gid = item.gid;
            child.cid = item.cid;
            child.isShow = false;
          });
          item.memberList = res.data;
          item.isShow = !item.isShow;
        }).catch(err => {
          console.log(err);
        });
      } else {
        item.isShow = !item.isShow;
      }
    },
    showDaos(item, clanIndex) {
      if (!item.isShow) {
        axios.get(`/api/daos?gid=${item.gid}&cid=${item.cid}&uid=${item.uid}&alt=${item.alt}`).then(res => {
          res.data.forEach(item => {
            item.isShow = false;
            item.time = item.time.split('.')[0];
          });
          item.daoList = res.data;
          item.isShow = !item.isShow;
          this.$set(this.clanList, clanIndex, this.clanList[clanIndex]);
        }).catch(err => {
          console.log(err);
        });
      } else {
        item.isShow = !item.isShow;
          this.$set(this.clanList, clanIndex, this.clanList[clanIndex]);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $menuBackColor:#f1f1f1;
  $menuListH2:#8fbfef;
  .asideBox{
    height: 100%;
    aside{
      background: $menuBackColor;
      height: 100%;
      .asideMenu{
        .oneMenu{
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          font-weight: normal;
          color: #454343;
          border-bottom: 1px solid #669cd9;
        }
        .oneMenuChild{
          padding: 0 20px 0 20px;
          height: 40px;
          line-height: 40px;
          background: $menuBackColor;
          border-bottom: 1px solid #ffffff;
          color: #454343;
          font-size: 18px;
        }
        .oneMenuChildChild{
          padding: 0 20px 0 20px;
          height: 100%;
          background: $menuBackColor;
          border-bottom: 1px solid #ffffff;
          color: #454343;
          font-size: 18px;
          word-wrap: break-word;
        }
      }
    }
  }
</style>
