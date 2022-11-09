import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000';

const DEFAULT_CONFIG = {
  baseURL: `${BASE_API_URL}`,
  timeout: 5000,
};

const axiosInstance = axios.create(DEFAULT_CONFIG);

export default axiosInstance;
