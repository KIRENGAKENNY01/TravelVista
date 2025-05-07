import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './auth-context';

const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {}
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');

    if (name && role) {
      setUser({ name:name, role: role as 'TOURIST' | 'COMPANY', email: email || '', id: '' });
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
