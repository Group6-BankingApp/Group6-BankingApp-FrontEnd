<template>
    <div>
      <AccountItem :account="account" :showButtons="false" />
      
    </div>
  </template>
  
  <script>
  import AccountItem from './AccountItem.vue';
  
  export default {
    name: 'EditAccount',
    props: {},
    components: {
      AccountItem
    },
    data() {
      return {
        account: {
            iban: '',
            balance: '',
            user: {
                firstName: '',
                lastName: ''
            }
        }
      };
    },
    methods: {}
  };
  </script>
  
  <style></style>
  
  