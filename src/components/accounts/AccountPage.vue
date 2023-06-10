<template>
    <br><br><h2>Account Details</h2><br>
    <div class="account-list">
      <ul>
        <account-item :account="account"  />
      </ul>
    </div><br><br>
  </template>

<script >
import AccountItem from './AccountItem.vue';
export default {

    components: {
        AccountItem
    },
    data() {
    return {
        account: null,
    };
  },
    mounted() {
        const iban= localStorage.getItem('iban');
        if (iban) {
            this.getAccount(iban);
        }
    },
    methods: {
        getAccount(iban) {
            axios
                .get('/accounts/'+iban)
                .then((response) => {
                    this.account = response.data;
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