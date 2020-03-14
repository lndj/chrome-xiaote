import request from '../utils/request';
import apiRequest from '../utils/apiReuqest';

export function communities(page_index, page_size) {
  const params = { page_index: page_index, page_size: page_size };
  return request({
    url: '/api/v1/communities',
    method: 'get',
    params,
  });
}

export function recommends(page_index, page_size) {
  const params = { page_index: page_index, page_size: page_size };
  return request({
    url: '/api/v1/recommends',
    method: 'get',
    params,
  });
}

export function read(objectId) {
  return request({
    url: '/api/v1/communities/' + objectId + '/read',
    method: 'post',
    data: {
      objectId: objectId,
    },
  });
}

export function comments(objectId) {
  return request({
    url: '/api/v1/communities/' + objectId + '/comments',
    method: 'get',
  });
}

export function statistics(userId) {
  return request({
    url: '/api/v1/users/' + userId + '/statistics',
    method: 'get',
  });
}

export function smsCode(mobliePhone) {
  return apiRequest({
    url: '/1.1/requestSmsCode',
    method: 'post',
    data: {
      mobilePhoneNumber: mobliePhone,
    },
  });
}

export function usersByMobilePhone(smsCode, mobliePhone) {
  return apiRequest({
    url: '/1.1/usersByMobilePhone',
    method: 'post',
    data: {
      smsCode: smsCode,
      mobilePhoneNumber: mobliePhone,
    },
  });
}

export function getUserInfo(userId) {
  return apiRequest({
    url: '/1.1/users/' + userId,
    method: 'get',
  });
}

export function follow(userId, targetUserId) {
  return request({
    url: '/api/v1/users/' + userId + '/followees',
    method: 'post',
    data: {
      uid: targetUserId,
    },
  });
}

export function unFollow(userId, targetUserId) {
  return request({
    url: '/api/v1/users/' + userId + '/followees',
    method: 'delete',
    data: {
      uid: targetUserId,
    },
  });
}

export function like(postId) {
  return request({
    url: '/api/v1/communities/' + postId + '/like',
    method: 'post',
  });
}

export function commentLike(postId, commentId) {
  return request({
    url: '/api/v1/communities/' + postId + '/comments/' + commentId + '/like',
    method: 'post',
  });
}
