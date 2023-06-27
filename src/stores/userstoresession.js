import { defineStore } from "pinia";
import axios from "../axios-auth";
import jwtDecode from "jwt-decode";

export const useUserStoreSession = defineStore("usersession", {
    state: () => ({
        jwt: '',
        user: '',
        accounts: [],
        userToEdit: '',
        atmAccount: '',
        role: '',
    }),
    getters: {
        isAuthenticated: (state) => state.jwt != '' && state.jwt !== null,
        isAdmin: (state) => state.role == 'ROLE_ADMIN',
    },
    actions: {
        localLogin () {
            this.jwt = localStorage.getItem('jwt');
            this.user= JSON.parse(localStorage.getItem('user'));
            this.accounts = JSON.parse(localStorage.getItem('accounts'));
            this.userToEdit = JSON.parse(localStorage.getItem('userToEdit'));
            this.atmAccount = JSON.parse(localStorage.getItem('atmAccount'));
            this.role = localStorage.getItem('role');
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
                    const decoded= jwtDecode(this.jwt);
                    this.role = decoded.auth;
                    console.log(this.role);
                    this.user= response.data.userDTO2;
                    localStorage.setItem('jwt', this.jwt);
                    localStorage.setItem('user',JSON.stringify(this.user));
                    localStorage.setItem('role', this.role);
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
            this.accounts = [];
            this.userToEdit = '';
            this.atmAccount = '';
            this.role = '';
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            localStorage.removeItem('accounts');

            localStorage.removeItem('userToEdit');
            localStorage.removeItem('atmAccount');
            localStorage.removeItem('role');
            delete axios.defaults.headers.common['Authorization'];
        },
    }
})