import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ListChecks, CalendarRange, Bell, Globe, Database, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const recentActivities = [{
    id: 1,
    title: "完成项目提案",
    type: "todo",
    time: "今天 14:30"
}, {
    id: 2,
    title: "撰写周总结日记",
    type: "diary",
    time: "昨天 20:15"
}, {
    id: 3,
    title: "添加学习资料网站",
    type: "website",
    time: "3天前"
}];

const upcomingTodos = [{
    id: 1,
    title: "团队会议",
    priority: "high",
    dueDate: "今天 16:00"
}, {
    id: 2,
    title: "提交周报",
    priority: "medium",
    dueDate: "明天 10:00"
}, {
    id: 3,
    title: "购买办公用品",
    priority: "low",
    dueDate: "明天 15:00"
}];

const statsData = [{
    name: "日记",
    value: 12,
    icon: "book"
}, {
    name: "待办",
    value: 8,
    icon: "list"
}, {
    name: "计划",
    value: 3,
    icon: "calendar"
}, {
    name: "网址",
    value: 24,
    icon: "globe"
}];

export default function Home() {
    const getPriorityInfo = (priority: string) => {
        switch (priority) {
        case "high":
            return {
                color: "bg-red-500",
                icon: "fa-arrow-up"
            };
        case "medium":
            return {
                color: "bg-amber-500",
                icon: "fa-minus"
            };
        case "low":
            return {
                color: "bg-green-500",
                icon: "fa-arrow-down"
            };
        default:
            return {
                color: "bg-gray-500",
                icon: "fa-minus"
            };
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
        case "todo":
            return "fa-check-circle";
        case "diary":
            return "fa-book";
        case "website":
            return "fa-globe";
        default:
            return "fa-question";
        }
    };

    return (
        <div className="p-6 space-y-8">
            <motion.div
                initial={{
                    opacity: 0,
                    y: -20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.5
                }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">欢迎回来</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">今天是 {new Date().toLocaleDateString("zh-CN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            weekday: "long"
                        })}</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link to="/daily-record/new">
                        <button
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-full font-medium flex items-center hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
                            <i className="fa-solid fa-plus mr-2"></i>
                            <span>新建记录</span>
                        </button>
                    </Link>
                </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, index) => <></>)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -20
                    }}
                    animate={{
                        opacity: 1,
                        x: 0
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2
                    }}
                    className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">今日待办</h2>
                        <Link to="/todo-list">
                            <span className="text-blue-500 text-sm flex items-center hover:underline">查看全部 <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
                            </span>
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {upcomingTodos.map(todo => {
                            const priorityInfo = getPriorityInfo(todo.priority);

                            return (
                                <div
                                    key={todo.id}
                                    className="flex items-center p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                    <div className="flex-shrink-0 mr-3">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-gray-800 dark:text-gray-200">{todo.title}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{todo.dueDate}</p>
                                    </div>
                                    <div className="flex-shrink-0 ml-2">
                                        <div className={`w-2 h-2 rounded-full ${priorityInfo.color}`}></div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="mt-4">
                            <Link to="/todo-list/new">
                                <button
                                    className="w-full py-2.5 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                    <i className="fa-solid fa-plus mr-2"></i>添加新待办
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
                <div className="space-y-6">
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 20
                        }}
                        animate={{
                            opacity: 1,
                            x: 0
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.3
                        }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">最近活动</h2>
                        <div className="space-y-4">
                            {recentActivities.map(activity => <div key={activity.id} className="flex items-center">
                                <div
                                    className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mr-3`}>
                                    <i className={`fa-solid ${getActivityIcon(activity.type)}`}></i>
                                </div>
                                <div>
                                    <p className="text-gray-800 dark:text-gray-200 text-sm">{activity.title}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{activity.time}</p>
                                </div>
                            </div>)}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 20
                        }}
                        animate={{
                            opacity: 1,
                            x: 0
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.4
                        }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">快捷导航</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {[{
                                name: "日记",
                                icon: <BookOpen size={20} />,
                                path: "/daily-record"
                            }, {
                                name: "待办",
                                icon: <ListChecks size={20} />,
                                path: "/todo-list"
                            }, {
                                name: "计划",
                                icon: <CalendarRange size={20} />,
                                path: "/long-term-plan"
                            }, {
                                name: "提醒",
                                icon: <Bell size={20} />,
                                path: "/reminder"
                            }, {
                                name: "网址",
                                icon: <Globe size={20} />,
                                path: "/website-manager"
                            }, {
                                name: "设置",
                                icon: <Settings size={20} />,
                                path: "/settings"
                            }].map((item, index) => <Link to={item.path} key={index}>
                                <div
                                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer">
                                    <div
                                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mb-2">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs text-gray-700 dark:text-gray-300">{item.name}</span>
                                </div>
                            </Link>)}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}