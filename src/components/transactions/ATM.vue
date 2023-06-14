<template>
  <div class="atm-card">
    <h2 class="atm-title">Deposit/Withdraw</h2><br><br>
    <div class="atm-info">
      <label for="bank-iban" class="atm-label">Bank IBAN:</label>
      <input type="text" id="bank-iban" class="atm-input" :value="bankIban" disabled />
    </div><br>
    <div class="atm-info">
      <label for="customer-iban" class="atm-label">Customer IBAN:</label>
      <input type="text" id="customer-iban" class="atm-input" v-model="customerIban" />
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
      <button @click="promptWithdrawal" class="atm-button" style="float: right;">Withdraw</button>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from '../../axios-auth.js';
import Footer from '../../components/Footer.vue';
import { useUserStoreSession } from '../../stores/userstoresession';

export default {
  components: {
    Footer
  },
  data() {
    return {
      bankIban: 'NL01INHO0000000001', // The fixed IBAN for the bank
      customerIban: '', // The variable IBAN for the customer
      balance: null,
      amount: 0
    };
  },
  mounted() {
    this.fetchBalance();
  },
  methods: {
    fetchBalance() {
      const userStore = useUserStoreSession();

      const params = {
        iban: this.bankIban, // Use the bank's IBAN for fetching balance
        pin: '123', // might need to make the pin dynamic
        token: userStore.jwt 
      };

      axios
        .get('/accounts/balance', { params })
        .then(response => {
          this.balance = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    promptWithdrawal() {
  const confirmWithdrawal = confirm('Are you sure you want to withdraw?');
  if (confirmWithdrawal) {
    const isPinRequired = true; 
    if (isPinRequired) {
      const enteredPin = prompt('Enter your PIN:');
      if (enteredPin) {
        this.withdraw(enteredPin);
      } else {
        alert('Please enter your PIN first.'); 
      }
    } else {
      this.withdraw(null);
    }
  } else {
    alert('Withdrawal canceled.'); 
  }
},
    withdraw(pin) {
      const data = {
        iban: this.customerIban, 
        amount: this.amount,
        pin: pin 
      };

        axios
    .post('/transactions/withdraw', data)
    .then(response => {
      this.balance -= response.data.amount;
      this.amount = 0;
      alert('Withdrawal successful.'); 
    })
    .catch(error => {
      console.error(error);
    });
    },
    deposit() {
      const data = {
        iban: this.customerIban,
        amount: this.amount
      };

      axios
        .post('/transactions/deposit', data)
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
  