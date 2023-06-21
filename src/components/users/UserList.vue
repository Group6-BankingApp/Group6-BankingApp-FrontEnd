<template>
  <div class="table-container">
    <table class="user-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        <user-item v-for="user in users" :key="user.id" :user="user" />
        <user-item v-for="user in users" :key="user.id" :user="user" :checked="user.checked" @user-selected="selectUser" />
      </tbody>
    </table>
    <Footer />
  </div>
  <button v-if="selectedUser" @click="createBankAccount">Create Bank Account</button>
</template>

<script>
import axios from "../../axios-auth.js"
import UserItem from './UserItem.vue';
import Footer from '../../components/Footer.vue';
import { useUserStoreSession } from '../../stores/userstoresession';

export default {
    name: "UserList",
    props: {},
    data() {
        return {
            users: [],
            selectedUser: null,
        };
    },
    components: {
        UserItem,
        Footer
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser() {
            axios
                .get('users/withoutAccount')
                .then((response) => {
                    this.users = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        selectUser(user) {
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === user.id) {
              this.users[i].checked = !this.users[i].checked;
            } else {
              this.users[i].checked = false;
            }
          }
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].checked) {
              this.selectedUser = this.users[i];
              return;
            }
            this.selectedUser = null;
          }
        },
        createBankAccount() {
          this.$router.push({ name: 'CreateBankAccount', params: { user: this.selectedUser } });
        },
  },
}
</script>


<style scoped>
.table-container {
  padding: 20px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  padding-left: 10px;
}

.user-table th,
.user-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  margin-left: 10px;
}

.user-table th {
  background-color: #f2f2f2;
  font-weight: normal;
}

.user-table tbody tr:hover {
  background-color: #f5f5f5;
}

.user-table th,
.user-table td {
  background-color: #0f642b;
  color: #fff;
}

.user-table th:first-child,
.user-table td:first-child {
  border-top-left-radius: 10px;
}

.user-table th:last-child,
.user-table td:last-child {
  border-top-right-radius: 10px;
}

.user-table tbody tr:last-child td {
  border-bottom: none;
}
</style>
