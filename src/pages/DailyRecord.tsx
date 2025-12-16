import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Image,
  Tag,
  Download,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  Edit,
  Clock,
} from 'lucide-react';
import { Empty } from '@/components/Empty';
import { toast } from 'sonner';

// 模拟日记数据
const mockDiaries = [
  {
    id: 1,
    title: '项目开发总结',
    content:
      '今天完成了项目的主要功能模块，遇到了一些技术挑战，但通过团队协作成功解决了问题。明天需要继续优化用户界面...',
    date: '2025-12-05',
    time: '15:30',
    tags: ['工作', '项目'],
    hasImages: true,
    category: '工作',
  },
  {
    id: 2,
    title: '学习React笔记',
    content:
      '学习了React Hooks的使用，特别是useState和useEffect的组合应用。通过实际例子加深了理解...',
    date: '2025-12-04',
    time: '20:15',
    tags: ['学习', 'React'],
    hasImages: false,
    category: '学习',
  },
  {
    id: 3,
    title: '周末旅行',
    content: '今天去了郊外爬山，天气很好，风景如画。拍了很多照片，心情愉悦...',
    date: '2025-12-02',
    time: '14:20',
    tags: ['旅行', '生活'],
    hasImages: true,
    category: '生活',
  },
];

// 模拟分类数据
const mockCategories = [
  { id: 1, name: '工作', count: 12 },
  { id: 2, name: '学习', count: 8 },
  { id: 3, name: '生活', count: 15 },
  { id: 4, name: '健康', count: 5 },
  { id: 5, name: '其他', count: 3 },
];

const DailyRecord: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [showFilters, setShowFilters] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [sortBy, setSortBy] = useState('date');

  // 过滤和排序日记列表
  const filteredDiaries = mockDiaries
    .filter(
      (diary) =>
        (selectedCategory === '全部' || diary.category === selectedCategory) &&
        (diary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          diary.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          diary.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  // 处理新建日记
  const handleNewDiary = () => {
    toast('新建日记功能开发中...');
  };

  // 处理导出日记
  const handleExport = (format: string) => {
    toast(`导出为${format.toUpperCase()}格式功能开发中...`);
  };

  return (
    <div className="flex h-full">
      {/* 分类侧边栏 */}
      <motion.div
        className={`
          ${showSidebar ? 'w-64' : 'w-0'} 
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          transition-all duration-300 ease-in-out overflow-hidden
        `}
        initial={false}
        animate={{ width: showSidebar ? '16rem' : '0rem' }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">日记分类</h2>
            <button
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              onClick={() => setShowSidebar(false)}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="space-y-1 mb-6">
            <button
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left
                         ${
                           selectedCategory === '全部'
                             ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                         }`}
              onClick={() => setSelectedCategory('全部')}
            >
              <span>全部日记</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{mockDiaries.length}</span>
            </button>

            {mockCategories.map((category) => (
              <button
                key={category.id}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left
                           ${
                             selectedCategory === category.name
                               ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                               : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                           }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <span>{category.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{category.count}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
            <button className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Plus size={16} className="mr-2" />
              <span>新建分类</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* 顶部导航栏 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              {!showSidebar && (
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 mr-4"
                  onClick={() => setShowSidebar(true)}
                >
                  <ChevronRight size={20} className="transform rotate-180" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">日记记录</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center transition-colors"
                onClick={handleNewDiary}
              >
                <Plus size={16} className="mr-2" />
                <span>新建日记</span>
              </button>
            </div>
          </div>

          {/* 搜索和过滤区域 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="搜索日记内容、标题或标签..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <select
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">按日期排序</option>
                  <option value="title">按标题排序</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>

              <button
                className="p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* 标签过滤器 */}
          {showFilters && (
            <motion.div
              className="flex flex-wrap gap-2 mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {['全部', '工作', '学习', '生活', '旅行', '健康', '项目'].map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedCategory === tag
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  } transition-colors`}
                  onClick={() => setSelectedCategory(tag)}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}

          {/* 日记列表 */}
          {filteredDiaries.length > 0 ? (
            <div className="space-y-4">
              {filteredDiaries.map((diary) => (
                <motion.div
                  key={diary.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
                          {diary.category}
                        </span>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CalendarDays size={14} className="mr-1" />
                          {diary.date}
                          <Clock size={14} className="ml-3 mr-1" />
                          {diary.time}
                        </div>
                      </div>
                      <div className="relative">
                        <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {diary.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {diary.content}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {diary.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full flex items-center"
                          >
                            <Tag size={12} className="mr-1" />
                            {tag}
                          </span>
                        ))}

                        {diary.hasImages && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full flex items-center">
                            <Image size={12} className="mr-1" />
                            有图片
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                          onClick={() => handleExport('md')}
                        >
                          <Download size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty message="没有找到匹配的日记" icon="fa-book-open" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyRecord;
