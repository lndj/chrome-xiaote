<template>
  <div>
    <van-nav-bar title="小特社区" :fixed="true">
        <van-icon v-if="currentTab !== 2" name="search" slot="right" @click="search" />
    </van-nav-bar>
    <div style="height:46px;"></div>
  </div>
      
</template>


<script>
  import { formatContent } from '../../utils/tools';
  import { mapGetters } from 'vuex';

  export default {
    name: "HeaderNav",
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters(['currentTab']),
    },
    methods: {
      search() {
        this.$notify('暂不支持搜索，别着急。');
      },
    },
  
  }
</script>
