import * as types from './mutation-types';

export default {
  [types.UPDATE_FOO](state, payload) {
    state.foo = payload;
  },
  [types.READ_POST](state, payload) {
    state.currentPost = payload.post;
  },
  [types.CHANGE_CURRENT_TAB](state, payload) {
    state.currentTab = payload.tab;
  },
  [types.DOUBLE_CLICK_TAB](state, payload) {
    state.doubleClickTab = payload.tab;
  },
};
