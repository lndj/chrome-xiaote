<template>
  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
              {
                  title: '小特叔叔',
                  description: '火星 * Model 3',
                  avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                  content: '赛道模式来了！！！！！！！！\n 哈哈哈哈哈哈.'
              },
                 {
                  title: '一毛哥',
                  description: '上海 * 未认证',
                  avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                  content: '赛道模式来了！！！！！！！！\n 哈哈哈哈哈哈.'
              },
              {
                  title: 'This is title 3',
                  description: 'This is description, this is description, this is description.',
                  avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                  content: 'This is the content, this is the content, this is the content, this is the content.'
              }
          ]
    };
  },
  methods: {
    follow(userId) {
      alert("关注成功！");
    }
  }
};
</script>

<style lang="scss" scoped>
// .ivu-list-item-meta-description {
//     font-size: 8px!important;
//     margin-top: -10px!important;
// }
// .ivu-avatar {
//     width: 40px!important;
//     height: 40px!important;
//     line-height: 40px!important;
// }
</style>
