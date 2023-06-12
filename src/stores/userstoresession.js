import { defineStore } from "pinia";
import axios from "../axios-auth";

export const useUserStoreSession = defineStore("usersession", {
    state: () => ({
        jwt: '',
        username: '',
        userid:'',
    }),
    getters: {
        isAuthenticated: (state) => {state.jwt != ''},
    },
    actions: {
        localLogin () {
            this.jwt = localStorage.getItem('jwt');
            this.username = localStorage.getItem('username');
            this.userid = localStorage.getItem('userid');
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
                    this.username = response.data.username;
                    this.userid = response.data.userid;
                    localStorage.setItem('jwt', this.jwt);
                    localStorage.setItem('username', this.username);
                    localStorage.setItem('userid', this.userid);

                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject(error.response.data.errorMessage);
                });
            })},
    }
})