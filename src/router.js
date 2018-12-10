import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        order: 0
      }
    },
    {
      path: '/note/create/',
      name: 'create-note',
      component: () => import(/* webpackChunkName: "about" */ './views/CreateNote.vue'),
      meta: {
        order: 1
      }
    },
    {
      path: '/note/edit/:id/',
      name: 'edit-note',
      component: () => import(/* webpackChunkName: "about" */ './views/CreateNote.vue'),
      meta: {
        order: 2
      }
    },
    {
      path: '/note/details/:id/',
      name: 'note-details',
      component: () => import(/* webpackChunkName: "about" */ './views/Note.vue'),
      meta: {
        order: 2
      }
    },
    {
      path: '/labels/storage/',
      name: 'labels-storage',
      component: () => import(/* webpackChunkName: "about" */ './views/Labels.vue'),
      meta: {
        order: 3
      }
    },
    {
      path: '/categories/storage/',
      name: 'categories-storage',
      component: () => import(/* webpackChunkName: "about" */ './views/Categories.vue'),
      meta: {
        order: 4
      }
    },
  ],
});
