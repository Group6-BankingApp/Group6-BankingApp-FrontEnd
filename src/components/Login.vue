<template>
  <section>
    <h1>RBank</h1>
    <h4>Welcome to RBank!</h4>
    <div class="container">
     
      <div class="row">
        <div class="col-md-6">
          <img :src="image" alt="Image" class="img-fluid" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form">
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import debitCardImage from '@/assets/img/debitcard.jpg';

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
      image : debitCardImage
    };
  },
  methods: {
    login() {
      this.store
        .login(this.username, this.password)
        .then(() => this.$router.push("/myaccounts"))
        .catch((message) => (toast.error(message)));
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 60px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
}

button {
  background-color: #0f642b;
  color: black;
  padding: 20px 30px;
  margin: 20px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
}

button:hover {
  opacity: 1.5;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 101vh;
}

form {
  border: 3px solid #f1f1f1;
  padding: 60px;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}

.col-md-6 {
  width: 100%;
  padding-left: 100px;
  padding-right: 100px;
}

.img-fluid {
  max-width: 100%;
  height: 530px;
  padding-right: 120px;
  border-radius: 4px;

}

.form {
  background-color: #ffffff;
  border-radius: 40px;
  padding: 20px;
  margin-bottom: 25px;
}
h1 {
  color: #0f642b;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 0px;
  margin: 0px;
}
h4 {
  color: #0f642b;
  text-align: center;
  padding-top: 30px;

  margin: 0px;
}
</style>
