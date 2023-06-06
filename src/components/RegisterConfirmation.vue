<template>
    <div>
      <br><br><h3>Register Confirmation</h3><br><br><br><br><br>
      <div class="form-container">
        <div class="account-info">
          <div class="col-md-12">
            <h3>{{ message }}</h3> <br><br><br><br><br><br>
            <div class="button-container">
              <div class="field">
                <button @click="goToHome" class="registerbutton">Home</button>
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
        message: 'Succesfully registered!',
      };
    },
    methods: {
      goToHome() {
        // Redirect to the home page
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
 h3 {
  color: #0f642b;
  text-align: center;
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
  margin: 4px 2px;
}

.button-container {
  display: flex;
  justify-content: center;
}
  </style>
  