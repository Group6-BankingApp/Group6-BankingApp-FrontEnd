<template>
    <div class="card">
        <div class="row">
            <div class="col-md-6">
                <div class="image-container">
                    <img src="../../assets/img/personalinfo.jpg" alt="Image" class="img-fluid" />
                </div>
            </div>
            <div class="col-md-6">
                <h2>Personal details</h2><br>
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
                    </div>
                    <br><br>
                    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
                    <button type="submit" class="savebutton">Save</button>
                </form>
                <br><br><br>
            </div>
        </div>

        <Footer />
    </div> <br><br><br>
</template>

<script>
import axios from '../../axios-auth.js';
import Footer from '../../components/Footer.vue';
import { toast } from "vue3-toastify";

export default {
    name: 'EditUser',
    components: {
        Footer
    },
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
        saveUser() {
      const userId = this.editedUser.id;
      axios
        .put(`/users/${userId}`, this.editedUser)
        .then((response) => {
          this.editedUser.firstName = response.data.firstName;
          this.editedUser.lastName = response.data.lastName;
          this.editedUser.email = response.data.email;
          this.editedUser.phoneNumber = response.data.phoneNumber;

          toast.success("User updated successfully");
          this.successMessage = 'User updated successfully';

          // Update the user object and localStorage
          const user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            Object.assign(user, this.editedUser);
            localStorage.setItem('user', JSON.stringify(user));
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error updating user");
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
    border-radius: 10px;
    border: 0.5px groove #c4e4cf;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    max-width: 1400px;
    margin: 0 auto;
    height: 700px;
    text-align: center;
    margin-top: 90px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.row {
    display: flex;
}

.col-md-6 {
    flex: 1;
    margin-right: 80px;
}

.col-md-6:last-child {
    margin-right: 0;
}

.image-container {
    text-align: center;
}

img {
    max-width: 100%;
    height: 500px;
    border-radius: 20px;
}

.savebutton {
    padding: 20px 70px;
    font-size: 20px;
    background-color: #0f642b;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.savebutton:hover {
    background-color: #1a862c;
}

.userinput {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>