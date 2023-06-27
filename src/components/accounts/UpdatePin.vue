<template>
  <div class="update-pin-container">
    <div class="update-pin-card">
      <h3>Update PIN for Iban: <pre><i>{{ iban }}</i></pre></h3>
      <form @submit.prevent="submitPin">
        <div class="form-field">
          <label>Old PIN:</label>
          <div class="password-input">
            <input :type="showOldPin ? 'text' : 'password'" v-model="oldPin" required pattern="\d+" maxlength="4" minlength="4" />
            <button type="button" @click="toggleOldPinVisibility">
              <i :class="showOldPin ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </button>
          </div>
        </div>
        <div class="form-field">
          <label>New PIN:</label>
          <div class="password-input">
            <input :type="showNewPin ? 'text' : 'password'" v-model="newPin" required pattern="\d+" maxlength="4" minlength="4"/>
            <button type="button" @click="toggleNewPinVisibility">
              <i :class="showNewPin ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </button>
          </div>
        </div>
        <button class="update-button" type="submit">Update PIN</button>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from '../../axios-auth.js';
import { toast } from "vue3-toastify";
import Footer from '../../components/Footer.vue';

export default {
  name: 'UpdatePin',
  components: {
    Footer
  },
  data() {
    return {
      iban: '',
      oldPin: '',
      newPin: '',
      showOldPin: false,
      showNewPin: false,
    };
  },
  mounted() {
    this.iban = this.$route.params.iban;
  },
  methods: {
    submitPin() {
      axios.put(`/accounts/${this.iban}/pin`, { pin: this.newPin })
        .then(response => {
          this.newPin = response.data;
          toast.success("PIN updated successfully");
          setTimeout(() => {
            this.$router.push('/account');
          }, 2500);
        })
        .catch(error => {
          console.error(error);
          toast.error(error.response.data);
        });
    },
    toggleOldPinVisibility() {
      this.showOldPin = !this.showOldPin;
    },
    toggleNewPinVisibility() {
      this.showNewPin = !this.showNewPin;
    },
  },
};
</script>

<style scoped>
.update-pin-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.update-pin-card {
  background-color: #bfe9cc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  height: 500px;
  width: 80%;
  text-align: center;
  margin-top: 50px;
}

h3 {
  color: #0f642b;
  text-align: center;
}

.form-field {
  margin-bottom: 20px;
  margin-top: 50px;
}

label {
  display: block;
}

input[type="password"] {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.update-button {
  padding: 8px 16px;
  background-color: #0f642b;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(131, 221, 176, 0.5);
  margin-top: 20px;
  float: right;
}

.update-button:hover {
  background-color: #1a862c;
}
.password-input {
  position: relative;
}

.password-input input {
  padding-right: 150px; 
}

.password-input button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
 
  cursor: pointer;
}
.password-input button i {
  color: #050505;
}
</style>
