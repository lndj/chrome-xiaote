import PageIndex from './pages/Index';
import Comments from './pages/Comments';

export default [
  {
    path: '/',
    component: PageIndex,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/comments',
    component: Comments,
    meta: {
      keepAlive: false
    }
  }
];
