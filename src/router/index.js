import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login.vue';
import Account from '../components/Account.vue';
import Register from '../components/Register.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Login },
      { path: '/login', component: Login },
      { path: '/account', component: Account },
      { path: '/register', component: Register },,

    ]
  })
  
  export default router