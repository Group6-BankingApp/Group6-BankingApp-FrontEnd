<template>
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
    </tbody>
  </table>
</template>

<script>
import axios from "../../axios-auth.js"
import UserItem from './UserItem.vue';

export default {
    name: "UserList",
    props: {},
    data() {
        return {
            users: [],
        };
    },
    components: {
        UserItem,
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser() {
            axios
                .get('users')
                .then((response) => {
                    this.users = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
}
</script>

<style scoped>
    .user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.user-table tbody tr:hover {
  background-color: #f5f5f5;
}
</style>