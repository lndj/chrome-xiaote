<template>
  <div>
    <van-nav-bar title="小特社区" :fixed="true" />
    <div style="height:46px;"></div>

    <van-panel class="content-pannel">
      <div slot="header" class="panel-header">
        <van-row gutter="40">
          <van-col span="6">
            <van-image style="margin-top:6px;margin-bottom:6px;margin-left:6px;" round width="3.8rem" height="3.8rem" :src="user.avatarUrl" />
          </van-col>
          <van-col span="12" style="margin-top: -5px;">
            <div class="panel-header-nickname">{{ user.nickname }}</div>
            <br />
            <div class="panel-header-tag">{{ user.signature }}</div>
          </van-col>
          <van-col span="4" offset="2" @click="goToAccount">
            <van-icon style="margin-top:24px;" size="20" name="arrow" />
          </van-col>
        </van-row>
      </div>
    </van-panel>

    <div>
      <van-grid>
        <van-grid-item
          ><span class="statistics-num">{{ statistics.communities || 0 }}</span
          ><span class="statistics-name">发布</span></van-grid-item
        >
        <van-grid-item
          ><span class="statistics-num">{{ statistics.likes || 0 }}</span
          ><span class="statistics-name">获赞</span></van-grid-item
        >
        <van-grid-item
          ><span class="statistics-num">{{ statistics.followees || 0 }}</span
          ><span class="statistics-name">关注</span></van-grid-item
        >
        <van-grid-item
          ><span class="statistics-num">{{ statistics.followers || 0 }}</span
          ><span class="statistics-name">粉丝</span></van-grid-item
        >
      </van-grid>

      <div v-if="!user.objectId" class="login-block" @click="login">
        <span>登陆</span>
      </div>

      <!-- <van-row class="staistics-bltock" type="flex" justify="center">
        <van-col span="5"><span class="statistics-num">8</span><span class="statistics-name">发布</span></van-col>
        <van-col span="5"><span class="statistics-num">20</span><span class="statistics-name">获赞</span></van-col>
        <van-col span="5"><span class="statistics-num">8</span><span class="statistics-name">关注</span></van-col>
        <van-col span="5"><span class="statistics-num">100</span><span class="statistics-name">粉丝</span></van-col>
      </van-row> -->
    </div>

    <van-cell title="消息通知" icon="more-o" />
    <van-cell title="我的私信" icon="chat-o" />
    <van-cell title="我的评论" icon="notes-o" />
    <van-cell title="我的收藏" icon="star-o" />
    <van-cell title="系统设置" icon="setting-o" is-link to="settings" />
    <van-cell title="关于" icon="label-o" is-link to="about" />

    <!-- <div style="height:46px;"></div> -->
  </div>
</template>

<script>
import { comments, read } from '@/api/index';
import moment from 'moment';
import { mapGetters } from 'vuex';
import { ImagePreview, Dialog, Toast } from 'vant';
import AvatarImage from '@/assets/images/avatar.jpeg';

export default {
  name: 'Home',
  data() {
    return {
      user: {},
      statistics: {},
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(['userStatistics', 'loginUser']),
  },
  watch: {
    loginUser(value) {
      this.init();
    },
  },
  filters: {
    formatTime: function(value) {
      moment.locale('zh-cn');
      return moment(value * 1000).fromNow();
    },
  },
  methods: {
    init() {
      const defaultUser = {
        nickname: '未登录',
        objectId: null,
        avatarUrl: AvatarImage,
        signature: '登陆后使用完整功能',
      };
      if (this.loginUser.objectId) {
        this.user = this.loginUser;
      } else {
        this.user = defaultUser;
      }
      const userId = this.user.objectId;
      if (userId) {
        this.$store.dispatch('GetStatistics', userId).then(() => {
          this.statistics = this.userStatistics.stats;
        });
      }
    },
    login() {
      this.$store.dispatch('ToggleLoginPage', true);
    },
    goToAccount() {
      this.$router.push({ path: 'account' });
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-header-nickname {
  vertical-align: middle;
  margin-top: 13px;
  font-size: 18px;
}
.panel-header-tag {
  font-size: 14px;
  margin-top: -8px;
}
.statistics-block {
  margin-top: 12px;
  margin-bottom: 16px;
}
.statistics-num {
  display: block;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}
.statistics-name {
  display: block;
  text-align: center;
  font-size: 14px;
  font-weight: 100;
  color: gray;
}
.login-block {
  margin: 10px 20px;
  padding: 10px 20px;
  text-align: center;
  display: block;
  border: 0.1px dashed;
  background-color: #fff;
  user-select: none !important;
  -moz-user-select: none !important;
}
</style>
