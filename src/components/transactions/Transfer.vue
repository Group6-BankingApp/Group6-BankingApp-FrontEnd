<template>
  <div>
    <br /><br />
    <h2>Transactions and balance</h2><br><br>
    <div class="row">
      <div class="col-md-6">
        <h3>Transfer money 💸</h3><br>
        <div class="form-container">
      <div class="card">
        <div class="card-content">
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
      </div>
      <!-- izmegu koloni -->
      <div class="col-md-6">
        <h3>Search Iban by name 🔎 </h3><br>
        <div class="form-container">
      <div class="card">
        <div class="card-content">
          <div class="row">
            <div class="col">
              <label for="remaining-balance">First Name:</label>
            </div>
            <div class="col">
              <input type="text" v-model="FullNameDTO.firstName" class="value" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="remaining-balance">Last Name:</label>
            </div>
            <div class="col">
              <input type="text" v-model="FullNameDTO.lastName" class="value" />
            </div>
          </div>
        </div>
        <hr />  
        <div class="row">
          <div class="col">
            <label for="transfer-to">IBAN:</label>
          </div>
          <div class="col">
            <label for="foundiban" class="value">{{ searchedIban }}</label>
          </div>
        </div>


        <br><br>
        <div class="transfer-card button">
          <button @click="searchForUser">Search</button>
        </div>
      </div>
    </div>
      </div>

      <!-- ova e od row zdola -->
    </div>
 
    <Footer />
  </div>
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
      transactionDTO: {
        amount: 0,
        receiverIban: '',
        senderIban: this.$route.params.iban,
        timeCreated: '',
        userDTO2: null,
      },
      balance: 0,
      searchedIban: '',
      FullNameDTO: {
        firstName: '',
        lastName: '',
      },
    };
  },
  mounted() {
    const accounts = this.userStoreSession.accounts;
    const account = accounts.find((account) => account.iban === this.$route.params.iban);
    this.balance = account.balance;
  },
  methods: {
    performTransfer() {
      this.transactionDTO.timeCreated = new Date().toISOString();
      if(this.userStoreSession.user){
        this.transactionDTO.userDTO2 = this.userStoreSession.user;
      }else{
        this.transactionDTO.userDTO2 = this.userStoreSession.userToEdit;
      }
      axios
        .post('/transactions', this.transactionDTO)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: 'Transactions', params: { iban: this.transactionDTO.senderIban } });
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error(error.response.data);
        });
    },
    searchForUser() {
      console.log(this.FullNameDTO);
      axios
        .post('accounts/customerIban',this.FullNameDTO)
        .then((response) => {
          console.log(response);
          this.searchedIban = response.data;
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error(error.response.data.detail);
        });
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

h2,h3 {
  color: #0f642b;
  text-align: center;
}

.card {
  background-color: #bfe9cc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 0.5px groove #c4e4cf;
  width: 600px;
}

.transfer-card {
  display: flex;
  justify-content: center;
}

.transfer-card button {
  padding: 15px 45px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #0f642b;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  cursor: pointer;
  font-weight: normal;
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
.col-md-6 {
  flex: 1;
  margin-left: 10px; 
}
.col:first-child {
  flex: 0.5; 
}
</style>

  
  