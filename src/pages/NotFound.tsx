import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-9xl font-bold text-gray-200 dark:text-gray-700 mb-6">
          404
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          页面不存在
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          抱歉，您访问的页面不存在或已被删除
        </p>
        <Link to="/">
          <button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
            返回首页
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;