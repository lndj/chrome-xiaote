<template>
  <div class="comments-containner">
    <van-nav-bar title="小特社区" :fixed="true" z-index="2001" left-arrow @click-left="onClickLeft" />
    <div style="height:46px;"></div>
    <van-panel class="content-pannel">
      <div slot="header" class="panel-header">
        <van-row gutter="40">
          <van-col span="4">
            <van-image style="margin-top:4px;margin-left:6px;" round width="2.1rem" height="2.1rem" :src="user.avatarUrl" />
            <van-image v-if="user.ownerCertified" class="vip-mark" round width="0.8rem" height="0.8rem" :src="VipMarkImage" />
          </van-col>
          <van-col span="12" style="padding-left:25px;">
            <div class="panel-header-nickname">{{ user.nickname }}</div>
            <br />
            <div class="panel-header-tag">{{ user.tag }}</div>
          </van-col>
          <van-col span="4" offset="4">
            <div class="follow-btn" v-if="user.isFollowing" @click="follow(user.objectId, 0)">已关注</div>
            <div class="follow-btn" v-else @click="follow(user.objectId, 1)">关注</div>
          </van-col>
        </van-row>
      </div>
      <div class="comment-content" v-html="formatContent(community.content)"></div>
      <div v-if="community.images && community.images.length > 0" class="common-img-box">
        <img class="common-img" v-lazy="firstImageUrl(community.images)" @click="imagePreview(community.images)" />
        <span v-if="community.images.length > 1" class="image-number">{{ community.images.length }}</span>
      </div>
      <div slot="footer" class="panel-footer">
        <van-row gutter="40">
          <van-col span="8" class="time-label">{{ community.createdAt | formatTime }}</van-col>
          <van-col span="4" offset="4">
            <van-icon class="comment-icon" name="eye-o" :info="community.reads" size="20" />
          </van-col>
          <van-col span="4">
            <van-icon class="comment-icon" name="comment-o" :info="community.commentCount" size="20" />
          </van-col>
          <van-col span="4">
            <van-icon class="like-icon" name="like-o" :info="community.likes" size="20" />
          </van-col>
        </van-row>
      </div>
    </van-panel>
    <div class="comments-title">最新评论</div>
    <div class="comments-block" v-if="!loading && comments.length === 0">
      <center style="margin-top:10px;color:gray;">暂无评论</center>
    </div>

    <div class="comments-block" v-if="loading && comments.length === 0">
      <center class="comments-content-loading"><van-loading size="24px">评论加载中...</van-loading></center>
    </div>

    <div class="comments-block" v-if="comments.length > 0">
      <div v-show="!loading" class="comments-content" v-for="item in comments" :key="item.objectId">
        <van-row>
          <van-col span="2" class="time-label">
            <van-image round width="1.5rem" height="1.5rem" :src="item.user.avatarUrl" />
            <van-image v-if="item.user.ownerCertified" class="vip-mark comments-vip-mark" round width="0.6rem" height="0.6rem" :src="VipMarkImage" />
          </van-col>
          <van-col span="12">
            <p class="comment-nickname">{{ item.user.nickname }} <van-tag v-if="isShowAuthorTag(item.user.objectId)" plain style="font-size:1px;">作者</van-tag></p>
          </van-col>
          <van-col span="4" offset="4" style="margin-top:8px;padding-left:55px;">
            <van-icon class="like-icon" name="good-job-o" :info="item.likes" size="20" />
          </van-col>
        </van-row>
        <p class="comment-item-content">{{ item.content }}</p>
        <div style="margin-left:0px;margin-right:0px;" v-if="item.images && item.images.length > 0" @click="imagePreview(item.images)" class="comment-img-box">
          <van-image class="common-img" v-for="img in item.images" :key="img.objectId" :src="img.url" />
        </div>
        <div class="comment-reply-block" v-if="item.children && item.children.length > 0">
          <div style="margin-top: 2px;" v-for="child in item.children" :key="child.objectId">
            <span style="font-size: 12px;">
              {{ child.user.nickname }} <van-tag v-if="isShowAuthorTag(child.user.objectId)" plain style="font-size:1px;">作者</van-tag>
              <span class="comment-reply-mark"> 回复 </span> {{ child.replyTo.nickname }}
              <van-tag v-if="isShowAuthorTag(child.replyTo.objectId)" plain style="font-size:1px;">作者</van-tag>:
            </span>
            <span style="font-size: 10px;color:#45454a;line-height: 160%;">{{ child.content }}</span>
            <div v-if="child.images && child.images.length > 0" @click="imagePreview(child.images)" class="child-comment-img-box">
              <van-image style="width: 100%;" v-for="img in child.images" :key="img.objectId" :src="img.url" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:46px;"></div>
  </div>
</template>

<script>
import { comments, read } from '../../../api/index';
import moment from 'moment';
import { mapGetters } from 'vuex';
import { Toast } from 'vant';
import { formatContent, imagePreview, firstImageUrl } from '@/utils/tools';
import VipMarkImage from '@/assets/images/vipMark.png';

export default {
  name: 'Comments',
  data() {
    return {
      community: {},
      user: {},
      refreshing: false,
      loading: false,
      comments: [],
      VipMarkImage: VipMarkImage,
    };
  },
  created() {
    console.log('评论组件执行 created!!!!!');
    this.community = this.currentPost;
    this.user = this.currentPost.user;
    this.readConent();
    this.onLoad();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  computed: {
    ...mapGetters(['currentPost']),
  },
  components: {
    // Previewer: vuePicturePreview,
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
    formatContent,
    imagePreview,
    firstImageUrl,
    onLoad() {
      this.loading = true;
      this.getComments();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getComments() {
      this.comments = [];
      comments(this.community.objectId)
        .then(res => {
          if (this.refreshing) {
            this.refreshing = false;
          }
          if (res) {
            this.comments = res;
          }
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          this.$notify('获取数据失败，稍后再试!');
          this.refreshing = false;
          this.loading = false;
        });
    },
    readConent() {
      read(this.community.objectId)
        .then(res => {
          console.log('已读:' + this.community.objectId);
        })
        .catch(err => {
          console.error(err);
          this.$notify('接口请求出错!');
        });
    },
    isShowAuthorTag(userId) {
      return this.user.objectId === userId;
    },
  },
};
</script>

<style lang="scss" scoped>
.comments-title {
  font-size: 20px;
  margin-left: 10px;
  margin-top: 12px;
  margin-bottom: 12px;
}
.comments-block {
  background-color: #fff;
  padding: 10px 0px 20px 0px;
}
.comments-content {
  margin: 10px 0 10px 10px;
}
.comment-item-content {
  margin-left: 25px;
  margin-right: 10px;
  font-size: 12px;
  margin-top: 8px;
}
.comment-reply-mark {
  font-weight: 800;
}
.comments-content-loading {
  margin-top: 10px;
}
.comment-nickname {
  vertical-align: middle;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 13px;
}
.comment-avatar {
  padding-top: 8px;
}
.comment-reply-block {
  margin-left: 25px;
  margin-top: 10px;
  margin-right: 10px;
  background-color: #f4f4fb;
  padding: 6px;
  border-radius: 8px;
}
.child-comment-img {
  margin-left: 0px !important;
  width: 100% !important;
}
.child-comment-img-box {
  width: 357px;
  height: 180px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-bottom: 10px;
  margin-top: 4px;
  text-align: center;
}
.comment-img-box {
  width: 390px;
  height: 180px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-bottom: 10px;
  text-align: center;
}
</style>
