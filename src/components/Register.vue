<template>
    <div>
      <br><br><h2>Register an account</h2><br>
      <div class="form-container">
        <div class="account-info">
            <div class="col-md-12">
                <div class="mb-3">
          <div class="field">
            <label for="name">Name:</label>
            <input type="text" v-model="user.firstName" class="value" />
          </div>
        </div>
          <div class="mb-3">
          <div class="field">
            <label for="lastname">Lastname:</label>
            <input type="text" v-model="user.lastName" class="value" />
          </div>
        </div>
          <div class="mb-3">
          <div class="field">
            <label for="email">Email:</label>
            <input type="email" v-model="user.email" class="value" />
          </div>
        </div>
        <div class="mb-3">
          <div class="field">
            <label for="password">Password:</label>
            <input type="password" v-model="user.password" class="value" />
          </div>
        </div>
        <div class="mb-3">
          <div class="field">
            <label for="phone">PhoneNumber:</label>
            <input type="text" v-model="user.phoneNumber" class="value" />
          </div>
        </div><br>
        <div class="mb-3" style="float: right;">
            <div class="field">
              <button :class="{'disabled': isButtonDisabled, 'enabled': !isButtonDisabled}"
              :disabled="isButtonDisabled" @click="register">Register</button>
            </div>
            </div>
            <div v-if="isButtonDisabled" class="message">
                Please fill in all fields correctly.
              </div>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from '../axios-auth.js';

  export default {
    data() {
      return {
        user:{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phoneNumber: '',
        },
      };
    },
    computed: {
      isButtonDisabled() {
        return (
        this.user.firstName === '' || 
        this.user.lastName === '' || 
        this.user.email === '' || 
        !this.isValidateEmail(this.user.email) ||
        this.user.password.length < 8 || 
        this.user.phoneNumber === ''
        );
      },
    },
    methods: {
      register() {
        axios.post('/users', this.user)
          .then((response) => {
            console.log(response);
            this.$router.push('/login');
          })
          .catch((error) => {
            console.log(error);
          });
      },
      isValidateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
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
h2{
    color: #0f642b;
    text-align: center;
}
button {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

button.activated {
  background-color: #4caf50;
  color: white;
}

button.activated:hover {
  background-color: #437945;
}

button.deactivated {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
  