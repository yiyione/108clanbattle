<template>
  <v-container>
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </v-container>
</template>

<script>
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios';
import config from '../../config.json';

export default {
  name: "Statistic",
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      series: [],
      chartOptions: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const gid = Vue.$cookies.get("gid") || config.defaultGid;
      const cid = Vue.$cookies.get("cid") || config.defaultCid;

      axios
        .get(`/api/daos?gid=${gid}&cid=${cid}`)
        .then(res => {
          axios
            .get(`/api/members?gid=${gid}&cid=${cid}`)
            .then(memberRes => {
              const map = {};
              memberRes.data.forEach(item => {
                map[item.uid] = item.name;
              });
              res.data.forEach(item => {
                item.name = map[item.uid];
              });
              this.updateCharts(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateCharts(daos) {
      const map = {};
      const totalDmg = {};

      daos.forEach(dao => {
        if (!map[dao.name]) {
          map[dao.name] = [0, 0, 0, 0, 0];
        }
        if (!totalDmg[dao.name]) {
          totalDmg[dao.name] = 0;
        }

        map[dao.name][dao.boss - 1] += dao.dmg;
        totalDmg[dao.name] += dao.dmg;
      });

      const rankList = Object.keys(totalDmg).sort(
        (a, b) => totalDmg[b] - totalDmg[a]
      );
      this.series = [];
      for (let i = 1; i <= 5; ++ i) {
        this.series.push({
          name: `Boss ${i}`,
          data: []
        });
      }
      rankList.forEach(name => {
        for (const [i, v] of map[name].entries()) {
          this.series[i].data.push(v);
        }
      });

      const formatter = val => {
        const num = Math.round(val / 10000);
        return num > 0 ? num + 'W' : '';
      };
      this.chartOptions = {
        chart: {
          type: "bar",
          height: 100 + rankList.length * 30,
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true,
          position: 'center',
          formatter: formatter
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: rankList,
          labels: {
            formatter: formatter
          }
        },
        yaxis: {
          title: {
            text: undefined
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#statistic {
  height: 100%;
}
</style>
