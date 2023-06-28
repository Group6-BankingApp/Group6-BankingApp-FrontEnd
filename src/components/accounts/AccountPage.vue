<template>
  <div class="card">
    <div v-if="accounts.length > 0">
      <h2 class="page-title">Name: <b>{{ user.firstName+" "+user.lastName }}</b></h2><br><br>
      <div class="account-list">
        <ol class="numbered-list"><br>
          <account-item v-for="account in sortedAccounts" :key="account.iban" :account="account" />
        </ol> 
      </div>
    </div> 
    <div v-else>
      <h2 class="page-title">No accounts found</h2>
    </div>
    <Footer />
    <div class="datetime">{{ currentDateTime }}</div> 
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
    Footer,
    
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
  computed: {
    sortedAccounts() {
      // Sort the accounts based on the accountType
      return this.accounts.sort((a, b) => {
        if (a.accountType === "Current" && b.accountType !== "Current") {
          return -1; // "Current" appears first
        } else if (a.accountType !== "Current" && b.accountType === "Current") {
          return 1; // "Current" appears second
        } else {
          return 0; // No preference, maintain the original order
        }
      });
    },
  },
  mounted() {
    const user = this.userStoreSession.userToEdit;
    if (user) {
      this.user = user;
      this.getAccount(user.id);
    }
    setInterval(() => {
      this.currentDateTime = new Date().toLocaleString();
    }, 1000);
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
    },
  }
};
</script>

<style scoped>
.card {
  background-color: #bfe9cc;
  border-radius: 4px;
  padding: 50px;
  margin: 0 auto;
  width: 1400px;
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
.datetime {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #070707;
}

</style>
