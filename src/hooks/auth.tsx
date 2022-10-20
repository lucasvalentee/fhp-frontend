import React, { useCallback, createContext, useState, useContext } from 'react';
import AuthContextData from '../models/AuthContextData';
import AuthState from '../models/AuthState';
import SessionService from '../services/SessionService';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@FHP:user');
    const token = localStorage.getItem('@FHP:token');
    const personCpf = localStorage.getItem('@FHP:personCpf');

    if (token && user) {
      const authState = {
        token,
        user: JSON.parse(user),
      };

      if (personCpf) {
        Object.assign(authState, { personCpf });
      }

      return authState;
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ username, password }): Promise<boolean> => {
      const authState = await SessionService.create({ username, password });

      if (!authState) {
        setData({} as AuthState);
        return false;
      }

      const { user, token, personCpf } = authState;

      localStorage.setItem('@FHP:user', JSON.stringify(user));
      localStorage.setItem('@FHP:token', token);

      if (personCpf) {
        localStorage.setItem('@FHP:personCpf', personCpf);
      }

      setData({ token, user, personCpf });
      return true;
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@FHP:user');
    localStorage.removeItem('@FHP:token');
    localStorage.removeItem('@FHP:personCpf');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        personCpf: data?.personCpf,
        signIn,
        signOut,
      }}
    >
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
