<template>
  <div class="container">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <!--因为用的是v-if 所以下面还要创建一个未缓存的路由视图出口-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <tab v-show="isShowTabBar"></tab>
    <login :show="isShowLoginPage" @loginPageClose="loginPageClose"></login>
  </div>
</template>

<script>
import PageTab from './components/Tab';
import LoginPage from './components/Login';
import { mapGetters } from 'vuex';
import { keyDown } from '@/utils/tools';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isShowLoginPage', 'isShowTabBar', 'transitionName']),
  },
  created() {
    document.$router = this.$router;
    document.onkeydown = keyDown;
    this.$store.dispatch('GetUserInfo');
  },
  components: {
    tab: PageTab,
    login: LoginPage,
  },
  methods: {
    loginPageClose() {
      this.$store.dispatch('ToggleLoginPage', false);
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
