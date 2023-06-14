<template>
    <div>
      <h3> {{ account.accountType }} Account</h3>
      <br>
      <ul>
        <li>
          <p><strong>IBAN:</strong> {{ account.iban }}</p>
          <!-- <p><strong>First Name:</strong> {{ account.user.firstName }}</p>
          <p><strong>Last Name:</strong> {{ account.user.lastName }}</p>
          <p><strong>Email:</strong> {{ account.user.email }}</p>
          <p><strong>Phone Number:</strong> {{ account.user.phoneNumber }}</p> -->
          <p><strong>Card UUID:</strong> {{ account.cardUUID }}</p>
          <p><strong>Balance:</strong> {{ account.balance }}</p>
          <p><strong>Daily Limit:</strong> {{ account.dailyLimit }}</p>
          <p><strong>Balance:</strong> {{ account.balance }}</p>
          <p><strong>Absolute Limit:</strong> {{ account.absoluteLimit }}</p>
        </li>
      </ul>
      <button @click="$router.push('/transaction')">See Transactions</button>
      <br>
      <hr>
    </div>
  </template>
  
  <script>
  export default {
    name: "AccountItem",
    props: {
      account: Object
    }
  };
  </script>
  
  <style scoped>
  button {
    float: right;
  }
  h3 {
    color: #0f642b;
    text-align: center;
  }
  </style>
  
  