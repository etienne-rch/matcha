import axios from 'axios';

import { API_URL } from '@/constants/config';
import { getToken } from '@/utils/storage';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    console.log('token', token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
