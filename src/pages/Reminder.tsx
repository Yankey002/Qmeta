import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Clock,
  CalendarDays,
  AlertCircle,
  MoreVertical,
  Check,
  X,
} from 'lucide-react';
import { Empty } from '@/components/Empty';
import { toast } from 'sonner';

// 模拟提醒数据
const mockReminders = [
  {
    id: 1,
    title: '团队周会',
    description: '每周项目进度讨论',
    time: '2025-12-05T16:00:00',
    isCompleted: false,
    isRepeating: true,
    repeatType: 'weekly',
    提前提醒: '15分钟',
  },
  {
    id: 2,
    title: '提交周报',
    description: '每周五下班前提交',
    time: '2025-12-06T17:00:00',
    isCompleted: false,
    isRepeating: true,
    repeatType: 'weekly',
    提前提醒: '30分钟',
  },
  {
    id: 3,
    title: '健身锻炼',
    description: '每周一、三、五',
    time: '2025-12-05T19:00:00',
    isCompleted: true,
    isRepeating: true,
    repeatType: 'custom',
    提前提醒: '10分钟',
  },
  {
    id: 4,
    title: '朋友生日',
    description: '送礼物',
    time: '2025-12-10T10:00:00',
    isCompleted: false,
    isRepeating: false,
    repeatType: 'once',
    提前提醒: '1小时',
  },
  {
    id: 5,
    title: '项目截止日期',
    description: '完成第一阶段开发',
    time: '2025-12-15T23:59:00',
    isCompleted: false,
    isRepeating: false,
    repeatType: 'once',
    提前提醒: '1天',
  },
];

const Reminder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('upcoming');
  const [showFilters, setShowFilters] = useState(false);
  const [reminders, setReminders] = useState(mockReminders);

  // 过滤提醒列表
  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch =
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.description.toLowerCase().includes(searchQuery.toLowerCase());

    const isUpcoming = new Date(reminder.time) >= new Date();

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'upcoming' && !reminder.isCompleted && isUpcoming) ||
      (selectedFilter === 'completed' && reminder.isCompleted) ||
      (selectedFilter === 'past' && !reminder.isCompleted && !isUpcoming);

    return matchesSearch && matchesFilter;
  });

  // 格式化时间
  const formatReminderTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = new Date(now.getTime() + 86400000).toDateString() === date.toDateString();

    if (isToday) {
      return `今天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isTomorrow) {
      return `明天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString('zh-CN')} ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  // 获取重复类型文本
  const getRepeatText = (isRepeating: boolean, repeatType: string) => {
    if (!isRepeating) return '一次性';

    switch (repeatType) {
      case 'daily':
        return '每天';
      case 'weekly':
        return '每周';
      case 'monthly':
        return '每月';
      case 'yearly':
        return '每年';
      case 'custom':
        return '自定义';
      default:
        return '重复';
    }
  };

  // 处理提醒完成状态切换
  const toggleReminderStatus = (id: number) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, isCompleted: !reminder.isCompleted } : reminder
      )
    );
    toast.success('提醒状态已更新！');
  };

  // 处理删除提醒
  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
    toast.success('提醒已删除！');
  };

  // 处理新建提醒
  const handleNewReminder = () => {
    toast('新建提醒功能开发中...');
  };

  return (
    <div className="p-6">
      {/* 顶部导航栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">提醒管理</h1>

        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center transition-colors"
            onClick={handleNewReminder}
          >
            <Plus size={16} className="mr-2" />
            <span>新建提醒</span>
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
            placeholder="搜索提醒..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <select
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="upcoming">即将到来</option>
              <option value="all">全部</option>
              <option value="completed">已完成</option>
              <option value="past">已过期</option>
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
          {['即将到来', '全部', '已完成', '已过期'].map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedFilter ===
                (filter === '即将到来'
                  ? 'upcoming'
                  : filter === '全部'
                    ? 'all'
                    : filter === '已完成'
                      ? 'completed'
                      : 'past')
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
              onClick={() =>
                setSelectedFilter(
                  filter === '即将到来'
                    ? 'upcoming'
                    : filter === '全部'
                      ? 'all'
                      : filter === '已完成'
                        ? 'completed'
                        : 'past'
                )
              }
            >
              {filter}
            </button>
          ))}

          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            一次性
          </button>

          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            重复性
          </button>
        </motion.div>
      )}

      {/* 提醒列表 */}
      {filteredReminders.length > 0 ? (
        <div className="space-y-4">
          {filteredReminders.map((reminder) => {
            const isUpcoming = new Date(reminder.time) >= new Date();
            const isToday = new Date(reminder.time).toDateString() === new Date().toDateString();

            return (
              <motion.div
                key={reminder.id}
                className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                  !isUpcoming && !reminder.isCompleted
                    ? 'border-red-200 dark:border-red-900/30'
                    : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    {reminder.isCompleted ? (
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Check size={14} className="text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    ) : (
                      <button
                        className="flex-shrink-0 mt-1"
                        onClick={() => toggleReminderStatus(reminder.id)}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            !isUpcoming
                              ? 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                              : 'border border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {!isUpcoming && (
                            <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                          )}
                        </div>
                      </button>
                    )}

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3
                          className={`font-medium ${reminder.isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}
                        >
                          {reminder.title}
                        </h3>
                        {isToday && !reminder.isCompleted && (
                          <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            今天
                          </span>
                        )}
                        {!isUpcoming && !reminder.isCompleted && (
                          <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                            已过期
                          </span>
                        )}
                      </div>

                      {reminder.description && (
                        <p
                          className={`text-sm mb-3 ${reminder.isCompleted ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}
                        >
                          {reminder.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock size={14} className="mr-1" />
                            {formatReminderTime(reminder.time)}
                          </div>

                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <CalendarDays size={14} className="mr-1" />
                            {getRepeatText(reminder.isRepeating, reminder.repeatType)}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {reminder.isCompleted ? (
                            <button
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                              onClick={() => handleDeleteReminder(reminder.id)}
                            >
                              <X size={16} />
                            </button>
                          ) : (
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                              <MoreVertical size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Empty message="没有找到匹配的提醒" icon="fa-bell" />
      )}
    </div>
  );
};

export default Reminder;
