<template>
  <div class="hello">
    <h1>欢迎使用108集团公会战机器人</h1>
    <h3>公会列表</h3>
    <div class="asideBox">
      <aside>
        <ul class="asideMenu">
          <li v-for="(clan,clanIndex) in clanList" :key="clan.gid">
            <div class="oneMenu" @click="showMembers(clan, clanIndex)">
              <span>{{clan.name}}</span>
            </div>
            <ul v-show="clan.isShow">
              <li v-for="(member,memberIndex) in clan.memberList" :key="member.uid">
                <div class="oneMenuChild" @click="showDaos(member, clanIndex, memberIndex)">
                  <span>{{member.name}}</span>
                </div>
                <ul v-show="member.isShow">
                  <li v-for="(item) in member.daoList" :key="item.eid">
                    <div class="oneMenuChildChild">
                      <span>时间:{{item.time.split('.')[0]}},{{item.round}}周目,BOSS {{item.boss}},伤害:{{item.dmg}}</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'HelloWorld',
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
          res.data.forEach(item => item.isShow = false);
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
