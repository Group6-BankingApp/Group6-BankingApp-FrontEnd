<template>
    <div class = "card">
        <h2>Personal details</h2>
            <div class="form-field">
                <label for="firstName">First Name:</label>
                <input type="text" class="userinput" id="firstName" v-model="editedUser.firstName" />
            </div>
            <div class="form-field">
                <label for="email">Email:</label>
                <input type="email" class="userinput" id="email" v-model="editedUser.email" />
            </div>
            <div class="form-field">
                <label for="phoneNumber">Phone Number:</label>
                <input class="userinput" type="tel" id="phoneNumber" v-model="editedUser.phoneNumber" />
            </div>
            <div>
                <label for="password">New Password:</label>
                <input type="password" class="userinput" id="password" v-model="editedUser.password" />
            </div>
            <br><br>
            <button type="submit" class ="savebutton" @click="saveChanges">Save Changes</button>
        <Footer />
    </div>
</template>

<script>
import axios from '../../axios-auth.js';
import { useUserStoreSession } from '../../stores/userstoresession';
import Footer from '../Footer.vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    name: 'EditUser',
    setup() {
        const userStore = useUserStoreSession();
        return { userStore };
    },
    data() {
        return {
            editedUser: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phoneNumber: '',
            },
            id: '',
        };
    },
    mounted() {
        const user = this.userStore.user;
        if (user) {
            this.editedUser = user;
            this.id = user.id;
        }
    },
    methods: {
        saveChanges() {
            axios
            .put('/users/'+this.id,this.editedUser)
            .then((response) => {
                this.userStore.user = response.data;
                localStorage.setItem('user', JSON.stringify(response.data));
                this.$router.push('/myaccounts');
            })
            .catch((error) => {
                this.$toast.error(error.response.data.message);
            });
        }

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