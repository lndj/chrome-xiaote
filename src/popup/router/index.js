import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import Vant from 'vant';
import 'vant/lib/index.css';


Vue.use(VueRouter);
Vue.use(Vant);

export default new VueRouter({
  routes,
});
