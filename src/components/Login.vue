<template>
    <section>
    <div class="container">
      <div class="row">
    
        <div class="col-md-6">
            <p>Bank Application</p>
          <form>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">Email</label>
              <input id="email" v-model="username" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input id="password" v-model="password" type="password" class="form-control" />
            </div>
            <div class="mb-3">
              <button type="button" class="btn btn-primary" @click="login">Login</button>
            </div>
            <div class="register-link">
                Don't have an account? <router-link to="/register">Register an Account</router-link>
            </div>
          </form>
        </div>
      </div>
      <Footer />  
    </div>
    </section>
</template>

<script>
import axios from '../axios-auth';
import Footer from '../components/Footer.vue';
import { useUserStoreSession } from '../stores/userstoresession';

export default {
  components: {
    Footer 
  },
  setup() {
    return {
      store: useUserStoreSession()
    };
  },
  name: "Login",
    data() {
        return {
            username: "",
            password: "",
            errorMessage: ""
        };
    },
    methods: {
    login() {
      this.store.login(this.username, this.password)
      .then(()=>
      this.$router.push("/" )
      )
      .catch((error) => this.errorMessage = error)
    },
  }
};
</script>


<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 50px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #0f642b;
  color: black;
  padding: 20px 30px;
  margin: 20px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 1.5;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}

form {
  border: 3px solid #f1f1f1;
  padding: 20px;
  
}

p {
  text-align: right !important;
 padding-right: 80px;
 padding-bottom: 20px;
  font-size: 30px;
}
b{
    letter-spacing: 2px;
    font-size: 20px;
}
.col-md-6 {
  width: 100%; 
}
</style>