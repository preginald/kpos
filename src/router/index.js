import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Menu.vue'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Products.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Test.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
