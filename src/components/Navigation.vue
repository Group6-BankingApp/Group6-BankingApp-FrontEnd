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
              >Account</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/atm" class="nav-link" active-class="active"
              >ATM</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/transfer" class="nav-link" active-class="active"
              >Transfer</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/logout" class="nav-link" active-class="active"
              >Logout</router-link
            >
          </li>
       
      </div>
    </nav>
  </template>
  
  <script>
  export default {
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