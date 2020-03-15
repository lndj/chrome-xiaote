import router from './index';
import Config from '@/config/index';
import store from '../../store/index'
import { noScroll } from '@/utils/tools';


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.AppName;
  }

  if (to.meta.isShowTabBar) {
    store.dispatch('ToggleTabBar', true);
    // store.commit('TOGGLE_TAB_BAR', true);
  } else {
    store.dispatch('ToggleTabBar', false);
    // store.commit('TOGGLE_TAB_BAR', false);
  }

  const transitionName = to.meta.transitionName; 
  if (transitionName === null || transitionName === undefined) {
    const fromRouterLevel = from.meta.routerLevel;
    const toRouterLevel = to.meta.routerLevel;
    if (toRouterLevel > fromRouterLevel) {
      store.dispatch('SetTransitionName', 'van-slide-right');
    } else if (fromRouterLevel > toRouterLevel) {
      store.dispatch('SetTransitionName', 'van-slide-left');
    } else {
      store.dispatch('SetTransitionName', '');
    }
  } else {
    store.dispatch('SetTransitionName', transitionName);
  }

  // 禁止滚动
  if (to.meta.noScroll) {
    window.addEventListener('scroll', noScroll);
  } else {
    window.removeEventListener('scroll', noScroll);
  }

  next();
});
