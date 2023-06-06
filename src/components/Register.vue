<template>
    <div>
      <br><br><h2>Register an account</h2><br>
      <div class="form-container">
        <div class="account-info">
          <div class="col-md-12">
            <div class="mb-3">
              <div class="field">
                <label for="name">Name:</label>
                <input type="text" v-model="registerUser.name" class="value" />
                <div class="error-message" v-if="validationErrors.name">{{ validationErrors.name }}</div>
              </div>
            </div>
            <div class="mb-3">
              <div class="field">
                <label for="lastname">Lastname:</label>
                <input type="text" v-model="registerUser.lastname" class="value" />
                <div class="error-message" v-if="validationErrors.lastname">{{ validationErrors.lastname }}</div>
              </div>
            </div>
            <div class="mb-3">
              <div class="field">
                <label for="email">Email:</label>
                <input type="email" v-model="registerUser.email" class="value" />
                <div class="error-message" v-if="validationErrors.email">{{ validationErrors.email }}</div>
              </div>
            </div>
            <br>
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
  import axios from 'axios';

  export default {
    data() {
      return {
        registerUser:{
        name: '',
        lastname: '',
        email: '',
    },
    validationErrors: {
      name: '',
      lastname: '',
      email: '',
    },
      };
    },
    methods: {
    register(){
   

     this.validationErrors = {
      name: '',
      lastname: '',
      email: '',
    };

    // Perform validation
    if (this.registerUser.name.trim() === '') {
      this.validationErrors.name = 'Name is required.';
    }

    if (this.registerUser.lastname.trim() === '') {
      this.validationErrors.lastname = 'Lastname is required.';
    }

    if (this.registerUser.email.trim() === '') {
      this.validationErrors.email = 'Email is required.';
    }

    // Check if any validation errors exist
    if (Object.values(this.validationErrors).some(error => error !== '')) {
      return; // Stop form submission if errors exist
    }

    // axios.post("http://localhost/register", this.registerUser)
    //   .then(result => { console.log(result.data);
    //     this.$router.push('/registerConfirmation'); 
    //   })
    //   .catch(error => console.log(error))

      //>> mockup successful registration response, uncomment the code above after eindpoint is done in backend and delete this line
      this.$router.push('/registerConfirmation');
    // mockup <<<
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
  