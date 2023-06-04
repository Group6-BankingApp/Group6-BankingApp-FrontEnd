<template>
    <div>
      <br><br><h2>Register an account</h2><br>
      <div class="form-container">
        <div class="account-info">
            <div class="col-md-12">
                <div class="mb-3">
          <div class="field">
            <label for="name">Name:</label>
            <input type="text" v-model="name" class="value" />
          </div>
        </div>
          <div class="mb-3">
          <div class="field">
            <label for="lastname">Lastname:</label>
            <input type="text" v-model="lastname" class="value" />
          </div>
        </div>
          <div class="mb-3">
          <div class="field">
            <label for="email">Email:</label>
            <input type="email" v-model="email" class="value" />
          </div>
        </div><br>
        <div class="mb-3" style="float: right;">
            <div class="field">
              <button @click="register" class="registerbutton">Register</button>
            </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        lastname: '',
        email: '',
      };
    },
    methods: {
    apply() {
      
    },
  },
  };
  </script>
  
  <style scoped>
.form-container {
  display: flex;
  justify-content: center;
  
}

.account-info {
  width: 400px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  margin: 0 auto;
}

.field {
  margin-bottom: 10px;
  
}

label {
  flex-basis: 100px;
  font-weight: bold;
  margin-right: 10px;
  
}

.value {
  flex-grow: 1;
  background-color: #ffffff;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  width: 350px;
  
}
.registerbutton {
  background-color: #0f642b; 
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
h2{
    color: #0f642b;
    text-align: center;
    }
</style>
  