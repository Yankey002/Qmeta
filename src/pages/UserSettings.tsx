import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  CalendarDays, 
  Moon, 
  Sun, 
  Lock, 
  MessageSquare,
  HelpCircle,
  LogOut,
  Save,
  X,
  ChevronRight
} from 'lucide-react';
import { ThemeContext } from '@/contexts/themeContext';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

const UserSettings: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout, user } = useContext(AuthContext);
  
  // 用户信息状态
  const [username, setUsername] = useState(user?.username || '用户名');
  const [email, setEmail] = useState(user?.email || 'user@example.com');
  const [bio, setBio] = useState('个人简介');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // 通知设置状态
  const [notifications, setNotifications] = useState({
    app: true,
    system: true,
    email: false,
    reminderSound: true,
    dailySummary: true,
  });
  
  // 日期格式设置
  const [dateFormat, setDateFormat] = useState('yyyy-MM-dd');
  
  // 保存用户信息
  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast.success('个人资料已更新！');
  };
  
  // 取消编辑
  const handleCancelEdit = () => {
    setUsername(user?.username || '用户名');
    setEmail(user?.email || 'user@example.com');
    setBio('个人简介');
    setIsEditingProfile(false);
  };
  
  // 处理退出登录
  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      logout();
    }
  };

  return (
    <div className="p-6">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">系统设置</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧导航 */}
        <motion.div 
          className="lg:col-span-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                <User size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 dark:text-white">{username}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
              </div>
            </div>
          </div>
          
          <nav className="p-2">
            <button className="w-full flex items-center px-4 py-2.5 text-left rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">
              <User size={18} className="mr-3" />
              <span>个人资料</span>
            </button>
            
            <button className="w-full flex items-center px-4 py-2.5 text-left rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Bell size={18} className="mr-3" />
              <span>通知设置</span>
            </button>
            
            <button className="w-full flex items-center px-4 py-2.5 text-left rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <CalendarDays size={18} className="mr-3" />
              <span>日期和时间</span>
            </button>
            
            <button className="w-full flex items-center px-4 py-2.5 text-left rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Moon size={18} className="mr-3" />
              <span>外观设置</span>
            </button>
            
            <button className="w-full flex items-center px-4 py-2.5 text-left rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Lock size={18} className="mr-3" />
              <span>隐私设置</span>
            </button>
            
            <button className="w-full flex items-center px-4 py-2.5 text-left rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <MessageSquare size={18} className="mr-3" />
              <span>语言设置</span>
            </button>
            
            <button className="w-full flex items-center px-4 py-2.5 text-left rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <HelpCircle size={18} className="mr-3" />
              <span>帮助与支持</span>
            </button>
          </nav>
          
          <div className="p-4 mt-auto">
            <button 
              className="w-full flex items-center justify-center px-4 py-2.5 text-left rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-3" />
              <span>退出登录</span>
            </button>
          </div>
        </motion.div>

        {/* 右侧内容区域 */}
        <motion.div 
          className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm p-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">个人资料</h2>
            
            {isEditingProfile ? (
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  onClick={handleCancelEdit}
                >
                  取消
                </button>
                <button 
                  className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center"
                  onClick={handleSaveProfile}
                >
                  <Save size={14} className="mr-1" />
                  保存
                </button>
              </div>
            ) : (
              <button 
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                onClick={() => setIsEditingProfile(true)}
              >
                编辑
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {/* 头像设置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">头像</label>
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 overflow-hidden">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors mr-2">
                    上传头像
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    移除
                  </button>
                </div>
              </div>
            </div>
            
            {/* 用户名 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">用户名</label>
              {isEditingProfile ? (
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              ) : (
                <p className="text-gray-800 dark:text-white">{username}</p>
              )}
            </div>
            
            {/* 邮箱 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">邮箱</label>
              {isEditingProfile ? (
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              ) : (
                <p className="text-gray-800 dark:text-white">{email}</p>
              )}
            </div>
            
            {/* 个人简介 */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">个人简介</label>
              {isEditingProfile ? (
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                ></textarea>
              ) : (
                <p className="text-gray-800 dark:text-white">{bio}</p>
              )}
            </div>
            
            {/* 主题设置 */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">主题设置</h3>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">深色模式</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">切换系统主题</p>
                </div>
                <button 
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${
                    theme === 'dark' 
                      ? 'bg-blue-500 justify-end' 
                      : 'bg-gray-300 dark:bg-gray-600 justify-start'
                  }`}
                  onClick={toggleTheme}
                >
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>
            </div>
            
            {/* 安全设置 */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">安全设置</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">更改密码</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">更新您的账户密码</p>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 transition-colors flex items-center">
                    <span>更改</span>
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">二步验证</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">增强您的账户安全性</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">未启用</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSettings;