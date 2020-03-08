import * as types from './mutation-types';

export default {
  [types.UPDATE_FOO](state, payload) {
    state.foo = payload;
  },
  [types.READ_POST](state, payload) {
    state.currentPost = payload.post;
  }
};
