import React, { useCallback, createContext, useState, useContext } from 'react';
import api from '../services/Api';

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: IUserAuth;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface IUserAuth {
  username: string;
}

interface AuthState {
  token: string;
  user: IUserAuth;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@FHP:token');
    const user = localStorage.getItem('@FHP:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('sessions', { username, password });

    console.log({ response });

    const { token, user } = response.data;

    localStorage.setItem('@FHP:token', token);
    localStorage.setItem('@FHP:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@FHP:token');
    localStorage.removeItem('@FHP:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
