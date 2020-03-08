<template>
  <div class="container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
