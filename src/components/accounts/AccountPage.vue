<template>
    <br><br><h2>Account Details</h2><br>
    <div class="account-list">
      <ul>
        <account-item  v-for="account in accounts" :key="account.iban" :account="account"  />
      </ul>
    </div><br><br>
  </template>

<script >
import AccountItem from './AccountItem.vue';

import axios from '../../axios-auth.js';
export default {
    name: "AccountPage",
    props: {},
=======

    components: {
        AccountItem
    },
    data() {
    return {

        accounts: [],
    };
  },
    mounted() {
        const userid= localStorage.getItem('userid');
        if (userid) {
            this.getAccount(userid);
        }
    },
    methods: {
        getAccount(userid) {
            axios
                .get('/accounts/customer/'+userid)
                .then((response) => {
                    this.accounts = response.data;

       
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>
  
  <style scoped>
  .form-container {
  display: flex;
  justify-content: center; 
}
  .account-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin: 0 auto;
  }
  
  .field {
    margin-bottom: 10px;
    text-align: center;
  }
  
  label {
    font-weight: bold;
    
  }
  
  .value {
    background-color: #ffffff;
    padding: 8px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    width: 300px;
    
  }
  h2{
    color: #0f642b;
    text-align: center;
    }
  </style>