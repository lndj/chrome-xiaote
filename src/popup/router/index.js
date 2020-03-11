import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import '@vant/touch-emulator';
// import '../../utils/touch-emulator';

Vue.use(VueRouter);
Vue.use(Vant);
Vue.use(Lazyload);

// with options
Vue.use(Lazyload, {
  lazyComponent: true,
});

export default new VueRouter({
  routes,
});
