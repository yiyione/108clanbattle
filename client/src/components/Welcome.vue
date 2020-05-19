<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/princess-connect-redive-anime.jpg')"
          class="my-3"
          contain
          height="100%"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          欢迎来到108集团公会
        </h1>

        <p class="subheading font-weight-regular">
          <a
            href="https://wiki.biligame.com/pcr/%E4%BA%94%E6%9C%88%E5%85%AC%E4%BC%9A%E6%88%98%E6%94%BB%E7%95%A5%E5%8F%8A%E4%BD%9C%E4%B8%9A%E5%88%86%E4%BA%AB"
            target="_blank"
          >五月公会战攻略及作业分享</a>
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          公会战数据查询
        </h2>

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

  export default {
    name: 'Welcome',
    components: {
      Clans,
      Daos
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
          text: '工会列表',
          view: 'Clans',
        },
        {
          text: '出刀记录',
          view: 'Daos',
        },
        {
          text: '积分统计',
          view: 'Daos',
        },
      ],
      currentView: ''
    }),
    methods: {
      switchView(view) {
        this.currentView = view;
      }
    }
  }
</script>
