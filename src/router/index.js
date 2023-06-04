import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login.vue';
import Account from '../components/Account.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Login },
      { path: '/login', component: Login },
      { path: '/acount', component: Account },

    ]
  })
  
  export default router