<template>
    <div>
      <ul>
        <li>
          <p><strong>First Name:</strong> {{ account.user.firstName }}</p>
          <p><strong>Last Name:</strong> {{ account.user.lastName }}</p>
          <p><strong>Card UUID:</strong> {{ account.cardUUID }}</p>
          <p><strong>Balance:</strong> {{ account.balance }}</p>
          <hr>
        </li>
      </ul>
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
  </style>