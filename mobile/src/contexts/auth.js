import { createContext, useEffect, useState } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      try {
        const token = await AsyncStorage.getItem('@finToken');

        if (!token) {
          setLoading(false);
          return;
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await api.get('/me');

        setUser(response.data);

      } catch (err) {
        console.log('Erro ao carregar usuário:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadStorage();
  }, []);

  async function signUp(email, password, nome) {
    setLoadingAuth(true);

    try {
      await api.post('/users', {
        name: nome,
        email,
        password,
      });

    } catch (err) {
      if (status === 409) {
        alert('E-mail já cadastrado!');
      }
      console.log('Erro ao cadastrar:', err.response);
    } finally {
      setLoadingAuth(false);
    }
  }

 async function signIn(email, password) {
  const response = await api.post('/login', {
    email,
    password,
  });

  const { token } = response.data;

  await AsyncStorage.setItem('@finToken', token);

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const me = await api.get('/me');

  setUser(me.data);
}

  async function logOut() {
    await AsyncStorage.removeItem('@finToken');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        logOut,
        loading,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
