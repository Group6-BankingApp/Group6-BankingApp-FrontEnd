import axios from 'axios';

const instance = axios.create({
baseURL: 'https://rbank.onrender.com'
});
export default instance;