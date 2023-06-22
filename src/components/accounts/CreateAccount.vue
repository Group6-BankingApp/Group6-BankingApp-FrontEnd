<template>
    <div>
    <br /><br />
    <h2>Create a Bank account</h2><br />
    <div class="form-container">
      <div class="account-info">
        <div class="col-md-12">
          <div class="mb-3">
            <div class="field">
              <label for="email">Pin :</label>
              <input type="email" v-model="account.pin" class="value" />
            </div>
          </div>
          <div class="mb-3">
            <div class="field">
              <label for="password">Daily Limit :</label>
              <input type="text" v-model="account.dailyLimit" class="value" />
            </div>
          </div>
          <div class="mb-3">
            <div class="field">
              <label for="phone">Balance :</label>
              <input type="text" v-model="account.balance" class="value" />
            </div>
          </div>
          <div class="mb-3">
            <div class="field">
              <label for="name">Absolute Limit :</label>
              <input type="text" v-model="account.absoluteLimit" class="value" />
            </div>
          </div>
          <div class="mb-3">
            <div class="field">
              <label for="name">Transaction Limit :</label>
              <input type="text" v-model="account.transactionLimit" class="value" />
            </div>
          </div>
          <br />
          <div class="mb-3" style="float: right;">
            <div class="field">
              <button
                :disabled="isButtonDisabled"
                @click="createAccount"
                class="registerbutton"
              >
                Create
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

    export default {
        components: {
            Footer
        },
        setup() {
            const userStoreSession = useUserStoreSession();
            return {
                userStoreSession
            };
        },
        data() {
            return {
                account: {
                    userId: '',
                    pin: '',
                    dailyLimit: '',
                    balance: '',
                    absoluteLimit: '',
                    transactionLimit: '',
                }
            }
        },
        computed: {
            isButtonDisabled() {
                return (
                    this.account.pin === "" ||
                    this.account.dailyLimit === "" ||
                    this.account.balance === "" ||
                    this.account.absoluteLimit === "" ||
                    this.account.transactionLimit === ""
                );
            }
        },
        methods: {
            createAccount() {
                this.account.userId = this.userStoreSession.userToEdit.id;
                axios
                    .post("/accounts", this.account)
                    .then((response) => {
                        console.log(response);
                        this.$router.push("/");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
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