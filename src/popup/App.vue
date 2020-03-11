<template>
  <div class="container">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="van-slide-right">
      <!--因为用的是v-if 所以下面还要创建一个未缓存的路由视图出口-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <tab v-show="getPath() !== '/comments'"></tab>
  </div>
</template>

<script>
import PageTab from './components/Tab';
// import { mapGetters } from 'vuex';

function noScroll() {
  window.scrollTo(0, 0);
}

export default {
  data() {
    return {
      transitionName: '',
    };
  },
  computed: {
    // ...mapGetters(['currentTab']),
  },
  watch: {
    $route(to, from) {
      console.log(from.path, to.path);
      if ((from.path === '/' || from.path === '/recommends') && to.path === '/comments') {
        this.transitionName = 'van-slide-right';
      } else if ((to.path === '/' || to.path === '/recommends') && from.path === '/comments') {
        this.transitionName = 'van-slide-left';
      } else {
        this.transitionName = '';
      }
      console.log(this.transitionName);

      // 单独的个人中心页面禁止页面滚动
      if (to.path === '/home') {
        window.addEventListener('scroll', noScroll);
      } else {
        window.removeEventListener('scroll', noScroll);
      }
    },
  },
  components: {
    tab: PageTab,
  },
  methods: {
    getPath() {
      return this.$router.history.current.path;
    },
  },
};
</script>

<style>
.container {
  width: 414px;
  height: 736px;
}
</style>
