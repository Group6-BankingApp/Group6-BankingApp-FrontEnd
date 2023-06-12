import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login.vue';

import AccountPage from '../components/accounts/AccountPage.vue';


import Register from '../components/Register.vue';
import RegisterConfirmation from '../components/RegisterConfirmation.vue';
import Transfer from '../components/transactions/Transfer.vue';
import UserList from '../components/users/UserList.vue';
import AccountList from '../components/accounts/AccountList.vue';
import ATM from '../components/transactions/ATM.vue';
import Transaction from '../components/transactions/Transaction.vue';
import DebitCardList from '../components/debitcard/DebitCardList.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Login },
      { path: '/login', component: Login },
      { path: '/account', component: AccountPage },
      { path: '/register', component: Register }, 
      { path: '/registerConfirmation', component: RegisterConfirmation },
      { path: '/transfer', component: Transfer },
      { path: '/userlist', component: UserList },
      { path: '/accounts', component: AccountList },
      { path: '/atm', component: ATM },
      { path: '/transactions', component: Transaction },  
      { path: '/debitcards', component: DebitCardList },

    ]
  })
  
  export default router