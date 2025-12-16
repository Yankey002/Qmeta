import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Star,
  StarOff,
  Bookmark,
  BarChart3,
  Settings,
  ExternalLink,
  MoreVertical,
  X,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { Empty } from '@/components/Empty';
import { toast } from 'sonner';

// 模拟网址数据
const mockWebsites = [
  {
    id: 1,
    name: 'GitHub',
    url: 'https://github.com',
    description: '代码托管平台',
    category: '开发工具',
    isFavorite: true,
    importance: 'high',
    visits: 156,
    lastVisit: '2025-12-05T14:30:00',
    favicon: 'https://github.com/favicon.ico',
  },
  {
    id: 2,
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Web 开发文档',
    category: '学习资源',
    isFavorite: true,
    importance: 'high',
    visits: 98,
    lastVisit: '2025-12-04T10:15:00',
    favicon: 'https://developer.mozilla.org/favicon.ico',
  },
  {
    id: 3,
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: '程序员问答社区',
    category: '开发工具',
    isFavorite: true,
    importance: 'medium',
    visits: 87,
    lastVisit: '2025-12-03T16:45:00',
    favicon: 'https://stackoverflow.com/favicon.ico',
  },
  {
    id: 4,
    name: 'YouTube',
    url: 'https://youtube.com',
    description: '视频分享平台',
    category: '娱乐',
    isFavorite: false,
    importance: 'low',
    visits: 234,
    lastVisit: '2025-12-05T19:20:00',
    favicon: 'https://youtube.com/favicon.ico',
  },
  {
    id: 5,
    name: 'React 官方文档',
    url: 'https://react.dev',
    description: 'React 框架官方文档',
    category: '学习资源',
    isFavorite: true,
    importance: 'high',
    visits: 65,
    lastVisit: '2025-12-02T09:30:00',
    favicon: 'https://react.dev/favicon.ico',
  },
];

// 模拟分类数据
const mockCategories = [
  { id: 1, name: '开发工具', count: 15 },
  { id: 2, name: '学习资源', count: 23 },
  { id: 3, name: '娱乐', count: 8 },
  { id: 4, name: '新闻', count: 12 },
  { id: 5, name: '其他', count: 5 },
];

const WebsiteManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [showFilters, setShowFilters] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [websites, setWebsites] = useState(mockWebsites);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 过滤网址列表
  const filteredWebsites = websites.filter(
    (website) =>
      (selectedCategory === '全部' || website.category === selectedCategory) &&
      (website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        website.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        website.url.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 获取重要程度对应的颜色
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  // 格式化最后访问时间
  const formatLastVisit = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return '今天';
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays} 天前`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} 周前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  // 处理收藏状态切换
  const toggleFavorite = (id: number) => {
    setWebsites(
      websites.map((website) =>
        website.id === id ? { ...website, isFavorite: !website.isFavorite } : website
      )
    );
    toast.success('收藏状态已更新！');
  };

  // 处理打开网址
  const openWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  // 处理新建网址
  const handleNewWebsite = () => {
    toast('新建网址功能开发中...');
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
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">网址分类</h2>
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
              <span>全部网址</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{websites.length}</span>
            </button>

            <button
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left
                         ${
                           selectedCategory === '收藏'
                             ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                         }`}
              onClick={() => setSelectedCategory('收藏')}
            >
              <span>收藏网址</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {websites.filter((w) => w.isFavorite).length}
              </span>
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
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">网址管理</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  className={`px-3 py-2 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-800 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } transition-colors`}
                  onClick={() => setViewMode('grid')}
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-sm bg-gray-500"></div>
                    <div className="w-1.5 h-1.5 rounded-sm bg-gray-500"></div>
                    <div className="w-1.5 h-1.5 rounded-sm bg-gray-500"></div>
                    <div className="w-1.5 h-1.5 rounded-sm bg-gray-500"></div>
                  </div>
                </button>
                <button
                  className={`px-3 py-2 ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-800 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } transition-colors`}
                  onClick={() => setViewMode('list')}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="w-3 h-1.5 rounded-sm bg-gray-500"></div>
                    <div className="w-3 h-1.5 rounded-sm bg-gray-500"></div>
                    <div className="w-3 h-1.5 rounded-sm bg-gray-500"></div>
                  </div>
                </button>
              </div>

              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center transition-colors"
                onClick={handleNewWebsite}
              >
                <Plus size={16} className="mr-2" />
                <span>添加网址</span>
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
                placeholder="搜索网址名称、描述或URL..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
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
              {['全部', '收藏', ...mockCategories.map((c) => c.name)].map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedCategory === category
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  } transition-colors`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}

              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                高重要度
              </button>

              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                常用
              </button>
            </motion.div>
          )}

          {/* 网址网格视图 */}
          {viewMode === 'grid' && (
            <>
              {filteredWebsites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredWebsites.map((website) => (
                    <motion.div
                      key={website.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="p-4 cursor-pointer" onClick={() => openWebsite(website.url)}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                              {website.favicon ? (
                                <img src={website.favicon} alt={website.name} className="w-5 h-5" />
                              ) : (
                                <Globe size={16} className="text-gray-500 dark:text-gray-400" />
                              )}
                            </div>
                            <h3 className="font-medium text-gray-800 dark:text-white truncate max-w-[120px]">
                              {website.name}
                            </h3>
                          </div>
                          <button
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(website.id);
                            }}
                          >
                            {website.isFavorite ? (
                              <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            ) : (
                              <StarOff size={16} />
                            )}
                          </button>
                        </div>

                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {website.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                            {website.category}
                          </span>
                          <div
                            className={`w-2 h-2 rounded-full ${getImportanceColor(website.importance)}`}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Empty message="没有找到匹配的网址" icon="fa-globe" />
              )}
            </>
          )}

          {/* 网址列表视图 */}
          {viewMode === 'list' && (
            <>
              {filteredWebsites.length > 0 ? (
                <div className="space-y-4">
                  {filteredWebsites.map((website) => (
                    <motion.div
                      key={website.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="p-4 sm:p-5 cursor-pointer"
                        onClick={() => openWebsite(website.url)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                              {website.favicon ? (
                                <img src={website.favicon} alt={website.name} className="w-6 h-6" />
                              ) : (
                                <Globe size={20} className="text-gray-500 dark:text-gray-400" />
                              )}
                            </div>
                          </div>

                          <div className="flex-grow">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <h3 className="font-medium text-gray-800 dark:text-white">
                                {website.name}
                              </h3>
                              <div className="flex items-center gap-2">
                                {website.isFavorite && (
                                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                )}
                                <div
                                  className={`w-2 h-2 rounded-full ${getImportanceColor(website.importance)}`}
                                ></div>
                              </div>
                            </div>

                            {website.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                {website.description}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-4">
                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                                  {website.category}
                                </span>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                  <BarChart3 size={12} className="mr-1" />
                                  访问 {website.visits} 次
                                </div>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                  <Clock size={12} className="mr-1" />
                                  {formatLastVisit(website.lastVisit)}
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                                  <ExternalLink size={16} />
                                </button>
                                <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                                  <MoreVertical size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Empty message="没有找到匹配的网址" icon="fa-globe" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteManager;
