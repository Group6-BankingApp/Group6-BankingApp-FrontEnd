<template>
  <div class="card">
    <h2 class="page-title">Account Details</h2><br><br>
    <div class="account-list">
      <ol class="numbered-list"><br>
        <account-item v-for="account in accounts" :key="account.iban" :account="account" />
      </ol> 
    </div><br><br><br><br>
    <Footer />
  </div>
</template>

<script>
import AccountItem from './AccountItem.vue';
import axios from '../../axios-auth.js';
import Footer from '../../components/Footer.vue';

export default {
  name: "AccountPage",
  props: {},

  components: {
    AccountItem,
    Footer
  },

  data() {
    return {
      accounts: [],
    };
  },

  mounted() {
    const userid = localStorage.getItem('userid');
    if (userid) {
      this.getAccount(userid);
    }
  },

  methods: {
    getAccount(userid) {
      axios
        .get('/accounts/customer/' + userid)
        .then((response) => {
          this.accounts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #bfe9cc;
  border-radius: 4px;
  padding: 50px;
  margin: 0 auto;
  width: 900px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-size: 20px;
}

.page-title {
  color: #0f642b;
  text-align: center;
}

.account-list {
  display: flex;
  justify-content: center;
}

.numbered-list {
  padding: 0;
  width: 100%; 
}


</style>
