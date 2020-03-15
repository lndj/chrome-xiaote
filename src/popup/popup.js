import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;

import './router/guards';

/* eslint-disable no-new */
window.App = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
