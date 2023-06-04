<template>
    <br><br><h2>Account Details</h2><br>
    <div class="form-container">
      
      <div class="account-info">
        <div class="field">
          <label for="name">Name:</label>
          <div class="value">{{ name }}</div>
        </div>
        <div class="field">
          <label for="lastname">Lastname:</label>
          <div class="value">{{ lastname }}</div>
        </div>
        <div class="field">
          <label for="balaemailnce">Email:</label>
          <div class="value">{{ email }}</div>
        </div>
        <div class="field">
          <label for="iban">IBAN:</label>
          <div class="value">{{ iban }}</div>
        </div>
        <div class="field">
          <label for="balance">Balance:</label>
          <div class="value">{{ balance }}</div>
        </div>
        <div class="field">
          <label for="card-number">Card Number:</label>
          <div class="value">{{ cardNumber }}</div>
        </div>
        <div class="field">
          <label for="status">Status:</label>
          <div class="value">{{ status }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .form-container {
  display: flex;
  justify-content: center; 
}
  .account-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin: 0 auto;
  }
  
  .field {
    margin-bottom: 10px;
    text-align: center;
  }
  
  label {
    font-weight: bold;
    
  }
  
  .value {
    background-color: #ffffff;
    padding: 8px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    width: 300px;
    
  }
  h2{
    color: #0f642b;
    text-align: center;
    }
  </style>
  
  <script >
  export default {
    data() {
      return {
        name: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        iban: 'NL01INHO9501054837',
        balance: 2000,
        cardNumber: '1234 5678 9012 3456',
        status: 'Active'
      };
    }
  };
  </script>
  
