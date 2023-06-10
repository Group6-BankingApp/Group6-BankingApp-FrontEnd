<template>
    <div class="atm-card">
      <h2 class="atm-title">Deposit/Withdraw</h2><br><br>
      <div class="atm-info">
        <label for="iban" class="atm-label">IBAN:</label>
        <input type="text" id="iban" class="atm-input" v-model="iban" />      
      </div><br>
      <div>
        <b class="atm-balance">Current Balance: {{ balance }}</b>
      </div><br><br>     
      <div class="atm-actions">
        <label for="amount" class="atm-label">Amount:</label>
        <input type="number" id="amount" class="atm-input" v-model="amount" />
    </div> <br><br>
        <div class="atm-buttons">
          <button @click="deposit" class="atm-button" style="float: left;">Deposit</button>
          <button @click="withdraw" class="atm-button" style="float: right;">Withdraw</button>
      </div>       
    </div>
  
  </template>
  
  <script>
  import axios from '../../axios-auth.js';
  
  export default {
    data() {
      return {
        iban: '',
        balance: null,
        amount: 0
      };
    },
    mounted() {
      this.fetchBalance();
    },
    methods: {
      fetchBalance() {
        const params = {
          iban: this.iban,
          pin: '123' // might need to make the pin dynamic
        };
  
        axios.get('/balance', { params })
          .then(response => {
            this.balance = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      withdraw() {
        const data = {
          iban: this.iban,
          amount: this.amount
        };
  
        axios.post('/withdraw', data)
          .then(response => {
            this.balance -= response.data.amount;
            this.amount = 0;
          })
          .catch(error => {
            console.error(error);
          });
      },
      deposit() {
        const data = {
          iban: this.iban,
          amount: this.amount
        };
  
        axios.post('deposit', data)
          .then(response => {
            this.balance += response.data.amount;
            this.amount = 0;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  
  
  <style scoped>
  .atm-card {
    background-color: #bfe9cc;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    max-width: 800px;
    margin: 0 auto;
    height: 500px;
    text-align: center;
    margin-top: 90px;
  }
  
  .atm-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .atm-info {
    margin-bottom: 20px;
  }
  
  .atm-label {
    font-weight: bold;
  }
  
  .atm-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .atm-balance {
    margin-top: 10px;
  }
  
  .atm-actions {  
    align-items: center;
    margin-bottom: 20px;
  }
  
  .atm-buttons {
    margin-left: 10px;
  }
  
  .atm-button {
    padding: 8px 16px;
    background-color:#0f642b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .atm-button:hover {
    background-color:  #1a862c;
  }
  </style>
  