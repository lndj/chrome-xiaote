import PageIndex from './pages/Index';
import PageRecommends from './pages/Recommend';
import UserHome from './pages/Home';
import Comments from './pages/Comments';
import Settings from './pages/Settings';
import About from './pages/About';

export default [
  {
    path: '/',
    component: PageIndex,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/recommends',
    component: PageRecommends,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/home',
    component: UserHome,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/comments',
    component: Comments,
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/settings',
    component: Settings,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/about',
    component: About,
    meta: {
      keepAlive: true,
    },
  },
];
