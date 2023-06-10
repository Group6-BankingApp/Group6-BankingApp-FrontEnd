<template>
    <div>
      <ul>
        <li>
          <p><strong>IBAN:</strong> {{ account.iban }}</p>
          <p><strong>First Name:</strong> {{ account.user.firstName }}</p>
          <p><strong>Last Name:</strong> {{ account.user.lastName }}</p>
          <p><strong>Email:</strong> {{ account.user.email }}</p>
          <p><strong>Phone Number:</strong> {{ account.user.phoneNumber }}</p>
          <p><strong>Account Type:</strong> {{ account.accountType }}</p>
          <p><strong>Card UUID:</strong> {{ account.cardUUID }}</p>
          <p><strong>Balance:</strong> {{ account.balance }}</p>
          <p><strong>Daily Limit:</strong> {{ account.dailyLimit }}</p>
          <hr>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "AccountItem",
    props: {
      account: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  
  