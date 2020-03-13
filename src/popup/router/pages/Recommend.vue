<template>
  <div>
    <van-nav-bar title="小特社区" :fixed="true">
      <van-icon name="search" slot="right" @click="search" />
    </van-nav-bar>
    <div style="height:46px;"></div>

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
            <van-col span="12">
              <div class="panel-header-nickname">{{ item.user.nickname }}</div>
              <br />
              <div class="panel-header-tag">{{ item.user.tag }}</div>
            </van-col>
            <van-col span="4" offset="4">
              <div class="follow-btn" v-if="item.user.isFollowing" @click="follow(item.user.objectId, 0)">已关注</div>
              <div class="follow-btn" v-else @click="follow(item.user.objectId, 1)">关注</div>
            </van-col>
          </van-row>
        </div>

        <div class="comment-content van-multi-ellipsis--l3" v-html="formatContent(item.content)" @click="comments(item)"></div>
        <div v-if="item.images && item.images.length > 0" class="commont-img-box">
          <img class="commont-img" v-lazy="firstImageUrl(item.images)" @click="imagePreview(item.images)" />
          <span v-if="item.images.length > 1" class="image-number">{{ item.images.length }}</span>
        </div>

        <div slot="footer" class="panel-footer">
          <van-row gutter="40">
            <van-col span="8" class="time-label">{{ item.createdAt | formatTime }}</van-col>
            <van-col span="4" offset="8">
              <van-icon class="comment-icon" name="comment-o" :info="item.commentCount" size="20" @click="comments(item)" />
            </van-col>
            <van-col span="4">
              <van-icon class="like-icon" name="like-o" :info="item.likes" size="20" />
            </van-col>
          </van-row>
        </div>
      </van-panel>
    </van-pull-refresh>

    <center style="margin-top:8px;">
      <van-button v-if="pageIndex > 1" class="load-more-btn" plain hairline :loading="loading" type="info" loading-text="Loading..." text="加载更多" @click="onLoad" />
    </center>

    <div style="height:56px;"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="star-o" @click="clickTab">推荐</van-tabbar-item>
      <van-tabbar-item icon="home-o" @click="clickTab">社区</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { communities, recommends } from '@/api/index';
import moment from 'moment';
import { Toast } from 'vant';
import Cookies from 'js-cookie';
import { formatContent, imagePreview, firstImageUrl } from '@/utils/tools';
import VipMarkImage from '@/assets/images/vipMark.png';
import { mapGetters } from 'vuex';

export default {
  name: 'PageRecommends',
  components: {},
  data() {
    return {
      list: [],
      refreshing: false,
      loading: false,
      active: 1,
      pageIndex: 1,
      pageSize: 10,
      isShowNoticeBar: true,
      VipMarkImage: VipMarkImage,
    };
  },
  computed: {
    ...mapGetters(['doubleClickTab']),
  },
  watch: {
    doubleClickTab(newTab, oldTab) {
      console.log('=====----======', newTab, oldTab);
      if (newTab.startsWith('0-')) {
        this.clickTab();
      }
    },
  },
  mounted() {
    Toast.loading({
      duration: 0,
      message: 'Loading...',
      forbidClick: true,
    });
    this.onLoad();
  },
  created() {
    const times = Cookies.get('noticeBarCloseTimes') || 0;
    this.isShowNoticeBar = parseInt(times) <= 2;
  },
  filters: {
    formatTime: function(value) {
      // return moment(value * 1000).format("MM-DD HH:mm");
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
    formatContent,
    imagePreview,
    firstImageUrl,
    onLoad() {
      this.loading = true;
      this.getRecommends(this.pageIndex, this.pageSize);
    },
    getRecommends(pageIndex, pageSize) {
      recommends(pageIndex, pageSize)
        .then(res => {
          if (this.refreshing) {
            this.refreshing = false;
          }
          this.loading = false;
          if (res) {
            if (this.pageIndex === 1) {
              this.list = [];
            }
            res.forEach(item => {
              if (item.type === 1) {
                this.list.push(item.community);
              }
            });
          }
          this.pageIndex += 1;
          Toast.clear();
        })
        .catch(err => {
          console.error(err);
          this.$notify('获取数据失败，稍后再试!');
          Toast.clear();
          this.refreshing = false;
          this.loading = false;
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
      this.$notify('你了解了吗，就关闭?');
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

<style lang="scss"></style>
