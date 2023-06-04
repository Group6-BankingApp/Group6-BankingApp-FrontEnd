<template>
    <div>
      <br><br><h2>Transactions and balance</h2><br>
      <div class="form-container">
        <div class="card">
          <div class="card-content">
            <div class="field">
              <label for="remaining-balance">Remaining transfer balance for today:</label>
              <div class="value">{{ remainingBalance }}</div>
            </div>
          </div>
        </div>
        <hr>
        <div class="field">
          <label for="transfer-from">Transfer From:</label>
          <input type="text" v-model="transferFrom" class="value" />
        </div>
        <div class="field">
          <label for="transfer-to">Transfer To:</label>
          <input type="text" v-model="transferTo" class="value" />
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        remainingBalance: 2000,
        transferFrom: '',
        transferTo: '',
      };
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .field {
    display: flex;
    
    align-items: flex-start;
    margin-top: 20px;
    
  }
  
  label {
    font-weight: normal;
    margin-right: 10px;
  }
  
  .value {
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    width: 350px;
    padding: 8px;

  }
  h2{
    color: #0f642b;
    text-align: center;
    }
    .card {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 20px;
}
  </style>
  
  
  