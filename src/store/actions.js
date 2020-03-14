import * as types from './mutation-types';
import { notice } from '@/api/json';

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
