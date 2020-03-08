<template>
  <div class="container">
    <transition name="van-slide-left">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="van-slide-right">
      <!--因为用的是v-if 所以下面还要创建一个未缓存的路由视图出口-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style>
  .container {
    width: 414px;
    height: 736px;
  }
</style>
