import React, { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Login: React.FC = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('请输入用户名和密码');
      return;
    }

    // 模拟登录请求
    setIsLoading(true);

    setTimeout(() => {
      setIsAuthenticated(true);
      setUser({
        id: 'user-1',
        username: username,
        email: `${username}@example.com`,
      });
      toast.success('登录成功');
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  // 动画变量
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 系统标题 */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">元启</h1>
            <p className="text-gray-500 dark:text-gray-400">个人日常记录系统</p>
          </div>
        </div>

        {/* 主题切换按钮 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* 登录表单 */}
        <motion.form
          onSubmit={handleLogin}
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              用户名
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              密码
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  登录中...
                </div>
              ) : (
                '登录'
              )}
            </button>
          </motion.div>
        </motion.form>

        {/* 底部信息 */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">演示账号：demo / 密码：demo</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            © {new Date().getFullYear()} 元启(Qmeta)个人日常记录系统
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
