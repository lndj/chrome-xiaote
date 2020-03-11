<template>
  <div class="container">
    <van-nav-bar title="小特社区" :fixed="true" left-arrow @click-left="onClickLeft" />
    <div style="height:46px;"></div>

    <div class="about-icon">
      <van-image
        round
        width="8rem"
        height="8rem"
        :src="AvatarImage"
      />
    </div>

    <div class="about-block">
      
      <span>本插件进攻学习交流，请勿用于其他用途。</span>
      <span>代码：<a href="https://github.com/lndj/chrome-xiaote" target="_blank">https://github.com/lndj/chrome-xiaote</a></span>

      <span style="font-size: 16px;">使用我的 Tesla 推荐码购车，你我均可获得 1500KM 的免费超充额度，邀请链接：<br /><br /> <a href="https://ts.la/lnanddj59482" target="_blank">点我去购买（lnanddj59482）</a></span>
    </div>

    <!-- <div style="height:46px;"></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AvatarImage from '@/assets/images/avatar.jpeg';


export default {
  name: 'About',
  data() {
    return {
      AvatarImage: AvatarImage,
    };
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  computed: {
    ...mapGetters(['currentPost']),
  },
  filters: {
    
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.about-block {
  margin-top: 40px;
}
span {
    font-size: 14px;
    text-align: center;
    display: block;
    margin: 20px 20px 0 20px;
    color: rgba(69, 90, 100, 0.6);
}
.about-icon {
  text-align: center;
  margin-top: 20px;
}
a {
  color: rgba(10, 90, 200, 0.6);
}
</style>
