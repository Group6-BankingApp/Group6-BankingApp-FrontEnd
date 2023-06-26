<template >
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active"
              >Home</router-link
            >
          </li>      
          <li class="nav-item">
            <router-link to="/myaccounts" class="nav-link" active-class="active"
              >Account</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/atmLogin" class="nav-link" active-class="active"
              >ATM</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/transfer" class="nav-link" active-class="active"
              >Transfer</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/transactions" class="nav-link" active-class="active"
              >Transaction</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/debitcards" class="nav-link" active-class="active"
              >Debit cards</router-link
            >
          </li>
          <li class="nav-item" @click="logout">
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