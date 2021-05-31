import axios from 'axios';

const api = axios.create({baseURL: "https://api-crud-backend.herokuapp.com/sistema"});

export default api;