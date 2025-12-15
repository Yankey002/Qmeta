import { createContext } from "react";

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false
});