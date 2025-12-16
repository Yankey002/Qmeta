import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Upload,
  Download,
  Clock,
  CalendarDays,
  Check,
  AlertCircle,
  MoreVertical,
  RefreshCw,
  Shield,
  Info,
  Settings,
} from 'lucide-react';
import { Empty } from '@/components/Empty';
import { toast } from 'sonner';

// 模拟备份数据
const mockBackups = [
  {
    id: 1,
    name: '自动备份 - 2025-12-05',
    date: '2025-12-05T14:30:00',
    size: '12.5 MB',
    type: 'auto',
    status: 'completed',
    entries: 156,
  },
  {
    id: 2,
    name: '手动备份 - 2025-12-01',
    date: '2025-12-01T10:15:00',
    size: '11.8 MB',
    type: 'manual',
    status: 'completed',
    entries: 148,
  },
  {
    id: 3,
    name: '自动备份 - 2025-11-25',
    date: '2025-11-25T14:30:00',
    size: '10.2 MB',
    type: 'auto',
    status: 'completed',
    entries: 132,
  },
];

const DataBackup: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'backups' | 'restore'>('backups');
  const [backups, setBackups] = useState(mockBackups);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // 格式化备份时间
  const formatBackupTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 处理创建备份
  const handleCreateBackup = () => {
    setIsBackingUp(true);

    // 模拟备份过程
    setTimeout(() => {
      const newBackup = {
        id: backups.length + 1,
        name: '手动备份 - ' + new Date().toLocaleDateString('zh-CN'),
        date: new Date().toISOString(),
        size: (Math.random() * 5 + 10).toFixed(1) + ' MB',
        type: 'manual',
        status: 'completed',
        entries: Math.floor(Math.random() * 50) + 100,
      };

      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
      toast.success('备份创建成功！');
    }, 1500);
  };

  // 处理恢复备份
  const handleRestoreBackup = (id: number) => {
    if (window.confirm('确定要从该备份恢复数据吗？这将覆盖当前所有数据。')) {
      toast.success('数据恢复成功！');
    }
  };

  // 处理下载备份
  const handleDownloadBackup = (id: number) => {
    toast.success('备份文件已开始下载！');
  };

  // 处理删除备份
  const handleDeleteBackup = (id: number) => {
    if (window.confirm('确定要删除该备份吗？此操作不可恢复。')) {
      setBackups(backups.filter((backup) => backup.id !== id));
      toast.success('备份已删除！');
    }
  };

  // 处理自动备份设置
  const handleAutoBackupSettings = () => {
    toast('自动备份设置功能开发中...');
  };

  return (
    <div className="p-6">
      {/* 顶部导航栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">数据备份与恢复</h1>

        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              isBackingUp
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } flex items-center`}
            onClick={handleCreateBackup}
            disabled={isBackingUp}
          >
            {isBackingUp ? (
              <div className="flex items-center">
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                备份中...
              </div>
            ) : (
              <>
                <RefreshCw size={16} className="mr-2" />
                <span>创建备份</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 选项卡 */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex">
          <button
            className={`py-3 px-5 font-medium ${
              selectedTab === 'backups'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            } transition-colors`}
            onClick={() => setSelectedTab('backups')}
          >
            备份管理
          </button>
          <button
            className={`py-3 px-5 font-medium ${
              selectedTab === 'restore'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            } transition-colors`}
            onClick={() => setSelectedTab('restore')}
          >
            数据恢复
          </button>
        </div>
      </div>

      {/* 备份管理 */}
      {selectedTab === 'backups' && (
        <div className="space-y-6">
          {/* 自动备份设置卡片 */}
          <motion.div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">自动备份设置</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    系统每7天自动创建备份，最多保留5个自动备份
                  </p>
                </div>
              </div>
              <button
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center"
                onClick={handleAutoBackupSettings}
              >
                <Settings size={14} className="mr-1" />
                配置
              </button>
            </div>
          </motion.div>

          {/* 备份列表 */}
          {backups.length > 0 ? (
            <div className="space-y-4">
              {backups.map((backup) => (
                <motion.div
                  key={backup.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (backup.id - 1) }}
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            {backup.name}
                          </h3>
                          <span
                            className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${
                              backup.type === 'auto'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            }`}
                          >
                            {backup.type === 'auto' ? '自动' : '手动'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center">
                            <CalendarDays size={14} className="mr-1" />
                            {formatBackupTime(backup.date)}
                          </div>
                          <div>大小: {backup.size}</div>
                          <div>包含 {backup.entries} 条记录</div>
                          {backup.type === 'auto' && <div>下次自动备份: 7天后</div>}
                        </div>
                      </div>

                      <div className="flex flex-col items-center ml-4">
                        <div
                          className={`w-20 h-8 flex items-center justify-center rounded-lg text-sm font-medium mb-2 ${
                            backup.status === 'completed'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {backup.status === 'completed' ? '备份完成' : '备份中...'}
                        </div>

                        <div className="flex gap-1">
                          <button
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            onClick={() => handleRestoreBackup(backup.id)}
                          >
                            <RefreshCw size={16} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            onClick={() => handleDownloadBackup(backup.id)}
                          >
                            <Download size={16} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            onClick={() => handleDeleteBackup(backup.id)}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty message="暂无备份记录" icon="fa-database" />
          )}
        </div>
      )}

      {/* 数据恢复 */}
      {selectedTab === 'restore' && (
        <div className="space-y-6">
          {/* 恢复说明 */}
          <motion.div
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <Info size={20} className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">恢复数据说明</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                  <li>数据恢复将覆盖当前所有数据，请谨慎操作</li>
                  <li>建议在恢复前先创建当前数据的备份</li>
                  <li>恢复过程可能需要几秒钟，请耐心等待</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* 备份列表（用于恢复） */}
          {backups.length > 0 ? (
            <div className="space-y-4">
              {backups.map((backup) => (
                <motion.div
                  key={backup.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (backup.id - 1) }}
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            {backup.name}
                          </h3>
                          <span
                            className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${
                              backup.type === 'auto'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            }`}
                          >
                            {backup.type === 'auto' ? '自动' : '手动'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center">
                            <CalendarDays size={14} className="mr-1" />
                            {formatBackupTime(backup.date)}
                          </div>
                          <div>大小: {backup.size}</div>
                          <div>包含 {backup.entries} 条记录</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center ml-4">
                        <button
                          className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors mb-2"
                          onClick={() => handleRestoreBackup(backup.id)}
                        >
                          恢复此备份
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty message="暂无备份记录" icon="fa-database" />
          )}

          {/* 从文件恢复 */}
          <motion.div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">从本地文件恢复</h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Upload size={32} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                拖放备份文件到此处，或点击选择文件
              </p>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                选择备份文件
              </button>
              <p className="text-xs text-gray-400 mt-4">支持 .json 和 .backup 格式文件</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DataBackup;
