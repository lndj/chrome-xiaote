<template>
  <div>
    <van-nav-bar title="小特社区" :fixed="true" z-index="2001">
      <van-icon name="search" slot="right" @click="search" />
    </van-nav-bar>
    <div style="height:46px;"></div>
    <van-notice-bar v-if="isShowNoticeBar" :text="noticeContent" left-icon="volume-o" mode="closeable" @close="closeNoticeBar" />

    <van-pull-refresh v-model="refreshing" loading-text="数据加载中..." success-text="数据刷新成功..." @refresh="onRefresh">
      <div v-if="list.length === 0">
        <van-skeleton title avatar :row="3" />
        <van-skeleton title avatar :row="3" />
        <van-skeleton title avatar :row="3" />
        <van-skeleton title avatar :row="3" />
      </div>

      <van-panel class="content-pannel" v-for="item in list" :key="item.objectId">
        <div slot="header" class="panel-header">
          <van-row gutter="40">
            <van-col span="4">
              <van-image style="margin-top:6px;margin-left:6px;" round width="2.1rem" height="2.1rem" :src="item.user.avatarUrl" />
              <van-image v-if="item.user.ownerCertified" class="vip-mark" round width="0.8rem" height="0.8rem" :src="VipMarkImage" />
            </van-col>
            <van-col span="12" style="padding-left:25px;">
              <div class="panel-header-nickname">{{ item.user.nickname }}</div>
              <br />
              <div class="panel-header-tag">{{ item.user.tag }}</div>
            </van-col>
            <van-col span="5" offset="3">
              <div class="follow-btn" v-if="item.user.isFollowing" @click="followUser(item.user.objectId, 0, item.user)">已关注</div>
              <div class="follow-btn" v-else @click="followUser(item.user.objectId, 1, item.user)">关注</div>
            </van-col>
          </van-row>
        </div>

        <div class="comment-content van-multi-ellipsis--l3" v-html="formatContent(item.content)" @click="comments(item)"></div>
        <div v-if="item.images && item.images.length > 0" class="common-img-box">
          <img class="common-img" v-lazy="firstImageUrl(item.images)" @click="imagePreview(item.images)" />
          <span v-if="item.images.length > 1" class="image-number">{{ item.images.length }}</span>
        </div>

        <div slot="footer" class="panel-footer">
          <van-row gutter="40">
            <van-col span="8" class="time-label">{{ item.createdAt | formatTime }}</van-col>
            <van-col span="4" offset="8">
              <van-icon class="comment-icon" name="comment-o" :info="item.commentCount" size="20" @click="comments(item)" />
            </van-col>
            <van-col span="4">
              <van-icon v-if="item.isLike" class="like-icon" name="like" :info="item.likes" size="20" />
              <van-icon v-else class="like-icon" name="like-o" :info="item.likes" size="20" @click="likePost(item, false)" />
            </van-col>
          </van-row>
        </div>
      </van-panel>
    </van-pull-refresh>

    <center style="margin-top:8px;">
      <van-button v-if="pageIndex > 1" class="load-more-btn" plain hairline :loading="loading" type="info" loading-text="Loading..." text="加载更多" @click="onLoad" />
    </center>
    <div style="height:56px;"></div>
  </div>
</template>

