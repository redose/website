import axios from 'axios';
import { configure } from 'axios-hooks';

const redoseApi = axios.create({
  baseURL: 'http://localhost:8080/api',
});

configure({
  axios: redoseApi,
});

export default redoseApi;
