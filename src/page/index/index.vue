<template>
  <div class="avue-contail"
       :class="{ 'avue--collapse': isCollapse }">
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top ref="top" />
    </div>
    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar />
      </div>
      <div class="avue-main">
        <!-- 顶部标签卡 -->
        <tags />
        <transition name="fade-scale">
          <search class="avue-view"
                  v-show="isSearch"></search>
        </transition>
        <!-- 主体视图层 -->
        <div class="main-view"
             id="avue-view"
             v-show="!isSearch">
          <keep-alive>
            <router-view class="avue-view"
                         v-if="$route.meta.$keepAlive" />
          </keep-alive>
          <router-view class="avue-view"
                       v-if="!$route.meta.$keepAlive" />
        </div>
      </div>
    </div>
    <div class="avue-shade"
         @click="showCollapse"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import tags from './tags';
import search from './search';
import top from './top/';
import sidebar from './sidebar/';
import admin from '@/util/admin';
import { validatenull } from '@/util/validate';
import { calcDate } from '@/util/date.js';
import { getStore } from '@/util/store.js';

export default {
  components: {
    top,
    tags,
    search,
    sidebar,
  },
  name: 'index',
  provide() {
    return {
      index: this,
    };
  },
  data() {
    return {
      // 搜索控制
      isSearch: false,
      // 刷新token锁
      refreshLock: true,
      // 刷新token的时间
      refreshTime: '',
    };
  },
  created() {
    // 实时检测刷新token
    this.refreshToken();
  },
  mounted() {
    this.init();
  },
  computed: mapGetters(['isMenu', 'isLock', 'isCollapse', 'website', 'menu']),
  props: [],
  methods: {
    showCollapse() {
      this.$store.commit('SET_COLLAPSE');
    },
    // 初始化
    init() {
      this.$store.commit('SET_SCREEN', admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit('SET_SCREEN', admin.getScreen());
        }, 0);
      };
      this.$store.dispatch('FlowRoutes').then(() => {
      });
    },
    // 打开菜单
    openMenu(item = {}) {
      this.$store.dispatch('GetMenu', item.id).then(data => {
        if (data.length !== 0) {
          this.$router.$avueRouter.formatRoutes(data, true);
        }
      }).catch(() => { });
    },
    // 定时检测token
    refreshToken() {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: 'token',
          debug: true,
        }) || {};
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch('refreshToken')
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 10000);
    },
  },
};
</script>
<style lang="scss" scoped>
.main-view {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
