import axios from 'axios';

const redoseApi = axios.create({
  baseURL: '/api',
});

export default redoseApi;
