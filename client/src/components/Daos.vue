<template>
  <v-container>
    <v-divider inset></v-divider>
    <h1>出刀记录</h1>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="日期"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false; getData();"></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn x-large color="primary" min-width="100%" v-on:click="selectUnfinish()">选中未完成</v-btn>
      </v-col>
      <v-col>
        <v-btn x-large color="error" min-width="100%">催刀</v-btn>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-start" style="width: 1px; min-width: 1px;">
            <v-checkbox
                v-model="selectAll"
                style="margin:0px;padding:0px"
                hide-details
            />
          </th>
          <th v-for="(header, i) in table.headers" v-bind:key="i"
            :class="header.align ? `text-${header.align}` : ''"
            :align="header.align"
            :colspan="header.colspan"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in table.daos" v-bind:key="i">
          <th class="text-start" style="width: 1px; min-width: 1px;">
            <v-checkbox
                v-model="item.selected"
                style="margin:0px;padding:0px"
                @change="select(i, item)"
                hide-details
            />
          </th>
          <td>
            {{ item.name }}
          </td>
          <td>
            <v-chip :color="getColor(item.left)" dark>{{ item.left }}</v-chip>
          </td>
          <template v-for="(d, di) in item.dao">
            <td v-bind:key="di + 'normal'" v-if="d.normal" :colspan="2">
              B:{{ d.normal.boss }}
              D:{{ d.normal.dmg }}
            </td>
            <td v-bind:key="di + 'last'" v-if="d.last">
              B:{{ d.last.boss }}
              D:{{ d.last.dmg }}
            </td>
            <td v-bind:key="di + 'ext'" v-if="d.last">
              {{ d.ext ? 'B:' + d.ext.boss : '' }}
              {{ d.ext ? 'D:' + d.ext.dmg : '' }}
            </td>
          </template>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import config from '../../config.json';

