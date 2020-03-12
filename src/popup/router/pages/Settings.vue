<template>
  <div class="container">
    <van-nav-bar title="小特社区" :fixed="true" left-arrow @click-left="onClickLeft" />
    <div style="height:46px;"></div>

    <div class="setting-block">
      <div class="setting-block-title">
        <p>新帖子通知</p>
      </div>
      <!-- <van-cell title="开启新帖子通知">
        <van-switch v-model="openNewPostNitice" slot="right-icon" size="24" />
      </van-cell> -->
      <van-form @submit="saveNoticeConfig" class="form-block">
        <van-field name="openNewPostNitice" label="是否开启">
          <template #input>
            <van-switch v-model="openNewPostNitice" slot="right-icon" size="24" />
          </template>
        </van-field>
        <van-field
          v-model="newPostNiticeDeltaMinute"
          center
          type="number"
          :disabled="!openNewPostNitice"
          clearable
          label="间隔分钟"
          placeholder="请输入分钟"
        >
          <van-button slot="button" size="small" type="primary">保存</van-button>
        </van-field>
      </van-form>
    </div>

    <!-- <div style="height:46px;"></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Toast } from 'vant';
import AvatarImage from '@/assets/images/avatar.jpeg';

export default {
  name: 'Settings',
  data() {
    return {
      openNewPostNitice: false,
      newPostNiticeDeltaMinute: 5,
    };
  },
  created() {
    this.getNoticeConfig();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  computed: {
    ...mapGetters(['currentPost']),
  },
  filters: {
    
  },
  methods: {
    saveNoticeConfig() {
      console.log(this.openNewPostNitice, this.newPostNiticeDeltaMinute);
      const config = {
        openNewPostNitice: this.openNewPostNitice,
        newPostNiticeDeltaMinute: parseFloat(this.newPostNiticeDeltaMinute),
      };
      chrome.storage.sync.set({'newPostNotice': config}, function() {
        Toast.success('配置保存成功');
      });
    },
    getNoticeConfig() {
      chrome.storage.sync.get('newPostNotice', config => {
        if (config.newPostNotice) {
          this.$set(this, 'openNewPostNitice', config.newPostNotice.openNewPostNitice);
          this.$set(this, 'newPostNiticeDeltaMinute', config.newPostNotice.newPostNiticeDeltaMinute);
          console.log(config.newPostNotice.openNewPostNitice, config.newPostNotice.newPostNiticeDeltaMinute);
        }
      });
    },
    formatter(value) {
      return value + ' 分钟';
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.setting-block-title {
    margin: 0;
    padding: 14px 12px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 8px;
}

.form-block {
  background-color: #fff;
}

</style>
