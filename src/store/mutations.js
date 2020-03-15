import * as types from './mutation-types';

export default {
  [types.UPDATE_FOO](state, payload) {
    state.foo = payload;
  },
  [types.READ_POST](state, payload) {
    state.currentPost = payload.post;
  },
  [types.CHANGE_CURRENT_TAB](state, currentTab) {
    state.currentTab = currentTab;
  },
  [types.DOUBLE_CLICK_TAB](state, tab) {
    state.doubleClickTab = tab;
  },
  [types.SET_NOTICE](state, payload) {
    state.noticeConfig = payload;
  },
  [types.SET_STATISTICS](state, payload) {
    state.userStatistics = payload;
  },
  [types.SET_SESSION_TOKEN](state, sessionToken) {
    state.sessionToken = sessionToken;
  },
  [types.SET_LOGIN_USER](state, loginUser) {
    state.loginUser = loginUser;
  },
  [types.TOGGLE_LOGIN_PAGE](state, isShowLoginPage) {
    state.isShowLoginPage = isShowLoginPage;
  },
  [types.TOGGLE_TAB_BAR](state, isShowTabBar) {
    state.isShowTabBar = isShowTabBar;
  },
  [types.SET_TRANSITION_NAME](state, transitionName) {
    state.transitionName = transitionName;
  },
};
