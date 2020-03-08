<template>
  <div class="container">
    <van-nav-bar title="小特社区" :fixed="true" left-arrow @click-left="onClickLeft" />
      
    <van-panel class="content-pannel" :icon="user.avatarUrl" :title="user.nickname" :desc="user.tag" status="关注">

      <div class="comment-content" v-html="formatContent(community.content)" @click="previewText(formatContent(community.content))"></div>
      <div v-if="community.images && community.images.length > 0" class="commont-img-box">
        <img class="commont-img" v-lazy="firstImageUrl(community.images)" @click="previewImage(community.images)" />
      </div>
      <div slot="footer" class="panel-footer">
        <van-row gutter="40">
          <van-col span="8" class="time-label">{{ community.createdAt | formatTime }}</van-col>
          <van-col span="4" offset="8">
            <van-icon class="comment-icon" name="comment-o" :info="community.commentCount" size="20" />
          </van-col>
          <van-col span="4">
            <van-icon class="like-icon" name="like-o" :info="community.likes" size="20" />
          </van-col>
        </van-row>  
      </div>
    </van-panel>
    <div class="comments-title">最新评论</div>
    <div class="comments-block">
      <center v-if="loading" class="comments-content-loading"><van-loading size="24px">评论加载中...</van-loading></center>
      <div v-show="!loading" class="comments-content" v-for="item in comments" :key="item.objectId" >
        <van-row>
          <van-col span="2" class="time-label" style="padding-top: 4px;">
            <van-image
              round
              width="1.5rem"
              height="1.5rem"
              :src="item.user.avatarUrl"
            />
          </van-col>
          <van-col span="8">
            <p class="comment-nickname">{{ item.user.nickname }}</p>
          </van-col>
          <van-col span="4" offset="8" style="margin-top:8px;padding-left:55px;">
            <van-icon class="like-icon" name="good-job-o" :info="item.likes" size="20" />
          </van-col>
        </van-row>
        <p style="margin-left:25px;margin-right:10px;font-size:12px;">{{ item.content }}</p>
        <div style="margin-left:0px;margin-right:10px;" v-if="item.images && item.images.length > 0" @click="previewImage(item.images)">
          <van-image v-for="img in item.images" :key="img.objectId" :src="img.url"/>
        </div>
        <div class="comment-reply-block" v-if="item.children && item.children.length > 0">
          <div style="margin-top: 2px;" v-for="child in item.children" :key="child.objectId">
            <span style="font-size: 12px;">{{ child.user.nickname }} 回复 {{ child.replyTo.nickname }}: </span>
            <span style="font-size: 10px;color:#45454a;line-height: 160%;">{{ child.content }}</span>
            <div style="" v-if="child.images && child.images.length > 0" @click="previewImage(child.images)">
              <van-image v-for="img in child.images" :key="img.objectId" :src="img.url"/>
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
import { ImagePreview, Dialog, Toast } from 'vant';

export default {
  name: "Comments",
  data() {
    return {
      community: {},
      user: {},
      refreshing: false,
      loading: false,
      comments: [],
      isShouldMounted: false
    };
  },
  // props: ['community'],
  mounted() {
    console.log('评论组件执行 mounted!!!!!');
  },
  filters: {
    formatTime: function (value) {
      // return moment(value * 1000).format("MM-DD HH:mm");
      moment.locale('zh-cn');
      return moment(value * 1000).fromNow();
    }
  },
  methods: {
    follow(userId) {
      alert("关注成功！");
    },
    formatContent (value) {
      if (!value) return '';
      return value.replace(/(\r\n|\n|\r)/gm, "<br />");
    },
    firstImageUrl (images) {
      if (!images || images.length === 0) {
        return "";
      }
      const imgInfo = images[0];
      return imgInfo.url;
    },
    onLoad() {  
      this.loading = true;
      this.getComments();
    },
    onClickLeft() {
      this.$parent.isShowComments = false;
      this.isShouldMounted = false;
    },
    getComments() {
      if (!this.isShouldMounted) {
        return;
      }
      this.comments = [];
      comments(this.community.objectId).then(res => {
         if (this.refreshing) {
          this.refreshing = false;
        }
        if (res) {
          this.comments = res;
        }
        this.loading = false;
      }).catch(err => {
        console.error(err)
        this.$notify('获取数据失败，稍后再试!');
        this.refreshing = false;
        this.loading = false;
      });
    },
    readConent() {
      if (!this.isShouldMounted) {
        return;
      }
      read(this.community.objectId).then(res => {
        console.log('已读:' + this.community.objectId);
      }).catch(err => {
        console.error(err)
        this.$notify('接口请求出错!');
      });
    },
    previewImage(images) {
      const imageList = [];
      images.forEach(img => imageList.push(img.url));
      ImagePreview({
        images: imageList,
        closeable: true
      });
    },
    previewText(content) {
      Dialog.alert({
        message: content,
        messageAlign: 'left',
        confirmButtonText: '关闭',
        closeOnClickOverlay: true
      }).then(() => {
        // on close
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-pannel {
    
  }
  .comment-content {
    margin: 12px 10px 12px 20px;
    font-size: 14px;
  }
  .commont-img {
    margin-left: 20px;
    width: 100%;
  }
  .commont-img-box {
    width: 400px;
    height: 180px;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-bottom: 10px;
    text-align: center;
  }
  .comment-icon {
    float: right;
  }
  .like-icon {
    display: inline;
  }
  .load-more-btn {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
  .panel-footer {
    margin-top: 3px;
  }
  .time-label {
    color: #969799;
    font-size: 12px;
    line-height: 18px;
  }
  .comments-title {
    font-size: 20px;
    margin-left: 10px;
    margin-top: 12px;
  }
  .comments-content {
    margin-top: 20px;
    margin-left: 10px;
  }
  .comments-content-loading {
    margin-top: 10px;
  }
  .comment-nickname {
    vertical-align: middle;
    margin-top: 8px;
  }
  .comment-avatar {
    padding-top: 8px;
  }
  .comment-reply-block {
    margin-left: 25px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: #fafafa;
    padding: 6px;
    border-radius: 8px;
  }
</style>
