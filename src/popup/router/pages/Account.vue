<template>
  <div>
    <van-nav-bar title="编辑资料" :fixed="true" left-arrow @click-left="onClickLeft" />
    <div style="height:46px;"></div>

    <van-cell title="头像" is-link>
      <van-image round width="1.5rem" height="1.5rem" :src="loginUser.avatarUrl" />
    </van-cell>
    <van-cell title="昵称" is-link :value="loginUser.nickname" />
    <van-cell title="介绍" is-link :value="loginUser.signature" />
    <van-cell title="性别" is-link :value="gender" />
    <van-cell title="地区" is-link :value="region" />
    <div v-if="loginUser.objectId" class="logout-block" @click="logout">
      <span>退出登陆</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ImagePreview, Dialog, Toast } from 'vant';
import AvatarImage from '@/assets/images/avatar.jpeg';

export default {
  name: 'Account',
  data() {
    return {
      user: {
        nickname: '未登录',
        objectId: null,
        avatarUrl: AvatarImage,
        signature: '登陆后使用完整功能',
      },
      statistics: {},
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(['userStatistics', 'loginUser']),
    region() {
      return this.loginUser.region.province + ' ' + this.loginUser.region.city + ' ' + this.loginUser.region.district;
    },
    gender() {
      const genderMap = {
        '1': '男',
        '2': '女',
        '0': '保密',
      };
      return genderMap[this.loginUser.gender + ''] || '未知';
    },
  },
  watch: {},
  filters: {
    formatTime: function(value) {
      moment.locale('zh-cn');
      return moment(value * 1000).fromNow();
    },
  },
  methods: {
    init() {
      if (this.loginUser.objectId) {
        this.user = this.loginUser;
      }
      const userId = this.user.objectId;
      if (userId) {
        this.$store.dispatch('GetStatistics', userId).then(() => {
          this.statistics = this.userStatistics.stats;
        });
      }
    },
    logout() {
      this.$dialog
        .confirm({
          title: '退出登陆',
          message: '确定要退出登陆吗？',
        })
        .then(() => {
          this.$store.dispatch('Logout');
        })
        .catch(() => {});
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.logout-block {
  margin: 40px 20px;
  padding: 10px 20px;
  text-align: center;
  display: block;
  border: 1px solid red;
  color: red;
  background-color: #fff;
  user-select: none !important;
  -moz-user-select: none !important;
}
</style>
