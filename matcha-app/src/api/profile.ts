import api from './api';

export async function changePassword(data: {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) {
  const response = await api.post('/api/profile/change-password', data);
  return response.data;
}

export async function getProfile() {
  const response = await api.get('/api/profile');
  return response.data;
}

export async function updateProfile(data: any) {
  const response = await api.patch('/api/profile', data);
  return response.data;
}

export async function deleteAccount() {
  const response = await api.delete('/api/profile/account');
  return response.data;
}
