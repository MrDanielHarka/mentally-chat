import { createContext, useContext, useState } from 'react';
import { User } from './user';
import { AuthData } from './authData';

export const users: User[] = [
  {
    id: 'patient@mentally.at',
    email: 'patient@mentally.at',
    password: 'password',
    avatar: 'https://cdn.midjourney.com/049cee20-c4f3-44c5-ac61-f5f35671a95f/0_0.png',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: 'therapist@mentally.at',
    email: 'therapist@mentally.at',
    password: 'password',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    firstName: 'John',
    lastName: 'Doe',
  },
]

interface AuthContextInterface {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: AuthData) => Promise<void>;
  logout: () => void;
  reauthenticate: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextInterface;
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  const reauthenticate = async () => {
    if (user != null) {
      return true;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      return true;
    }

    return false;
  };

  const login = async (data: AuthData): Promise<void> => {
    const authenticatedUser = users.find((user) => user.email === data.email && user.password === data.password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: user != null,
    login,
    logout,
    reauthenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
