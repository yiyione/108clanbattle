<template>
  <v-container>
    <v-card class="mx-auto" max-width="1000" tile>
      <v-list shaped>
        <v-subheader>出刀记录</v-subheader>
        <v-list-item-group v-model="item" color="primary" align="left">
          <v-list-item v-for="(item, i) in daoList" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
const axios = require('axios');
export default {
  name: 'Daos',
  data() {
    return {
      daoList: []
    }
  },
  mounted() {
    axios.get(`/api/daos?gid=1020774592&cid=1`).then(res => {
      axios.get(`/api/members?gid=1020774592&cid=1`).then(memberRes => {
          const map = {};
          memberRes.data.forEach(item => {
            map[item.uid] = item.name;
          });
          res.data.forEach(item => {
            item.time = item.time.split('.')[0];
            item.text = `${map[item.uid]}，${item.round}周目，BOSS ${item.boss}，伤害:${item.dmg}，E${item.eid}，时间:${item.time}`;
          });
          this.daoList = res.data;
        }).catch(err => {
          console.log(err);
        });
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