export default {
  name: 'Daos',
  data() {
    return {
      date: this.getLocalTime(),
      menu2: false,
      table: {
        headers: [
          { value: 'name', text: '名字', sortable: true, align: 'start', colspan: 1 },
          { value: 'left', text: '剩余刀', sortable: true, align: 'start', colspan: 1 },
          { value: 'first', text: '第一刀', sortable: false, align: 'center', colspan: 2 },
          { value: 'second', text: '第二刀', sortable: false, align: 'center', colspan: 2 },
          { value: 'third', text: '第三刀', sortable: false, align: 'center', colspan: 2 }
        ],
        index: {},
        daos: [],
        selected: []
      },
      daoList: [],
      unfinishSelected: false
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    selectAll: {
      set(val) {
        this.clearSelected();
        if (val) {
          for (let i = 0; i < this.table.daos.length; ++ i) {
            this.table.selected.push(i);

            const dao = this.table.daos[i];
            dao.selected = true;
            Vue.set(this.table.daos, i, dao);
            this.table.index[i] = i;
          }
        }
      },
      get() {
        return this.table.length === this.table.daos.length;
      }
    }
  },
  methods: {
    getData() {
      const gid = Vue.$cookies.get('gid') || config.defaultGid;
      const cid = Vue.$cookies.get('cid') || config.defaultCid;

      axios.get(`/api/daos?gid=${gid}&cid=${cid}`).then(res => {
        axios.get(`/api/members?gid=${gid}&cid=${cid}`).then(memberRes => {
            const map = {};
            memberRes.data.forEach(item => {
              map[item.uid] = item.name;
            });
            res.data.forEach(item => {
              item.time = item.time.split('.')[0];
              item.name = map[item.uid];
              item.text = `${item.name}，${item.round}周目，BOSS ${item.boss}，伤害:${item.dmg}，E${item.eid}，时间:${item.time}`;
            });
            this.daoList = res.data;
            this.table.daos = this.getDataDaos(this.daoList);
          }).catch(err => {
            console.log(err);
          });
      }).catch(err => {
        console.log(err);
      });
    },
    select(i, item) {
      if (item.selected) {
        this.table.index[i] = this.table.selected.length;
        this.table.selected.push(i);
      } else {
        this.table.selected.splice(this.table.index[i], 1);
      }
    },
    getColor(left) {
      if (left >= 3) {
        return 'red';
      } else if (left >= 2) {
        return 'orange';
      } else if (left >= 0.5) {
        return 'blue';
      } else {
        return 'green';
      }
    },
    getDataDaos(daoList) {
      const ds = this.getDateString(new Date(Date.parse(this.date.replace(/-/g, '/'))));
      const map = {};
      daoList.forEach(item => {
        const itemDS = this.getDateString(new Date(item.time))
        if (itemDS.dd != ds.dd) {
          return;
        }
        if (map[item.uid] === undefined) {
          map[item.uid] = {
            uid: item.uid,
            name: item.name,
            cur: 0,
            left: 3,
            dao: [{},{},{}]
          }
        }
        const type = this.getDaoType(item.flag);
        if (type === 'normal') {
          map[item.uid].dao[map[item.uid].cur].normal = {
            dmg: item.dmg,
            boss: item.boss
          };
          map[item.uid].cur += 1;
          map[item.uid].left -= 1;
        } else if (type === 'last') {
          map[item.uid].dao[map[item.uid].cur].last = {
            dmg: item.dmg,
            boss: item.boss
          };
          map[item.uid].left -= 0.5;
        } else if (type === 'ext') {
          map[item.uid].dao[map[item.uid].cur].ext = {
            dmg: item.dmg,
            boss: item.boss
          };
          map[item.uid].cur += 1;
          map[item.uid].left -= 0.5;
        }
      });
      
      return Object.values(map);
    },
    getDaoType(flag) {
      if (flag === undefined || flag === 0x00) {
        return 'normal';
      } else if (flag == 0x01) {
        return 'last';
      } else if (flag == 0x02) {
        return 'ext';
      } else if (flag == 0x04) {
        return 'timeout';
      } else {
        return 'unknown';
      }
    },
    getDateString(date) {
        if (date === undefined) {
            date = new Date();
        }
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 20) {
            mm = mm - 1;
        }

        if (mm < 1) {
            mm = 12;
            yyyy = yyyy - 1;
        }

        return {
            yyyy,
            mm,
            dd
        };
    },
    getLocalTime() {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      return (new Date(Date.now() - tzoffset)).toISOString().substr(0, 10);
    },
    clearSelected() {
        for (const index of this.table.selected) {
          const dao = this.table.daos[index];
          dao.selected = false;
          Vue.set(this.table.daos, index, dao);
        }
        this.table.selected = [];
    },
    selectUnfinish() {
      this.clearSelected();
      if (!this.unfinishSelected) {
        for (const [i, item] of this.table.daos.entries()) {
          if (item.left > 0) {
            const dao = this.table.daos[i];
            dao.selected = true;
            this.select(i, item);
            Vue.set(this.table.daos, i, dao);
          }
        }
      }

      this.unfinishSelected = !this.unfinishSelected;
    },
    remain() {
      const gid = Vue.$cookies.get('gid') || config.defaultGid;
      const cid = Vue.$cookies.get('cid') || config.defaultCid;
      const token = Vue.$cookies.get('token');

      if (token) {
        const targets = [];
        this.table.selected.forEach(idx => {
          targets.push(this.table.daos[idx].uid);
        })
        axios.post(`/api/remain?gid=${gid}&cid=${cid}`, {
          targets: targets
        }, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }).then(res => {
          console.log(res.data);
        }).catch(err => {
          console.log(err);
          alert('催刀失败');
        });
        alert('已提交催刀请求');
      } else {
        alert('催刀请先登录');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  table th + th { border-left:1px solid #dddddd; }
  table th + td { border-left:1px solid #dddddd; }
  table td + td { border-left:1px solid #dddddd; }
</style>