<script>
import { communities, recommends } from '@/api/index';
import moment from 'moment';
import { Toast } from 'vant';
import Cookies from 'js-cookie';
import { formatContent, imagePreview, firstImageUrl, followUser, likePost } from '@/utils/tools';
import VipMarkImage from '@/assets/images/vipMark.png';
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',
  components: {},
  data() {
    return {
      list: [],
      refreshing: false,
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      isShowNoticeBar: false,
      VipMarkImage: VipMarkImage,
      noticeContent: null,
      closeNoticeTips: null,
    };
  },
  computed: {
    ...mapGetters(['doubleClickTab', 'noticeConfig']),
  },
  watch: {
    doubleClickTab(newTab, oldTab) {
      if (newTab.startsWith('1-')) {
        this.clickTab();
      }
    },
  },
  mounted() {
    Toast.loading({
      duration: 6000,
      message: 'Loading...',
      forbidClick: true,
    });
    this.onLoad();
  },
  created() {
    this.$store
      .dispatch('GetNotice')
      .then(() => {
        console.log(this.noticeConfig);
        if (!this.noticeConfig) {
          return;
        }
        const hadTimes = Cookies.get('noticeBarCloseTimes') || 0;
        const closeTimes = this.noticeConfig.closeTimes;
        const notice = this.noticeConfig.notice;
        console.log('公告配置：', closeTimes, notice);
        if (hadTimes >= closeTimes) {
          console.log('已经达到【公告】不再显示条件');
          return;
        }
        this.noticeContent = notice;
        this.closeNoticeTips = this.noticeConfig.closeTips;
        this.isShowNoticeBar = true;
      })
      .catch(err => {
        console.error(err);
      });
  },
  filters: {
    formatTime: function(value) {
      // return moment(value * 1000).format("MM-DD HH:mm");
      moment.locale('zh-cn');
      return moment(value * 1000).fromNow();
    },
  },
  methods: {
    followUser,
    formatContent,
    imagePreview,
    firstImageUrl,
    likePost,
    onLoad() {
      this.loading = true;
      this.getCommunities(this.pageIndex, this.pageSize);
    },
    getCommunities(pageIndex, pageSize) {
      communities(pageIndex, pageSize)
        .then(res => {
          if (this.refreshing) {
            this.refreshing = false;
          }
          if (res) {
            if (this.pageIndex === 1) {
              this.list = res;
              const first = res[0];
              this.saveLastestPostId(first.objectId);
            } else {
              res.forEach(item => {
                this.list.push(item);
              });
            }
          }
          this.pageIndex += 1;
          Toast.clear();
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          this.$notify('获取数据失败，稍后再试!');
          this.refreshing = false;
          this.loading = false;
          Toast.clear();
        });
    },
    saveLastestPostId(objectId) {
      chrome.storage.sync.set({ latestPostId: objectId }, function() {
        console.log('已经保存最新的帖子的ID: ' + objectId);
      });
    },
    onRefresh() {
      this.refreshing = true;
      this.pageIndex = 1;
      this.onLoad();
    },
    clickTab() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.pageIndex = 1;
      this.refreshing = true;
      this.onLoad();
    },
    search() {
      this.$notify('暂不支持搜索，别着急。');
    },
    closeNoticeBar() {
      this.$notify({ type: 'primary', message: this.closeNoticeTips || '你了解了吗，就关闭?' });
      const times = Cookies.get('noticeBarCloseTimes') || 0;
      const currentTimes = parseInt(times) + 1;
      console.log('本次设置 Cookie 的关闭次数是：' + currentTimes);
      Cookies.set('noticeBarCloseTimes', currentTimes);
    },
    comments(item) {
      this.$store.commit('READ_POST', { post: item });
      this.$router.push({ path: 'comments' });
    },
  },
};
</script>

<style>
.van-info {
  background-color: #9a9797 !important;
}
.comment-content {
  margin: 12px 10px 12px 20px;
  font-size: 14px;
}
.common-img {
  margin-left: 20px;
  width: 100%;
}
.common-img-box {
  width: 400px;
  height: 180px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-bottom: 10px;
  text-align: center;
  position: relative;
}
.comment-icon {
  float: right;
  margin-top: 10%;
}
.like-icon {
  display: inline;
  margin-top: 10%;
}
.load-more-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.panel-header {
  margin-left: 8px;
}
.panel-header-nickname {
  font-size: 14px;
  vertical-align: middle;
  margin-left: -30px;
  margin-top: 3px;
}
.panel-header-tag {
  margin-left: -30px;
  margin-top: -13px;
  color: gray;
}
.follow-btn {
  margin-top: 12.5px;
  width: 38px;
}
.panel-footer {
  margin-top: 3px;
}
.time-label {
  color: #969799;
  font-size: 12px;
  line-height: 18px;
  margin-top: 1%;
}
.vip-mark {
  margin-left: 30px;
  position: absolute !important;
  z-index: 2000;
  margin-top: -14px;
  border: 1px solid #fff;
}
.comments-vip-mark {
  margin-left: -5px;
  margin-top: 16px;
}
.image-number {
  display: block;
  position: absolute;
  font-size: 15px;
  z-index: 1;
  color: #fff;
  bottom: 8px;
  right: 8px;
  background-color: rgb(29, 26, 26, 0.8);
  padding: 1px 15px 1px 15px;
  border-radius: 15%;
}
.van-icon-like {
  color: #e05555 !important;
}
.van-icon-good-job {
  color: #e05555 !important;
}
</style>
