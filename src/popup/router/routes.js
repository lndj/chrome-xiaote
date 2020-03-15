import PageIndex from './pages/Index';
import PageRecommends from './pages/Recommend';
import UserHome from './pages/Home';
import Comments from './pages/Comments';
import Settings from './pages/Settings';
import About from './pages/About';
import Account from './pages/Account';

export default [
  {
    path: '/',
    component: PageIndex,
    meta: {
      keepAlive: true,
      title: '首页',
      isShowTabBar: true,
      routerLevel: 1,
    },
  },
  {
    path: '/recommends',
    component: PageRecommends,
    meta: {
      keepAlive: true,
      isShowTabBar: true,
      routerLevel: 1,
    },
  },
  {
    path: '/home',
    component: UserHome,
    meta: {
      keepAlive: true,
      noScroll: true,
      isShowTabBar: true,
      routerLevel: 1,
      transitionName: '',
    },
  },
  {
    path: '/comments',
    component: Comments,
    meta: {
      keepAlive: false,
      isShowTabBar: false,
      routerLevel: 2,
    },
  },
  {
    path: '/settings',
    component: Settings,
    meta: {
      keepAlive: true,
      noScroll: true,
      isShowTabBar: false,
      routerLevel: 2,
      transitionName: '',
    },
  },
  {
    path: '/about',
    component: About,
    meta: {
      keepAlive: true,
      noScroll: true,
      isShowTabBar: false,
      routerLevel: 2,
      transitionName: '',
    },
  },
  {
    path: '/account',
    component: Account,
    meta: {
      keepAlive: true,
      noScroll: true,
      isShowTabBar: false,
      routerLevel: 2,
      transitionName: '',
    },
  },
];
