<template>
    
      <h2>Account List</h2><br><br>
      <div class="account-list">
      <ul>
        <account-item v-for="account in accounts" :key="account.iban" :account="account" />
      </ul>
    </div><br><br>
  </template>
  
  <script>
  import axios from "../../axios-auth.js";
  import AccountItem from './AccountItem.vue';
  
  export default {
    name: "AccountList",
    data() {
      return {
        accounts: []
      };
    },
    components: {
      AccountItem
    },
    mounted() {
      this.getAccounts();
    },
    methods: {
      getAccounts() {
        axios
          .get('accounts')
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
  .account-list {
    width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #cbe4d9;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .account-list h2 {
    margin-top: 0;
  }
  
  .account-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .account-list li {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #e0d6d6;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .account-list li p {
    margin: 5px 0;
  }
  
  .account-list hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 10px 0;
  }
  h2{
    color: #0f642b;
    text-align: center;
}
  </style>
  
  
  