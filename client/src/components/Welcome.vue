<template>
  <v-container fluid style="max-width: 1010px">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src="../assets/princess-connect-redive-anime.jpg"
          class="my-3"
          contain
          height="100%"
          
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">
          欢迎来到108集团公会
        </h1>

        <p class="subheading font-weight-regular">
          <a
            href="https://www.bilibili.com/video/BV1gi4y13747"
            target="_blank"
          >团队战四期巨蟹座云视频</a>
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-row justify="center">
          <a
            v-for="(next, i) in battleData"
            :key="i"
            @click="switchView(next.view)"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
        <div :is="currentView" />
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          相关网址
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Clans from './Clans';
  import Daos from './Daos';
  import Boss from './Boss';
  import Statistic from './Statistic';
  import Qidai from './Qidai';

  export default {
    name: 'Welcome',
    components: {
      Clans,
      Daos,
      Boss,
      Statistic,
      Qidai
    },
    data: () => ({
      importantLinks: [
        {
          text: 'B服官网',
          href: 'https://game.bilibili.com/pcr/',
        },
        {
          text: '竞技场查询',
          href: 'https://pcrdfans.com/battle',
        },
        {
          text: 'NGA论坛',
          href: 'https://bbs.nga.cn/thread.php?fid=-10308342&rand=222',
        },
        {
          text: '官方微博',
          href: 'https://www.weibo.com/u/6603867494',
        },
        {
          text: '本站源代码',
          href: 'https://github.com/yiyione/108clanbattle',
        },
      ],
      battleData: [
        {
          text: 'BOSS',
          view: 'Boss',
        },
        {
          text: '人员列表',
          view: 'Clans',
        },
        {
          text: '出刀记录',
          view: 'Daos',
        },
        {
          text: '伤害统计',
          view: 'Statistic',
        },
        {
          text: '积分统计',
          view: 'Qidai',
        },
      ],
      currentView: 'Boss'
    }),
    methods: {
      switchView(view) {
        this.currentView = view;
      }
    }
  }
</script>
