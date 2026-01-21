import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn, formatPrice } from '../../lib/utils';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-white dark:bg-deepbrown-800 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-deepbrown-50 dark:border-deepbrown-700 overflow-hidden"
        >
            {/* Background Blob */}
            <div className={cn(
                "absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-transform duration-500 group-hover:scale-150",
                product.color
            )} />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Flavor Tag */}
                <div className="mb-4">
                    <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                        product.color,
                        product.textColor
                    )}>
                        {product.flavor}
                    </span>
                </div>

                {/* Image */}
                <div className="flex-1 flex items-center justify-center py-6">
                    <motion.img
                        initial={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        src={product.image}
                        alt={product.name}
                        className="w-48 object-contain drop-shadow-lg"
                    />
                </div>

                {/* Info */}
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-deepbrown-900 dark:text-cream-50 mb-1">{product.name}</h3>
                    <p className="text-sm text-deepbrown-500 dark:text-cream-200/70 line-clamp-2 mb-4">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-deepbrown-900 dark:text-cream-100">
                            {formatPrice(product.price)}
                        </span>
                        
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-deepbrown-900 dark:bg-terracotta-500 text-white p-3 rounded-full hover:bg-terracotta-500 dark:hover:bg-terracotta-400 transition-colors shadow-lg active:scale-90"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
