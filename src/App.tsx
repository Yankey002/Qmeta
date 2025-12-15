import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import DailyRecord from "@/pages/DailyRecord";
import TodoList from "@/pages/TodoList";
import LongTermPlan from "@/pages/LongTermPlan";
import Reminder from "@/pages/Reminder";
import WebsiteManager from "@/pages/WebsiteManager";
import DataBackup from "@/pages/DataBackup";
import UserSettings from "@/pages/UserSettings";
import NotFound from "@/pages/NotFound";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { useTheme } from '@/hooks/useTheme';
import { ThemeContext } from '@/contexts/themeContext';
import Layout from "@/components/Layout";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { theme, toggleTheme, isDark } = useTheme();

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="daily-record" element={<DailyRecord />} />
                <Route path="todo-list" element={<TodoList />} />
                <Route path="long-term-plan" element={<LongTermPlan />} />
                <Route path="reminder" element={<Reminder />} />
                <Route path="website-manager" element={<WebsiteManager />} />
                <Route path="data-backup" element={<DataBackup />} />
                <Route path="settings" element={<UserSettings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}