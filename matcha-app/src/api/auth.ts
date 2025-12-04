import api from './api';

export async function register(user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  consentAccepted: boolean;
}) {
  const response = await api.post('/api/users', user);
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
}

export async function getUserById(id: string) {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
}

export async function deleteAccount() {
  const response = await api.delete('/api/profile/account');
  return response.data;
}

export async function requestPasswordReset(email: string) {
  const response = await api.post('/api/auth/request-reset', { email });
  return response.data;
}

export async function resetPassword(token: string, newPassword: string) {
  const response = await api.post('/api/auth/reset-password', {
    token,
    newPassword,
  });
  return response.data;
}
