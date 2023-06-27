import { defineStore } from "pinia";
import axios from "../axios-auth";

export const useUserStoreSession = defineStore("usersession", {
    state: () => ({
        jwt: '',
        user: '',
        accounts: [],
        editedUser: '',
    }),
    getters: {
        isAuthenticated: (state) => {state.jwt != ''},
    },
    actions: {
        localLogin () {
            this.jwt = localStorage.getItem('jwt');
            this.user= JSON.parse(localStorage.getItem('user'));
            this.accounts = JSON.parse(localStorage.getItem('accounts'));
            this.editedUser = JSON.parse(localStorage.getItem('editedUser'));
            if (this.jwt != ''  && this.jwt != null) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
            }
        },
        login (username, password)  {
            return new Promise((resolve, reject) => {
            axios
                .post('users/login', {
                    username: username,
                    password: password
                })
                .then((response) => {
                    console.log (response);
                    this.jwt = response.data.token;
                    this.user= response.data.userDTO2;
                    localStorage.setItem('jwt', this.jwt);
                    localStorage.setItem('user',JSON.stringify(this.user));
                    localStorage.setItem('editedUser',JSON.stringify(this.editedUser));
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject(error.response.data.errorMessage);
                });
        })},
        logout () {
            this.jwt = '';
            this.user = '';
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            localStorage.removeItem('accounts');
            localStorage.removeItem('editedUser');
            delete axios.defaults.headers.common['Authorization'];
        },
    }
})