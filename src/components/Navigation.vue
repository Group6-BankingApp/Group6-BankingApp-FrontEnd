<template >
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        
          <li v-if="!store.isAuthenticated" class="nav-item">
            <router-link to="/" class="nav-link" active-class="active"
              >Home</router-link
            >
          </li>
          <li v-if="!store.isAuthenticated" class="nav-item">
            <router-link to="/register" class="nav-link" active-class="active"
              >Sign Up</router-link
            >
          </li>      
          <li v-if="store.isAuthenticated" class="nav-item">
            <router-link to="/myaccounts" class="nav-link" active-class="active"
              >Account</router-link
            >
          </li>
          <li v-if="store.isAdmin" class="nav-item">
            <router-link to="/userlist" class="nav-link" active-class="active"
              >Users Without Account</router-link
            >
          </li>
          <li v-if="store.isAdmin" class="nav-item">
            <router-link to="/userswithaccount" class="nav-link" active-class="active"
              >Users With Account</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/atmLogin" class="nav-link" active-class="active"
              >ATM</router-link
            >
          </li>
          <li v-if="store.isAuthenticated" class="nav-item">
            <router-link to="/edituser" class="nav-link" active-class="active"
              >Profile</router-link
            >
          </li>
          <li v-if="store.isAuthenticated" class="nav-item" @click="logout">
              <h7 class="nav-link" active-class="active">Logout</h7>
          </li>
       
      </div>
    </nav>
  </template>
  
  <script>
  import { useUserStoreSession } from '../stores/userstoresession';
  
  export default {
    name: "Navigation",
    setup() {
      return {
        store: useUserStoreSession()
      };
    },
    methods: {
      logout() {
        this.store.logout();
        this.$router.push("/");
      }
    }
  };
  </script>
  
  <style>
 .active {
        font-weight: bold;
    }

.container-fluid {
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 0;
}
.nav-item h7:hover {
  color: #fff;
  cursor: pointer;
}
.navbar-nav {
  width: 100%;
  justify-content: space-around;

}

  </style>