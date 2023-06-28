<template>
  <div v-if="accountDTO">
  <br /><br />
  <h3>{{ accountDTO.iban }}</h3>
  <br>
  <div class="form-container">
    <div class="account-info">
      <div class="col-md-12">
        <div class="mb-3">
          <div class="field">
            <label for="text">Pin :</label>
            <input type="number" v-model="accountDTO.pin" class="value" maxlength="4" minlength="4" inputmode="numeric" />
          </div>
        </div>
        <div class="mb-3">
          <div class="field">
            <label for="password">Daily Limit :</label>
            <input type="text" v-model="accountDTO.dailyLimit" class="value" />
          </div>
        </div>
        <div class="mb-3">
          <div class="field">
            <label for="name">Absolute Limit :</label>
            <input type="text" v-model="accountDTO.absoluteLimit" class="value" />
          </div>
        </div>
        <div class="mb-3">
          <div class="field">
            <label for="name">Transaction Limit :</label>
            <input type="text" v-model="accountDTO.transactionLimit" class="value" />
          </div>
        </div>
        <br />
        <div class="mb-3" style="float: right;">
          <div class="field">
            <button
              :disabled="isButtonDisabled"
              @click="updateAccount"
              class="registerbutton"
            >
              Update
            </button>
          </div>
        </div>
        <div v-if="isButtonDisabled" class="message">
              Please fill in all fields correctly.
            </div>
      </div>
    </div>
  </div>
  <Footer /> 
</div>
</template>
  
  <script>
  import Footer from "../Footer.vue";
  import { useUserStoreSession } from "../../stores/userstoresession";
  import axios from "../../axios-auth.js";
  import { toast } from "vue3-toastify";
  
  export default {
    name: 'EditAccount',
    components: {
      Footer
    },
    setup() {
      const userStoreSession = useUserStoreSession();
      return { userStoreSession };
    },
    data() {
      return {
        accountDTO: {
          iban: '',
          accountType: '',
          pin: '',
          dailyLimit: 0,
          balance: 0,
          absoluteLimit: 0,
          transactionLimit: 0,
          hasCard: false,
          cardNumber: '',
        },
      };
    },
    mounted() {
      this.getAccount();
    },
    methods: {
      getAccount(){
        this.accountDTO = this.userStoreSession.accountToEdit;
      },
      updateAccount() {
        axios
          .put("/accounts/update", this.accountDTO)
          .then((response) => {
            console.log(response.data);
            toast.success("Updated successfully");
            setTimeout(() => {
              this.$router.push("/myaccounts");
          }, 2500);
            
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data);
          });
      },
  },
}
</script>
  
<style>
  .form-container {
  display: flex;
  justify-content: center;
  
}

.account-info {
  width: 400px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  margin: 0 auto;
}

.field {
  margin-bottom: 10px;
  
}

label {
  flex-basis: 100px;
  font-weight: bold;
  margin-right: 10px;
  
}

.value {
  flex-grow: 1;
  background-color: #ffffff;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  width: 350px;
  
}
h2{
    color: #0f642b;
    text-align: center;
}
h3{
    color: #0f642b;
    text-align: center;
}
button {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

button.activated {
  background-color: #4caf50;
  color: white;
}

button.activated:hover {
  background-color: #437945;
}

button.deactivated {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
  
  