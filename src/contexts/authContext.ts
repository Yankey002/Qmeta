import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
  setUser: (user: { id: string; username: string; email: string } | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
  user: null,
  setUser: () => {},
});