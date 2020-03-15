import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foo: 'bar',
    currentPost: {},
    currentTab: 1,
    doubleClickTab: null,
    noticeConfig: {},
    userStatistics: {},
    loginUser: {},
    sessionToken: null,
    isShowLoginPage: false,
    isShowTabBar: true,
    transitionName: '',
  },
  getters,
  mutations,
  actions,
});
