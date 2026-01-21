import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { products as initialProducts } from '../../data/products';
import { formatPrice } from '../../lib/utils';
import { motion } from 'framer-motion';

const AdminProducts = () => {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-deepbrown-900 dark:text-cream-50">Manajemen Produk</h1>
                    <p className="text-deepbrown-500 dark:text-cream-200/50 mt-1 font-medium">Kelola katalog produk, harga, dan deskripsi Anda.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-2xl font-black transition-all shadow-lg shadow-terracotta-500/20 active:scale-95">
                    <Plus className="w-5 h-5" />
                    <span>Tambah Produk</span>
                </button>
            </div>

            {/* Filter and Search */}
            <div className="bg-white dark:bg-deepbrown-800 p-4 rounded-3xl shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-deepbrown-400" />
                    <input 
                        type="text"
                        placeholder="Cari nama produk..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-cream-50 dark:bg-deepbrown-900 border-none rounded-2xl text-deepbrown-900 dark:text-cream-50 focus:ring-2 focus:ring-terracotta-500/50 transition-all font-medium"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-4 bg-cream-50 dark:bg-deepbrown-900 text-deepbrown-600 dark:text-cream-200 rounded-2xl font-bold hover:bg-terracotta-500 hover:text-white transition-all">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                </button>
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-deepbrown-800 rounded-[2.5rem] shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-cream-50 dark:bg-deepbrown-900/50 text-[10px] uppercase font-black tracking-[0.2em] text-deepbrown-400 dark:text-cream-200/40">
                            <tr>
                                <th className="px-8 py-6">Produk</th>
                                <th className="px-8 py-6">Deskripsi</th>
                                <th className="px-8 py-6">Harga</th>
                                <th className="px-8 py-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-deepbrown-50 dark:divide-deepbrown-700">
                            {filteredProducts.map((product, index) => (
                                <motion.tr 
                                    key={product.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group hover:bg-cream-50/50 dark:hover:bg-deepbrown-700/50 transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-cream-100 dark:bg-deepbrown-900 shrink-0 border border-deepbrown-50 dark:border-white/5">
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.target.src = 'https://placehold.co/400x400/png?text=Product';
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-black text-deepbrown-900 dark:text-cream-50">{product.name}</p>
                                                <p className="text-xs text-terracotta-500 font-bold uppercase tracking-wider">{product.flavor}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm text-deepbrown-500 dark:text-cream-200/60 line-clamp-2 max-w-[300px] leading-relaxed">
                                            {product.description}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-black text-deepbrown-900 dark:text-cream-50">{formatPrice(product.price)}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProducts;
