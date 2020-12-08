<template>
  <div class="avue-sidebar">
    <logo></logo>
    <el-scrollbar class="sidebar-scroll">
      <div v-if="validatenull(menu)"
           class="avue-sidebar--tip">{{$t('menuTip')}}
      </div>
      <el-menu unique-opened
               :default-active="nowTagValue"
               mode="vertical"
               :show-timeout="200"
               :collapse="keyCollapse">
        <sidebar-item :menu="menu"
                      :screen="screen"
                      first
                      :props="website.menu.props"
                      :collapse="keyCollapse"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import logo from '../logo';
import sidebarItem from './sidebarItem';

export default {
  name: 'sidebar',
  components: { sidebarItem, logo },
  inject: ['index'],
  data() {
    return {};
  },
  created() {
    this.index.openMenu(this.menuId);
  },
  computed: {
    ...mapGetters(['website', 'menu', 'tag', 'keyCollapse', 'screen', 'menuId']),
    // 获取menu高亮(当前的路由名称)
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route);
    },
  },
  mounted() {
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.sidebar-scroll {
  height: 100%;
}
</style>
