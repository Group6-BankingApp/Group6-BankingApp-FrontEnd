<template>
  <div class="atm-card">
    <h2 class="atm-title">Deposit/Withdraw 🏧</h2><br><br>
    <div class="atm-info">
      <label for="iban" class="atm-label">Card UUID:</label>
      <input type="text" id="iban" class="atm-input" v-model="AtmDTO.cardUUID" />
    </div><br>
    <div class="atm-info">
      <label for="pin" class="atm-label">PIN:</label>
      <input type="password" id="pin" class="atm-input" v-model="AtmDTO.pin" />
    </div><br>
    <div class="atm-buttons">
      <!-- <button @click="deposit" class="atm-button" style="float: left;">Deposit</button>
      <button @click="promptWithdrawal" class="atm-button" style="float: right;">Withdraw</button> -->
      <button @click="atmLogin" class="atm-button" style="float: center;">Confirm your Input</button>
    </div>
    <Footer />
  </div><br><br><br><br>
</template>

<script>
import axios from '../../axios-auth.js';
import Footer from '../../components/Footer.vue';
import { useUserStoreSession } from '../../stores/userstoresession';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  components: {
    Footer
  },
  setup() {
    const userStoreSession = useUserStoreSession();
    return { userStoreSession };
  }, 
  data() {
    return {
      AtmDTO: {
        cardUUID: '',
        pin: ''
      }
    };
  },
  methods: {
    atmLogin(){
      axios
        .post('/debitcards/cardInsert', this.AtmDTO)
        .then(response => {
          console.log(response);
          this.userStoreSession.atmAccount = response.data;
          localStorage.setItem('atmAccount', JSON.stringify(response.data));
          this.$router.push('/atm');
        })
        .catch(error => {
          console.log(error);
          toast.error("Wrong Card UUID or PIN");
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
  height: 450px;
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
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-weight: normal;
  padding: 15px 30px; 
}

.atm-button:hover {
  background-color: #1a862c;
}
</style>

  