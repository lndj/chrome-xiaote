<template>
  <div class="container">
    <van-nav-bar title="小特社区" :fixed="true" />
    <div style="height:46px;"></div>

    <van-panel class="content-pannel">
      <div slot="header" class="panel-header">
        <van-row gutter="40">
          <van-col span="6">
            <van-image style="margin-top:8px;margin-left:6px;" round width="4rem" height="4rem" :src="user.avatarUrl" />
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

    <van-cell title="消息通知" icon="setting-o" is-link to="setting" />
    <van-cell title="系统设置" icon="setting-o" is-link to="setting" />


    <!-- <div style="height:46px;"></div> -->
  </div>
</template>

<script>
import { comments, read } from '../../../api/index';
import moment from 'moment';
import { mapGetters } from 'vuex';
import { ImagePreview, Dialog, Toast } from 'vant';

export default {
  name: 'Home',
  data() {
    return {
      community: {},
      user: {
        nickname: '一毛哥',
        objectId: 'kodslkdlskdsdsdsdsd',
        avatarUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqdrJIITE6f8xg0wYJyiaJdBPFLbe3tm8dPvlPHTF86TLo9fZG3K3yR5SaicicXfGE0ibgkR5xwo6ITvg/132',
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
.container {
  // overflow: hidden;
}
.panel-header-nickname {
  vertical-align: middle;
  margin-top: 13px;
  font-size: 18px;
}
.panel-header-tag {
  font-size: 14px;
  margin-top: -8px;
}
</style>
