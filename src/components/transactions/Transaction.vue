<template>
    <div>
      <div class="title-container">
      <div class="card filter-card">
        <h2>Transactions</h2> <br><br><br>
        <div class="card-body">
          <div class="account-list">
            <ol class="numbered-list">
              <transaction-item v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
            </ol>
          </div>
      </div>

      <Footer />
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from '../../axios-auth.js';
  import Footer from '../../components/Footer.vue';
  import TransactionItem from './TransactionItem.vue';
  
  export default {
    components: {
      TransactionItem,
      Footer
    },
    data() {
      return {
        transactions: [],
      };
    },
    mounted() {
      this.fetchTransactions();
    },
    methods: {
      fetchTransactions() {  
        axios
          .get('/transactions/customer/' + this.$route.params.iban)
          .then(response => {
            this.transactions = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .title-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .filter-card {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .card {
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #bfe9cc;
    margin-bottom: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .card-body {
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  
  .transactions {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  h2 {
    color: #0f642b;
    text-align: center;
  }
  </style>
  
  