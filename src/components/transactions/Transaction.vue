<template>
    <div>
      <div class="title-container">
      <div class="card filter-card">
        <h2>Transactions</h2> <br><br><br>
        <div class="card-body">
          <label for="dateFrom">From:</label>
          <input type="date" id="dateFrom" v-model="dateFrom" @change="fetchTransactions" />
  
          <label for="dateTo">To:</label>
          <input type="date" id="dateTo" v-model="dateTo" @change="fetchTransactions" />
        </div>
      </div>
  
      <div class="card" v-if="loading">
        <div class="card-body">
          Loading...
        </div>
      </div>
  
      <div class="card" v-if="!loading">
        <div class="card-body">
          <ul class="transactions"> <br>
            <li v-for="transaction in transactions" :key="transaction.id">
              {{ transaction.date }} - {{ transaction.description }} - {{ transaction.amount }}
            </li> <br>
          </ul>
        </div>
      </div>
  
      <Footer />
        </div>
    </div>
  </template>
  
  <script>
  import axios from '../../axios-auth.js';
  import Footer from '../../components/Footer.vue';
  
  export default {
    components: {
      Footer
    },
    data() {
      return {
        transactions: [],
        dateFrom: '',
        dateTo: '',
        loading: false
      };
    },
    mounted() {
      this.fetchTransactions();
    },
    methods: {
      fetchTransactions() {
        this.loading = true;
  
        axios
          .get('/transactions', {
            params: {
              dateFrom: this.dateFrom,
              dateTo: this.dateTo
            }
          })
          .then(response => {
            this.transactions = response.data;
            this.loading = false;
          })
          .catch(error => {
            console.error(error);
            this.loading = false;
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
  
  