import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass, bgClass, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white dark:bg-deepbrown-800 p-6 rounded-3xl shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 flex items-center gap-4"
    >
        <div className={`p-4 rounded-2xl ${bgClass}`}>
            <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
        <div>
            <p className="text-xs text-deepbrown-500 dark:text-cream-200/50 font-black uppercase tracking-widest">{title}</p>
            <p className="text-2xl font-black text-deepbrown-900 dark:text-cream-50 mt-1">{value}</p>
        </div>
    </motion.div>
);

export default StatCard;
