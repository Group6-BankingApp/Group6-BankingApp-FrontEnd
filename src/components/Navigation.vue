<template >
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active"
              >Home</router-link
            >
          </li>      
          <li class="nav-item">
            <router-link to="/account" class="nav-link" active-class="active"
              >Acount</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/transfer" class="nav-link" active-class="active"
              >Transfer</router-link
            >
          </li>
          <li v-if="store.isAuthenticated" class="nav-item">
            <router-link to="/logout" class="nav-link" active-class="active"
              >Logout</router-link
            >
          </li>
       
      </div>
    </nav>
  </template>
  
  <script>
  import { useUserStoreSession } from '../stores/userstoresession';

  export default {
    setup() {
    return {
      store: useUserStoreSession()
    };
  },
    name: "Navigation",
  };
  </script>
  
  <style>
 .active {
        font-weight: bold;
    }

.container-fluid {
  padding-left: 0;
  padding-right: 0;
}

.navbar-nav {
  width: 100%;
  justify-content: space-around;
}

  </style>