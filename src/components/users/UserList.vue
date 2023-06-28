<template>
  <div class="table-container">
    <h2>Users Without a Bank Account</h2>
    <br>
    <table class="user-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Current Account</th>
          <th>Savings Account</th>
        </tr>
      </thead>
      <tbody>
        <user-item v-for="user in users" :key="user.id" :user="user" :checked="user.checked" @user-selected="selectUser" />
      </tbody>
    </table>
    <Footer />
  </div>
  <div class="userswithaccount">
    <button class="userbuttons" v-if="selectedUser" @click="createBankAccount">Create Bank Account</button>
  <button class="userbuttons" v-if="selectedUser" @click="deleteUser">Delete User</button>
  </div>
</template>

<script>
import axios from "../../axios-auth.js"
import UserItem from './UserItem.vue';
import Footer from '../../components/Footer.vue';
import { useUserStoreSession } from '../../stores/userstoresession';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    name: "UserList",
    props: {},
    setup() {
        const userStoreSession = useUserStoreSession();
        return { userStoreSession };
    },
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
        this.userStoreSession.userToEdit = this.selectedUser;
        localStorage.setItem('userToEdit', JSON.stringify(this.selectedUser));
        this.$router.push('/createbankaccount');
      },
      deleteUser() {
        if(this.selecedtUser===this.userStoreSession.user){
          toast.error("You cannot delete yourself!");
        }
        else{
          axios
              .delete('users/' + this.selectedUser.id)
              .then((response) => {
                  this.getUser();
                  toast.success("User deleted!");
              })
              .catch((error) => {
                  console.log(error);
                  toast.error(error.response.data.message);
              });
        }
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
.userbuttons{
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
.userbuttons:hover{
  background-color: #0f642b;
  color: #fff;
  box-shadow: 0 4px 8px rgba(247, 240, 240, 0.6);
}
.userswithaccount{
  margin: 0 auto; 
  padding: 50px 20px; 
  min-width: 200px; 
  margin-top: 30px; 
  text-align: center; 
}
</style>
