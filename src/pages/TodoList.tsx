import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  Square,
  List,
  Grid,
  Search,
  Plus,
  CalendarDays,
  Flag,
  Filter,
  ChevronDown,
  MoreVertical,
  Clock,
  X,
} from 'lucide-react';
import { Empty } from '@/components/Empty';
import { toast } from 'sonner';

const mockTodos = [
  {
    id: 1,
    title: '完成项目提案文档',
    description: '编写并完善项目提案的详细文档，包括需求分析和技术方案',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-12-06',
    category: '工作',
  },
  {
    id: 2,
    title: '准备团队周会',
    description: '整理上周工作进展和本周计划，准备会议材料',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-12-05',
    category: '工作',
  },
  {
    id: 3,
    title: '健身锻炼',
    description: '进行30分钟有氧运动和20分钟力量训练',
    status: 'completed',
    priority: 'medium',
    dueDate: '2025-12-05',
    category: '健康',
  },
  {
    id: 4,
    title: '购买生日礼物',
    description: '为朋友挑选生日礼物',
    status: 'pending',
    priority: 'low',
    dueDate: '2025-12-10',
    category: '生活',
  },
  {
    id: 5,
    title: '学习React新特性',
    description: '研究React 18的新功能和最佳实践',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-12-08',
    category: '学习',
  },
];

const TodoList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [todos, setTodos] = useState(mockTodos);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'pending' && todo.status === 'pending') ||
      (selectedFilter === 'completed' && todo.status === 'completed');

    return matchesSearch && matchesFilter;
  });

  const groupedTodos = {
    pending: filteredTodos.filter((todo) => todo.status === 'pending'),
    completed: filteredTodos.filter((todo) => todo.status === 'completed'),
  };

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          color: 'bg-red-500',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          textColor: 'text-red-600 dark:text-red-400',
        };
      case 'medium':
        return {
          color: 'bg-amber-500',
          bgColor: 'bg-amber-50 dark:bg-amber-900/20',
          textColor: 'text-amber-600 dark:text-amber-400',
        };
      case 'low':
        return {
          color: 'bg-green-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          textColor: 'text-green-600 dark:text-green-400',
        };
      default:
        return {
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50 dark:bg-gray-800',
          textColor: 'text-gray-600 dark:text-gray-400',
        };
    }
  };

  const toggleTodoStatus = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status === 'pending' ? 'completed' : 'pending' }
        : todo
    );
    setTodos(updatedTodos);
    const updatedTodo = updatedTodos.find((todo) => todo.id === id);
    toast.success(updatedTodo?.status === 'completed' ? '待办事项已完成！' : '待办事项已恢复！');
  };

  const handleNewTodo = () => {
    toast('新建待办事项功能开发中...');
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">待办事项</h1>

        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center transition-colors"
            onClick={handleNewTodo}
          >
            <Plus size={16} className="mr-2" />
            <span>新建待办</span>
          </button>

          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              className={`px-3 py-2 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-800 shadow-sm'
                  : 'bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700'
              } transition-colors`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
            <button
              className={`px-3 py-2 ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-gray-800 shadow-sm'
                  : 'bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700'
              } transition-colors`}
              onClick={() => setViewMode('kanban')}
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="搜索待办事项..."
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
              <option value="all">全部</option>
              <option value="pending">待处理</option>
              <option value="completed">已完成</option>
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

      {showFilters && (
        <motion.div
          className="flex flex-wrap gap-2 mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {['全部', '工作', '学习', '生活', '健康'].map((category) => (
            <button
              key={category}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedFilter === category
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      )}

      {viewMode === 'list' && (
        <>
          {filteredTodos.length > 0 ? (
            <div className="space-y-4">
              {filteredTodos.map((todo) => {
                const priorityInfo = getPriorityInfo(todo.priority);
                return (
                  <motion.div
                    key={todo.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <button
                          className="flex-shrink-0 mt-1"
                          onClick={() => toggleTodoStatus(todo.id)}
                        >
                          {todo.status === 'completed' ? (
                            <CheckSquare className="text-green-500" size={20} />
                          ) : (
                            <Square
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                              size={20}
                            />
                          )}
                        </button>

                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3
                              className={`font-medium ${todo.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}
                            >
                              {todo.title}
                            </h3>
                            <span
                              className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${priorityInfo.bgColor} ${priorityInfo.textColor}`}
                            >
                              <Flag size={12} className="mr-1" />
                              {todo.priority === 'high'
                                ? '高'
                                : todo.priority === 'medium'
                                  ? '中'
                                  : '低'}
                            </span>
                          </div>

                          {todo.description && (
                            <p
                              className={`text-sm mb-3 ${todo.status === 'completed' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                              {todo.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <CalendarDays size={14} className="mr-1" />
                              {todo.dueDate}
                              <span className="mx-2">•</span>
                              <span>{todo.category}</span>
                            </div>

                            <div className="flex gap-2">
                              <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                                <MoreVertical size={16} />
                              </button>
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
            <Empty message="没有找到匹配的待办事项" icon="fa-list-check" />
          )}
        </>
      )}

      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <h3 className="font-semibold text-gray-800 dark:text-white">待处理</h3>
                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                  {groupedTodos.pending.length}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
              {groupedTodos.pending.length > 0 ? (
                groupedTodos.pending.map((todo) => {
                  const priorityInfo = getPriorityInfo(todo.priority);
                  return (
                    <motion.div
                      key={todo.id}
                      className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-750 hover:shadow-sm transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => toggleTodoStatus(todo.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-800 dark:text-white text-sm">
                          {todo.title}
                        </h3>
                        <span
                          className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${priorityInfo.bgColor} ${priorityInfo.textColor}`}
                        >
                          <Flag size={10} className="mr-1" />
                          {todo.priority === 'high'
                            ? '高'
                            : todo.priority === 'medium'
                              ? '中'
                              : '低'}
                        </span>
                      </div>

                      {todo.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {todo.description}
                        </p>
                      )}

                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <CalendarDays size={12} className="mr-1" />
                        {todo.dueDate}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  没有待处理的事项
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h3 className="font-semibold text-gray-800 dark:text-white">已完成</h3>
                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                  {groupedTodos.completed.length}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
              {groupedTodos.completed.length > 0 ? (
                groupedTodos.completed.map((todo) => {
                  const priorityInfo = getPriorityInfo(todo.priority);
                  return (
                    <motion.div
                      key={todo.id}
                      className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-750 hover:shadow-sm transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => toggleTodoStatus(todo.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-500 dark:text-gray-400 text-sm line-through">
                          {todo.title}
                        </h3>
                        <span
                          className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${priorityInfo.bgColor} ${priorityInfo.textColor} opacity-70`}
                        >
                          <Flag size={10} className="mr-1" />
                          {todo.priority === 'high'
                            ? '高'
                            : todo.priority === 'medium'
                              ? '中'
                              : '低'}
                        </span>
                      </div>

                      {todo.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2 line-through">
                          {todo.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <CalendarDays size={12} className="mr-1" />
                          {todo.dueDate}
                        </div>
                        <div className="flex items-center text-green-500 dark:text-green-400">
                          <CheckSquare size={12} className="mr-1" />
                          已完成
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  没有已完成的事项
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
