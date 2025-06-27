import axios from 'axios';

import { getFirebaseToken } from '@/auth/firebase';
import { API_URL } from '@/constants/config';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
