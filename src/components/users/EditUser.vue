<template>
    <div class = "card">
        <h2>Personal details</h2>
        <form @submit="saveUser">
            <div class="form-field">
                <label for="firstName">First Name:</label>
                <input type="text" class="userinput" id="firstName" v-model="editedUser.firstName" />
            </div>
            <div class="form-field">
                <label for="lastName">Last Name:</label>
                <input type="text" class="userinput" id="lastName" v-model="editedUser.lastName" />
            </div>
            <div class="form-field">
                <label for="email">Email:</label>
                <input type="email" class="userinput" id="email" v-model="editedUser.email" />
            </div>
            <div class="form-field">
                <label for="phoneNumber">Phone Number:</label>
                <input class="userinput" type="tel" id="phoneNumber" v-model="editedUser.phoneNumber" />
            </div><br><br>
            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
            <button type="submit" class = "savebutton">Save</button>
        </form>
    </div>
</template>

<script>
import axios from '../../axios-auth.js';

export default {
    name: 'EditUser',
    data() {
        return {
            editedUser: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            },
            successMessage: '',
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.editedUser = { ...user };
        }
    },
    methods: {
        saveUser(event) {
            event.preventDefault();
            const userId = this.editedUser.id;
            axios
                .put(`/users/${userId}`, this.editedUser)
                .then((response) => {
                    this.editedUser = { ...response.data };
                    this.successMessage = 'User updated successfully';
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped>
.form-field {
    margin-bottom: 10px;
}

.success-message {
    color: green;
    margin-top: 10px;
    font-style: italic;
}
.card {
  background-color: #bfe9cc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 0 auto;
  height: 550px;
  text-align: center;
  margin-top: 90px;
}
.savebutton{
    padding: 8px 16px;
  background-color: #0f642b;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.savebutton:hover {
  background-color: #1a862c;
}
.userinput{
    width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

</style>
