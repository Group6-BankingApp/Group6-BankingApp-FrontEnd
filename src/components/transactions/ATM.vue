<template>
    <div v-if="account" class="atm-card">
        <h2 class="atm-title">Welcome {{ account.username }}</h2><br><br>
        <div class="atm-info">
            <div class="atm-label">IBAN:</div>
            <div class="atm-value">{{ account.iban }}</div>
        </div>
        <div class="atm-info">
            <div class="atm-label">Card Number:</div>
            <div class="atm-value">{{ account.cardNumber }}</div>
        </div>
        <div class="atm-info">
            <div class="atm-label">Balance:</div>
            <div class="atm-value">{{ account.balance }}</div>
        </div>
        <div class="atm-info">
            <label for="pin" class="atm-label">Amount:</label>
            <input type="text" id="pin" class="atm-input" v-model="AtmTransactionDTO.amount" />
        </div><br>
        <div class="atm-buttons">
            <button @click="deposit" class="atm-button" style="float: left;">Deposit</button>
            <button @click="withdraw" class="atm-button" style="float: right;">Withdraw</button>
        </div>
        <Footer />
  </div>
</template>

<script>
    import Footer from '../../components/Footer.vue';
    import { useUserStoreSession } from '../../stores/userstoresession';
    import axios from '../../axios-auth.js';
    import { toast } from "vue3-toastify";
    import "vue3-toastify/dist/index.css";

    export default{
        name: 'ATM',
        setup() {
            const userStoreSession = useUserStoreSession();
            return { userStoreSession };
        },
        components: {
            Footer
        },
        data() {
            return {
                AtmTransactionDTO: {
                    iban: '',
                    amount: '',
                },
                account: null,
            };
        },
        mounted() {
            this.account = this.userStoreSession.atmAccount;
            this.AtmTransactionDTO.iban = this.account.iban;
            console.log(this.account);
        },
        methods: {
            deposit() {
                axios
                    .post('/transactions/deposit', this.AtmTransactionDTO)
                    .then(response => {
                        console.log(response);
                        this.account = response.data;
                        this.userStoreSession.atmAccount = response.data;
                        localStorage.setItem('atmAccount', JSON.stringify(response.data));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            withdraw() {
                axios
                    .post('/transactions/withdraw', this.AtmTransactionDTO)
                    .then(response => {
                        console.log(response);
                        this.account = response.data;
                        this.userStoreSession.atmAccount = response.data;
                        localStorage.setItem('atmAccount', JSON.stringify(response.data));
                    })
                    .catch(error => {
                        console.log(error);
                        toast.error(error.response.data.detail);
                    });
            }
        }
    }
</script>

<style scoped>
.atm-card {
  background-color: #bfe9cc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 0 auto;
  height: 750px;
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
  background-color: #0f642b;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.atm-button:hover {
  background-color: #1a862c;
}
</style>