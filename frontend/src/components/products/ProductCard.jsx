import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn, formatPrice } from '../../lib/utils';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    if (product.isComingSoon) {
        return (
            <motion.div
                className="group relative bg-white dark:bg-deepbrown-800 rounded-[2.5rem] p-3 shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 overflow-hidden flex flex-col min-h-[500px]"
            >
                <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5",
                    product.color
                )} />
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 p-8">
                    <div className="w-24 h-24 bg-cream-50 dark:bg-deepbrown-900 rounded-[2rem] flex items-center justify-center text-deepbrown-300 dark:text-cream-200/20 border border-deepbrown-50 dark:border-white/5 shadow-inner">
                        <Plus className="w-10 h-10 rotate-45" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-black text-deepbrown-300 dark:text-cream-200/20 mb-3 uppercase tracking-tighter">{product.name}</h3>
                        <span className="px-6 py-2.5 bg-cream-50 dark:bg-deepbrown-900 text-terracotta-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border border-terracotta-500/10">
                            Coming Soon
                        </span>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-white dark:bg-deepbrown-800 rounded-[2.5rem] p-3 shadow-sm hover:shadow-2xl transition-all duration-500 border border-deepbrown-50 dark:border-deepbrown-700 overflow-hidden flex flex-col min-h-[500px]"
        >
            {/* Background Blob */}
            <div className={cn(
                "absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-transform duration-700 group-hover:scale-150",
                product.color
            )} />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full flex-1">
                {/* Image Container - Maximized & Centered */}
                <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-cream-50 dark:bg-deepbrown-900/50 flex items-center justify-center group-hover:shadow-inner transition-all duration-500">
                    <motion.img
                        initial={{ scale: 0.95 }}
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        src={product.image || "https://placehold.co/400x400/png?text=No+Image"}
                        alt={product.name}
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://placehold.co/400x400/png?text=Image+Error";
                        }}
                        className="w-56 h-56 object-cover drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                    />
                    
                    {/* Flavor Tag Overlay */}
                    <div className="absolute top-4 left-4">
                        <span className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg",
                            product.color,
                            product.textColor
                        )}>
                            {product.flavor}
                        </span>
                    </div>
                </div>

                {/* Info - Refined Padding */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-4 flex-1">
                        <h3 className="text-2xl font-black text-deepbrown-900 dark:text-cream-50 mb-2 tracking-tight">{product.name}</h3>
                        <p className="text-sm text-deepbrown-500 dark:text-cream-200/60 font-medium line-clamp-2 leading-relaxed">{product.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="text-2xl font-black text-deepbrown-900 dark:text-cream-50">
                            {formatPrice(product.price)}
                        </span>
                        
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-deepbrown-900 dark:bg-terracotta-500 text-white p-4 rounded-2xl hover:bg-terracotta-500 dark:hover:bg-terracotta-400 transition-all shadow-xl active:scale-90 group-hover:rotate-6"
                        >
                            <Plus className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
