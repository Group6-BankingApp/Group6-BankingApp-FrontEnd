import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login.vue';
import Account from '../components/Account.vue';
import Register from '../components/Register.vue';
import RegisterConfirmation from '../components/RegisterConfirmation.vue';
import Transfer from '../components/Transfer.vue';
import UserList from '../components/users/UserList.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Login },
      { path: '/login', component: Login },
      { path: '/account', component: Account },
      { path: '/register', component: Register }, 
      { path: '/registerConfirmation', component: RegisterConfirmation },
      { path: '/transfer', component: Transfer },
      { path: '/userlist', component: UserList },

    ]
  })
  
  export default router