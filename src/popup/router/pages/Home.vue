<template>
  <div class="container">
    <van-nav-bar title="小特社区" :fixed="true" />
    <div style="height:46px;"></div>

    <van-panel class="content-pannel">
      <div slot="header" class="panel-header">
        <van-row gutter="40">
          <van-col span="6">
            <van-image style="margin-top:6px;margin-bottom:6px;margin-left:6px;" round width="3.8rem" height="3.8rem" :src="user.avatarUrl" />
          </van-col>
          <van-col span="12">
            <div class="panel-header-nickname">{{ user.nickname }}</div>
            <br />
            <div class="panel-header-tag">{{ user.tag }}</div>
          </van-col>
          <van-col span="4" offset="2">
            <van-icon style="margin-top:24px;" size="20" name="arrow" />
          </van-col>
        </van-row>
      </div>
    </van-panel>

    <div>
      <van-grid>
        <van-grid-item><span class="statistics-num">8</span><span class="statistics-name">发布</span></van-grid-item>
        <van-grid-item><span class="statistics-num">10</span><span class="statistics-name">获赞</span></van-grid-item>
        <van-grid-item><span class="statistics-num">8</span><span class="statistics-name">关注</span></van-grid-item>
        <van-grid-item><span class="statistics-num">800</span><span class="statistics-name">粉丝</span></van-grid-item>
      </van-grid>
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
      community: {},
      user: {
        nickname: '一毛哥',
        objectId: 'kodslkdlskdsdsdsdsd',
        avatarUrl: AvatarImage,
        tag: '上海 * 未认证',
      },
      refreshing: false,
      loading: false,
      comments: [],
    };
  },
  created() {
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  computed: {
    ...mapGetters(['currentPost']),
  },
  filters: {
    formatTime: function(value) {
      moment.locale('zh-cn');
      return moment(value * 1000).fromNow();
    },
  },
  methods: {
    follow(userId, action) {
      if (action === 1) {
        this.$notify('关注功能还未实现');
      } else {
        this.$notify('取消关注功能还未实现');
      }
    },
    formatContent(value) {
      if (!value) return '';
      return value.replace(/(\r\n|\n|\r)/gm, '<br />');
    },
    firstImageUrl(images) {
      if (!images || images.length === 0) {
        return '';
      }
      const imgInfo = images[0];
      return imgInfo.url;
    },
    onLoad() {
      this.loading = true;
      this.getComments();
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
</style>
