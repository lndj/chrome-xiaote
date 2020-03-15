<template>
  <div>
    <div style="height:56px;"></div>
    <van-tabbar v-model="active" z-index="2001">
      <van-tabbar-item class="tab-bar" icon="star-o" replace to="/recommends" @dblclick.native.prevent="doubleClick()">推荐</van-tabbar-item>
      <van-tabbar-item class="tab-bar" icon="home-o" replace to="/" @dblclick.native.prevent="doubleClick()">社区</van-tabbar-item>
      <van-tabbar-item class="tab-bar" icon="user-circle-o" replace to="/home" onselectstart="return false;">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageTab',
  data() {
    return {
      active: 1,
    };
  },
  computed: {
    ...mapGetters(['currentTab']),
  },
  watch: {
    active: function(value) {
      this.$store.commit('CHANGE_CURRENT_TAB', value);
    },
    currentTab: function(value) {
      console.log('currentTab:' + value);
      this.active = value;
    }
  },
  methods: {
    search() {
      this.$notify('暂不支持搜索，别着急。');
    },
    doubleClick() {
      const tab = this.active + '-' + new Date().getTime();
      this.$store.commit('DOUBLE_CLICK_TAB', tab);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-bar {
  user-select: none !important;
  -moz-user-select: none !important;
}
</style>
