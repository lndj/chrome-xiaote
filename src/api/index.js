import request from '../utils/request';

export function communities(page_index, page_size) {
  const params = { page_index: page_index, page_size: page_size}
  return request({
    url: '/v1/communities',
    method: 'get',
    params
  })
};

export function recommends(page_index, page_size) {
  const params = { page_index: page_index, page_size: page_size}
  return request({
    url: '/v1/recommends',
    method: 'get',
    params
  })
};

export function read(objectId) {
  return request({
    url: '/v1/communities/' + objectId + '/read',
    method: 'post',
    data: {
      objectId: objectId
    }
  })
};

export function comments(objectId) {
  return request({
    url: '/v1/communities/' + objectId + '/comments',
    method: 'get'
  })
};
