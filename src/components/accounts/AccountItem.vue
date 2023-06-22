<template>
  <div>
    <h3> {{ account.accountType }} Account</h3>
    <br>
    <ul>
      <!-- <button v-if="showButtons" @click="editAccount">
      <i class="fas fa-edit"></i> Edit Account
    </button> -->
      <li>
        <p><strong>IBAN:</strong> {{ account.iban }}</p>
        <!-- <p><strong>First Name:</strong> {{ account.user.firstName }}</p>
          <p><strong>Last Name:</strong> {{ account.user.lastName }}</p>
          <p><strong>Email:</strong> {{ account.user.email }}</p>
          <p><strong>Phone Number:</strong> {{ account.user.phoneNumber }}</p> -->
          <p><strong>Card UUID:</strong> {{ account.cardUUID }}</p>
          <p><strong>Balance:</strong> {{ account.balance }}</p>
          <p><strong>Daily Limit:</strong> {{ account.dailyLimit }}</p>
          <p><strong>Transaction Limit :</strong> {{ account.transactionLimit }}</p>
          <p><strong>Absolute Limit:</strong> {{ account.absoluteLimit }}</p>
        </li>
      </ul>
      <div class="tranactionButtons">
        <button @click="viewTransactions">See Transactions</button>
        <button @click="makeTransaction">Make a Transaction</button>
      </div>
      <br>
      <hr>
    </div>
    <br><br><br>
    <hr>
  </div>
</template>
  <script>
  export default {
    name: "AccountItem",
    props: {
      account: Object
    },
    methods: {
      viewTransactions() {
        this.$router.push({ name: 'Transactions', params: { iban: this.account.iban } });
      },
      makeTransaction() {
        this.$router.push({ name: 'Transfer', params: {
            iban: this.account.iban}});
      }
    }
  },
  methods: {
    viewTransactions() {
      this.$router.push({ name: 'Transactions', params: { iban: this.account.iban } });
    },
    makeTransaction() {
      this.$router.push({
        name: 'Transfer', params: {
          iban: this.account.iban,
          balance: this.account.balance
        }
      });
    },
    editAccount() {
      this.$router.push({ name: 'EditAccount', params: { iban: this.account.iban } });

    }
  }
};
</script>
  
<style scoped>
button {
  float: right;
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
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}</style>
  
  