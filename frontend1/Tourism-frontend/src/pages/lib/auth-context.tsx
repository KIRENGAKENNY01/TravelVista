
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define user roles
export type UserRole = 'TOURIST' | 'COMPANY';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'TOURIST' | 'COMPANY';
}

// Define context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Create mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Tourist',
    email: 'tourist@example.com',
    role: 'tourist',
  },
  {
    id: '2',
    name: 'Adventure Company',
    email: 'company@example.com',
    role: 'company',
  },
];

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(
        u => u.email === email && u.role === role
      );
      
      if (foundUser) {
        setUser(foundUser);
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new mock user
      const newUser: User = {
        id: String(Date.now()),
        name,
        email,
        role,
      };
      
      // Add to mock users (in a real app, this would be a backend API call)
      mockUsers.push(newUser);
      
      // Set the user and store in localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for stored user on initial load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
