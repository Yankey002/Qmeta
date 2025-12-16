import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarRange,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Clock,
  Flag,
  MoreVertical,
  ChevronRight,
  BarChart,
  CalendarDays,
  Target,
} from 'lucide-react';
import { Empty } from '@/components/Empty';
import { toast } from 'sonner';

// 模拟长周期计划数据
const mockPlans = [
  {
    id: 1,
    title: '产品开发项目',
    description: '完成新产品从需求分析到上线的全流程开发',
    startDate: '2025-11-20',
    endDate: '2026-03-15',
    progress: 35,
    priority: 'high',
    milestones: [
      { id: 1, name: '需求分析完成', date: '2025-12-10', completed: true },
      { id: 2, name: '设计评审', date: '2025-12-25', completed: false },
      { id: 3, name: '开发完成', date: '2026-02-20', completed: false },
      { id: 4, name: '测试验收', date: '2026-03-05', completed: false },
      { id: 5, name: '正式上线', date: '2026-03-15', completed: false },
    ],
  },
  {
    id: 2,
    title: '学习计划',
    description: '系统学习React和TypeScript高级概念',
    startDate: '2025-12-01',
    endDate: '2026-02-28',
    progress: 20,
    priority: 'medium',
    milestones: [
      { id: 1, name: '基础知识复习', date: '2025-12-15', completed: false },
      { id: 2, name: '高级概念学习', date: '2026-01-30', completed: false },
      { id: 3, name: '项目实践', date: '2026-02-28', completed: false },
    ],
  },
  {
    id: 3,
    title: '健身计划',
    description: '每周锻炼4次，提升体能和肌肉力量',
    startDate: '2025-11-01',
    endDate: '2026-04-30',
    progress: 60,
    priority: 'low',
    milestones: [
      { id: 1, name: '第一个月坚持', date: '2025-12-01', completed: true },
      { id: 2, name: '第二个月坚持', date: '2026-01-01', completed: true },
      { id: 3, name: '第三个月坚持', date: '2026-02-01', completed: false },
      { id: 4, name: '第四个月坚持', date: '2026-03-01', completed: false },
      { id: 5, name: '第五个月坚持', date: '2026-04-01', completed: false },
      { id: 6, name: '最终目标达成', date: '2026-04-30', completed: false },
    ],
  },
];

const LongTermPlan: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);

  // 过滤计划列表
  const filteredPlans = mockPlans.filter(
    (plan) =>
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 获取优先级对应的颜色和图标
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

  // 计算计划持续时间
  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 处理新建计划
  const handleNewPlan = () => {
    toast('新建长周期计划功能开发中...');
  };

  // 切换计划展开/收起状态
  const togglePlanExpand = (id: number) => {
    setExpandedPlan(expandedPlan === id ? null : id);
  };

  return (
    <div className="p-6">
      {/* 顶部导航栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">长周期计划</h1>

        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center transition-colors"
            onClick={handleNewPlan}
          >
            <Plus size={16} className="mr-2" />
            <span>新建计划</span>
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
            placeholder="搜索计划..."
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
              <option value="high">高优先级</option>
              <option value="medium">中优先级</option>
              <option value="low">低优先级</option>
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
          {['全部', '高优先级', '中优先级', '低优先级'].map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedFilter ===
                (filter === '高优先级'
                  ? 'high'
                  : filter === '中优先级'
                    ? 'medium'
                    : filter === '低优先级'
                      ? 'low'
                      : 'all')
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
              onClick={() =>
                setSelectedFilter(
                  filter === '高优先级'
                    ? 'high'
                    : filter === '中优先级'
                      ? 'medium'
                      : filter === '低优先级'
                        ? 'low'
                        : 'all'
                )
              }
            >
              {filter}
            </button>
          ))}
        </motion.div>
      )}

      {/* 计划列表 */}
      {filteredPlans.length > 0 ? (
        <div className="space-y-4">
          {filteredPlans.map((plan) => {
            const priorityInfo = getPriorityInfo(plan.priority);
            const duration = calculateDuration(plan.startDate, plan.endDate);
            const completedMilestones = plan.milestones.filter((m) => m.completed).length;

            return (
              <motion.div
                key={plan.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="p-4 sm:p-5 cursor-pointer"
                  onClick={() => togglePlanExpand(plan.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {plan.title}
                        </h3>
                        <span
                          className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${priorityInfo.bgColor} ${priorityInfo.textColor}`}
                        >
                          <Flag size={12} className="mr-1" />
                          {plan.priority === 'high'
                            ? '高'
                            : plan.priority === 'medium'
                              ? '中'
                              : '低'}
                        </span>
                      </div>

                      {plan.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {plan.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CalendarDays size={14} className="mr-1" />
                          {new Date(plan.startDate).toLocaleDateString('zh-CN')} 至{' '}
                          {new Date(plan.endDate).toLocaleDateString('zh-CN')}
                          <span className="mx-2">•</span>
                          <Clock size={14} className="mr-1" />
                          {duration} 天
                        </div>

                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                            进度:
                          </span>
                          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-500"
                              style={{ width: `${plan.progress}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {plan.progress}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center ml-4">
                      <motion.div
                        animate={{ rotate: expandedPlan === plan.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="text-gray-500 dark:text-gray-400" size={20} />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* 展开的详细信息 */}
                {expandedPlan === plan.id && (
                  <motion.div
                    className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-5 bg-gray-50 dark:bg-gray-850"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* 里程碑列表 */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                        <Target size={16} className="mr-2" />
                        里程碑 ({completedMilestones}/{plan.milestones.length})
                      </h4>
                      <div className="space-y-2">
                        {plan.milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className="flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                          >
                            <div className="flex-shrink-0 mr-3">
                              <input
                                type="checkbox"
                                checked={milestone.completed}
                                className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex-grow">
                              <p
                                className={`text-sm ${milestone.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}
                              >
                                {milestone.name}
                              </p>
                            </div>
                            <div className="flex-shrink-0 ml-4 text-xs text-gray-500 dark:text-gray-400">
                              {new Date(milestone.date).toLocaleDateString('zh-CN')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex flex-wrap gap-2 justify-end">
                      <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                        编辑计划
                      </button>
                      <button className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                        查看甘特图
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default LongTermPlan;
