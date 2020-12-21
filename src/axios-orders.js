import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerapp-fd190-default-rtdb.firebaseio.com/'
});

export default instance;