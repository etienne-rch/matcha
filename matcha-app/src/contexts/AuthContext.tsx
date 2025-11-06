import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

import {
  deleteAccount as apiDeleteAccount,
  login as apiLogin,
  register as apiRegister,
  getUserById,
} from '@/api/auth';
import { User } from '@/types';
import { getToken, removeToken, storeToken } from '@/utils/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  deleteAccount: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface JWTPayload {
  id: string;
  email: string;
  exp: number;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUser = async () => {
    try {
      const token = await getToken();
      if (token) {
        const decoded = jwtDecode<JWTPayload>(token);

        // Vérifier si le token n'est pas expiré
        if (decoded.exp * 1000 < Date.now()) {
          await removeToken();
          setUser(null);
          return;
        }

        const currentUser = await getUserById(decoded.id);
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      await removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await apiLogin(email, password);
      await storeToken(token);
      setUser(user);
    } catch (error) {
      console.error('[AuthContext] Login error:', error);
      throw error;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const registrationData = {
        ...data,
        consentAccepted: true,
      };
      await apiRegister(registrationData);
      // await login(data.email, data.password);
    } catch (error) {
      console.error('[AuthContext] Register error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
  };

  const deleteAccount = async () => {
    try {
      await apiDeleteAccount();
      await removeToken();
      setUser(null);
    } catch (error) {
      console.error('[AuthContext] Delete account error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
