import axios from 'axios';

const redoseApi = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export default redoseApi;
