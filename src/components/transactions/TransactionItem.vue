<template>
    <div>
        <h3> {{ transaction.timeCreated }}  {{ transaction.senderIban }}  {{ transaction.receiverIban }}  {{ transaction.amount }}</h3>
        <br>
        <hr>
    </div>
  </template>
  
  <script>
  export default {
    name: "TransactionItem",
    props: {
      transaction: Object
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
  
  