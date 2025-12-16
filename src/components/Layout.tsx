import React, { useState, useContext, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ThemeContext } from '@/contexts/themeContext';
import { AuthContext } from '@/contexts/authContext';
import {
  BookOpen,
  ListChecks,
  CalendarRange,
  Bell,
  Globe,
  Database,
  Settings,
  Sun,
  Moon,
  Home,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout, user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const wide = window.innerWidth >= 1024;

      setIsMobile(mobile);
      setIsWideScreen(wide);

      // 在宽屏模式下自动展开侧边栏
      if (wide) {
        setIsSidebarOpen(true);
      } else if (!mobile && window.innerWidth >= 768) {
        // 在中等屏幕上保持当前状态
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'home', label: '首页', icon: <Home size={18} />, path: '/' },
    { id: 'daily-record', label: '日记记录', icon: <BookOpen size={18} />, path: '/daily-record' },
    { id: 'todo-list', label: '待办事项', icon: <ListChecks size={18} />, path: '/todo-list' },
    {
      id: 'long-term-plan',
      label: '长周期计划',
      icon: <CalendarRange size={18} />,
      path: '/long-term-plan',
    },
    { id: 'reminder', label: '提醒管理', icon: <Bell size={18} />, path: '/reminder' },
    {
      id: 'website-manager',
      label: '网址管理',
      icon: <Globe size={18} />,
      path: '/website-manager',
    },
    { id: 'data-backup', label: '数据备份', icon: <Database size={18} />, path: '/data-backup' },
    { id: 'settings', label: '系统设置', icon: <Settings size={18} />, path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* 侧边栏切换按钮 - 在移动设备上或非宽屏模式下侧边栏关闭时显示 */}
      {(isMobile || (!isSidebarOpen && !isWideScreen)) && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-700 dark:text-gray-200 transition-all duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      <aside
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-40 w-64 transform' : 'w-64 flex-shrink-0'} 
          ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : isWideScreen ? 'translate-x-0' : isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isMobile ? 'shadow-xl' : ''} 
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold">Q</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">元启</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Qmeta</p>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
                              hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300
                              group"
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                  >
                    <span className="mr-3 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {user?.username?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {user?.username || '用户名'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main
        className={`flex-1 transition-all duration-300 ${isSidebarOpen && isMobile ? 'blur-sm' : ''}`}
      >
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
