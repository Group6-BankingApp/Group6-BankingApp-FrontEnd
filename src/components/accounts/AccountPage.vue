<template>
  <div class="card">
    <div v-if="accounts.length > 0">
      <h2 class="page-title">{{ user.firstName+" "+ user.lastName }}</h2><br><br>
      <div class="account-list">
        <ol class="numbered-list"><br>
          <account-item v-for="account in accounts" :key="account.iban" :account="account" />
        </ol> 
      </div><br><br><br><br>
    </div>
    <div v-else>
      <h2 class="page-title">No accounts found</h2>
    </div>
    <Footer />
  </div>
</template>

<script>
import AccountItem from './AccountItem.vue';
import axios from '../../axios-auth.js';
import Footer from '../../components/Footer.vue';
import { useUserStoreSession } from '../../stores/userstoresession';

export default {
  name: "AccountPage",
  props: {},

  components: {
    AccountItem,
    Footer
  },
  setup() {
    const userStoreSession = useUserStoreSession();
    return { userStoreSession };
  },
  data() {
    return {
      accounts: [],
      user:'',
    };
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.user = user;
      this.getAccount(user.id);
    }
  },

  methods: {
    getAccount(userid) {
      axios
        .get('/accounts/customer/' + userid)
        .then((response) => {
          console.log(response.data);
          this.accounts = response.data;
          this.userStoreSession.accounts = response.data;
          localStorage.setItem('accounts', JSON.stringify(response.data));
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
