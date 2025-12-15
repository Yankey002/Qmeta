import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface EmptyProps {
  message?: string;
  icon?: string;
  className?: string;
}

export function Empty({ 
  message = "暂无数据", 
  icon = "fa-box-open", 
  className = "" 
}: EmptyProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center h-64 text-center",
        className
      )}
    >
      <div className="text-gray-300 dark:text-gray-600 text-5xl mb-4">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </motion.div>
  );
}