import PageIndex from './pages/Index';
import PageRecommends from './pages/Recommend';
import UserHome from './pages/Home';
import Comments from './pages/Comments';

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
];
