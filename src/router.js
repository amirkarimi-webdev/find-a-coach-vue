import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
// import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
// import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      component: () => import('./pages/coaches/CoachesList.vue'),
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, //coaches/c1/contact
      ],
    },
    {
      path: '/register',
      component: () => import('./pages/coaches/CoachRegistration.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: () => import('./pages/requests/RequestsReceived.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: () => import('./pages/auth/UserAuth.vue'),
      meta: { requiresUnauth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./pages/NotFound.vue'),
    },
  ],
});

router.beforeEach(function (to, _, next) {
  const isAuthenticated = Boolean(store.getters.isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
