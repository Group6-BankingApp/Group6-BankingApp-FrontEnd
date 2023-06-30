<template>
  <div>
    <h3> {{ account.accountType }} Account</h3>
    <br>
    <div>
      <ul>
        <li>
          <p><strong>IBAN:</strong> {{ account.iban }}</p>
          <p><strong>Balance:</strong> {{ account.balance }}</p>
          <p v-if="shouldShowDebitCardButton"><strong>Daily Limit:</strong> {{ account.dailyLimit }}</p>
          <p v-if="shouldShowDebitCardButton"><strong>Transaction Limit :</strong> {{ account.transactionLimit }}</p>
          <p v-if="shouldShowDebitCardButton"><strong>Absolute Limit:</strong> {{ account.absoluteLimit }}</p>
          <p v-if="shouldShowDebitCardButton"><strong>Has Debit Card:</strong> {{ account.hasCard }}</p>
          <p v-if="shouldShowDebitCardButton"><strong>Debit Card:</strong> {{ account.cardNumber }}</p>
          <p v-if="shouldShowDebitCardButton"><strong>Debit Card Public Number:</strong> {{ account.cardPublicNumber }}</p>
        </li>
      </ul>
      <br>
      <div>
        <div class="tranactionButtons">
          <button @click="viewTransactions">See Transactions</button>
          <button @click="makeTransaction">Make a Transaction</button>
          <button v-if="userStoreSession.isAdmin" @click="deleteAccount">Delete Account</button>
        </div>
        <br>
        <div v-if="shouldShowDebitCardButton && userStoreSession.isAdmin"  class="tranactionButtons">
          <button @click="updateAccount">Update Account</button>
          <button @click="debitCardButton"> {{ debitCardButtonText }} </button>
        </div>
      </div>
      <br>
      <hr>
    </div>
  </div>
</template>
<script>
  import axios from '../../axios-auth.js';
  import { useUserStoreSession } from '../../stores/userstoresession';
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";

  export default {
    name: "AccountItem",
    props: {
      account: Object,
      redirectPath: {
        type: String,
        default: '/myaccounts'
      }
    },
    setup() {
      const userStoreSession = useUserStoreSession();
      return { userStoreSession };
    },
    computed: {
      shouldShowDebitCardButton() {
        return this.account.accountType === 'Current';
      },
      debitCardButtonText() {
        return this.account.hasCard =='Yes' ? 'Deactivate DebitCard' : 'Create DebitCard';
      },
      debitCardButton() {
        if (this.debitCardButtonText === "Create DebitCard") {
        return this.createDebitCard;
        } 
        else if (this.debitCardButtonText === "Deactivate DebitCard") {
          return this.deactivateCreditCard;
        } 
        else {
          return null;
        }
      }
    },
    methods: {
      viewTransactions() {
        this.$router.push({ name: 'Transactions', params: { iban: this.account.iban } });
      },
      makeTransaction() {
        this.$router.push({ name: 'Transfer', params: {
            iban: this.account.iban}});
      },
      updateAccount() {
        this.userStoreSession.accountToEdit = this.account;
        localStorage.setItem('accountToEdit', JSON.stringify(this.account));
        this.$router.push({ name: 'EditAccount'});
      },
      createDebitCard() {
        axios
        .post('accounts/'+ this.account.iban +'/debitcard')
        .then((response) => {
          this.$router.push(this.redirectPath);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
      },
      deactivateCreditCard() {
        console.log(this.redirectPath);
        console.log('IBAN:', this.account.iban);
        console.log('Card Number:', this.account.cardNumber);
        axios
        .put('accounts/'+this.account.iban+'/deactivateDebitCard/'+this.account.cardNumber,{
    
        })
        .then((response) => {
          this.$router.push(this.redirectPath);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
      },
      deleteAccount() {
        axios
        .delete('accounts/'+ this.account.iban+'/delete')
        .then((response) => {
          this.$router.push(this.redirectPath);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
      }
    }
};
</script>
  
<style scoped>
button {
  float: center;
}

h3 {
  color: #0f642b;
  text-align: center;
}

.tranactionButtons {
  text-align: center;
}

.tranactionButtons button {
  margin: 0 20px;
  padding: 10px 15px;
  background-color: #0f642b;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-weight: normal;
}
</style>
  
  