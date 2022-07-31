import axios from 'axios';
import config from '../../constants/config';

const apiClient = axios.create({
  baseURL: config.host
});

export default apiClient;
