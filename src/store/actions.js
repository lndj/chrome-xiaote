import * as types from './mutation-types';
import { getToken, setToken, removeToken, getUserId, setUserId } from '@/utils/auth';
import { notice } from '@/api/json';
import { statistics, getUserInfo } from '@/api/index';
import { checkLogin } from '../utils/auth';

export const setFoo = ({ commit }, payload) => {
  commit(types.UPDATE_FOO, payload);
};

export const GetNotice = ({ commit }) => {
  return new Promise((resolve, reject) => {
    notice()
      .then(res => {
        console.log(res);
        commit('SET_NOTICE', res);
        resolve();
      })
      .catch(err => {
        console.error(err);
      });
  });
};

export const GetStatistics = ({ commit }, userId) => {
  return new Promise((resolve, reject) => {
    statistics(userId)
      .then(res => {
        commit('SET_STATISTICS', res);
        resolve();
      })
      .catch(err => {
        console.error(err);
        reject();
      });
  });
};

export const Login = ({ commit }, userInfo) => {
  return new Promise((resolve, reject) => {
    const sessionToken = userInfo.sessionToken;
    commit('SET_SESSION_TOKEN', sessionToken);
    setToken(sessionToken);
    setUserId(userInfo.objectId);
    commit('SET_LOGIN_USER', userInfo);
    resolve();
  });
};

export const ToggleLoginPage = ({ commit }, isShowLoginPage) => {
  commit('TOGGLE_LOGIN_PAGE', isShowLoginPage);
};

export const GetUserInfo =  ({ commit }) => {
  return new Promise((resolve, reject) => {
    const userId = getUserId();
    if (!userId) {
      resolve();
      return;
    }
    getUserInfo(userId).then(res => {
      commit('SET_LOGIN_USER', res);
      resolve(res);
    }).catch(error => {
      reject(error);
    })
  })
};
