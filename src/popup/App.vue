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

    <tab v-show="isShowTab()"></tab>
  </div>
</template>

<script>
import PageTab from './components/Tab';
// import { mapGetters } from 'vuex';

const ESC_KEY_CODE = 27;
const W_KEY_CODE = 87;

function noScroll() {
  window.scrollTo(0, 0);
}
function keyDown(e) {
  const keyCode = e.which;
  const realKey = String.fromCharCode(e.which);
  console.log('按键码: ' + keyCode + ' 字符: ' + realKey);
  // 用户按下 Esc 键
  if (keyCode === ESC_KEY_CODE) {
    e.preventDefault();
    if (window.imagePreviewInstance) {
      window.imagePreviewInstance.close();
      window.imagePreviewInstance = null;
      return;
    }
    // 如果在评论页面，回退一步
    const path = document.$router.history.current.path;
    if (path === '/settings' || path === '/comments' || path === '/about') {
      history.back();
    }
  }
  // 按下 ctrl + w
  if (keyCode === W_KEY_CODE && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    window.close();
  }
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
  created() {
    document.$router = this.$router;
    document.onkeydown = keyDown;
  },
  watch: {
    $route(to, from) {
      console.log(from.path, to.path);
      if ((from.path === '/' || from.path === '/recommends') && to.path === '/comments') {
        this.transitionName = 'van-slide-right';
      } else if (from.path === '/comments' && (to.path === '/' || to.path === '/recommends')) {
        this.transitionName = 'van-slide-left';
      } else {
        this.transitionName = '';
      }
      // 单独的个人中心页面 & 设置页面禁止页面滚动
      if (to.path === '/home' || to.path === '/settings' || to.path === '/about') {
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
    isShowTab() {
      const path = this.$router.history.current.path;
      return path !== '/comments' && path !== '/settings' && path != '/about';
    },
  },
};
</script>

<style>
body {
  background-color: #f7f8fa;
  margin: 0;
  color: #323233;
  font-family: PingFang SC, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.container {
  width: 414px;
  height: 736px;
  margin: auto;
}
</style>
