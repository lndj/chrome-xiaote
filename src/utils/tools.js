import { ImagePreview, Toast, Notify } from 'vant';
import { checkLogin } from './auth';
import { follow, unFollow, like, commentLike } from '@/api/index';
import store from '../store';
import _ from 'lodash';

export function formatContent(value) {
  return value.replace(/(\r\n|\n|\r)/gm, '<br />');
}

export function imagePreview(images) {
  const imageList = [];
  images.forEach(img => imageList.push(img.url));
  window.imagePreviewInstance = ImagePreview({
    images: imageList,
    closeable: true,
  });
}

export function firstImageUrl(images) {
  if (!images || images.length === 0) {
    return '';
  }
  const imgInfo = images[0];
  return imgInfo.url;
}

export function followUser(userId, action, postItemUser) {
  if (!checkLogin()) {
    return;
  }
  const loginUserId = store.getters.loginUser.objectId;
  console.log('关注操作：userId=' + userId, action);
  if (action === 1) {
    follow(loginUserId, userId).then(res => {
      postItemUser.isFollowing = true;
      Toast('关注成功！');
    });
  } else {
    unFollow(loginUserId, userId).then(res => {
      postItemUser.isFollowing = false;
      Toast('取消关注成功！');
    });
  }
}

export const likePost =  _.throttle((postItem, isComment) => {
  if (!checkLogin()) {
    return;
  }
  if (postItem.isLike) {
    return;
  }
  postItem.likes += 1;
  postItem.isLike = true;
  if (isComment) {
    commentLike(postItem.communityId, postItem.objectId).then(res => {
    }).catch(err => {
      postItem.likes -= 1;
      postItem.isLike = false;
    });
    return;
  }
  like(postItem.objectId).then(res => {
  }).catch(err => {
    postItem.likes -= 1;
    postItem.isLike = false;
  });
}, 2000);
