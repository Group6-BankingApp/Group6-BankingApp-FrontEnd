<template>
  <div>
    <br /><br />
    <h2>Transactions and balance</h2><br />
    <div class="form-container">
      <div class="card">
        <div class="card-content">
          <div class="row">
            <div class="col">
              <label for="pin">PIN:</label>
            </div>
            <div class="col">
              <input type="password" v-model="transactionDTO.pin" class="value" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="remaining-balance">Balance:</label>
            </div>
            <div class="col">
              <div class="value">{{ balance }}</div>
            </div>
          </div>
        </div>

        <hr />
        <div class="row">
          <div class="col">
            <label for="amount">Amount:</label>
          </div>
          <div class="col">
            <input type="number" v-model="transactionDTO.amount" class="value" />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="transfer-to">Transfer To:</label>
          </div>
          <div class="col">
            <input type="text" v-model="transactionDTO.receiverIban" class="value" />
          </div>
        </div>


        <br><br>
        <div class="transfer-card button">
          <button @click="performTransfer">Transfer</button>
        </div>
      </div>
    </div>
    <Footer />
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
      transactionDTO: {
        amount: 0,
        receiverIban: '',
        senderIban: this.$route.params.iban,
        timeCreated: '',
        userDTO2: JSON.parse(localStorage.getItem('user')),
        pin: '',
      },
    };
  },
  mounted() {
    
  },
  methods: {
    performTransfer() {
      this.transactionDTO.timeCreated = new Date().toISOString();
      axios
        .post('/transactions', this.transactionDTO)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: 'Transactions', params: { iban: this.transactionDTO.senderIban } });
        })
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.field {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 40px;

}

label {
  font-weight: normal;
  margin-right: 10px;
}

.value {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  width: 350px;
  padding: 8px;
  height: 40px;
}

h2 {
  color: #0f642b;
  text-align: center;
}

.card {
  background-color: #bfe9cc;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.transfer-card {
  display: flex;
  justify-content: center;
}

.transfer-card button {
  padding: 8px 16px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #0f642b;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.transfer-card button:hover {
  background-color: #1a862c;
}

.row {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.col {
  flex: 1;
}
</style>

  
  