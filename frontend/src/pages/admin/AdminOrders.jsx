import React, { useState, useEffect } from 'react';
import { Package, Search, Eye, CheckCircle, Clock, XCircle, Filter as FilterIcon } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../api/api';
import { formatPrice } from '../../lib/utils';
import { motion } from 'framer-motion';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/admin/order');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.post(`/admin/order-status/${orderId}`, { status: newStatus });
            // Refresh orders
            fetchOrders();
            alert('Status pesanan berhasil diupdate!');
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Gagal update status pesanan');
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.order_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const badges = {
            pending: { label: 'Pending', bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' },
            processing: { label: 'Processing', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' },
            completed: { label: 'Completed', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' },
            cancelled: { label: 'Cancelled', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' }
        };
        return badges[status] || badges.pending;
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin w-12 h-12 border-4 border-terracotta-500 border-t-transparent rounded-full"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-deepbrown-900 dark:text-cream-50">Manajemen Pesanan</h1>
                    <p className="text-sm md:text-base text-deepbrown-500 dark:text-cream-200/50 mt-1 font-medium">Kelola semua pesanan pelanggan</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white dark:bg-deepbrown-800 p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 flex flex-col md:flex-row gap-4 mb-6 md:mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-deepbrown-400" />
                    <input 
                        type="text"
                        placeholder="Cari kode pesanan atau nama customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 md:py-4 bg-cream-50 dark:bg-deepbrown-900 border-none rounded-xl md:rounded-2xl text-sm md:text-base text-deepbrown-900 dark:text-cream-50 focus:ring-2 focus:ring-terracotta-500/50 transition-all font-medium"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-6 py-3 md:py-4 bg-cream-50 dark:bg-deepbrown-900 text-deepbrown-600 dark:text-cream-200 rounded-xl md:rounded-2xl font-bold border-none focus:ring-2 focus:ring-terracotta-500/50 text-sm md:text-base"
                >
                    <option value="all">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-deepbrown-800 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-cream-50 dark:bg-deepbrown-900/50 text-[10px] uppercase font-black tracking-[0.2em] text-deepbrown-400 dark:text-cream-200/40">
                            <tr>
                                <th className="px-4 md:px-8 py-4 md:py-6">Kode Pesanan</th>
                                <th className="px-4 md:px-8 py-4 md:py-6">Customer</th>
                                <th className="px-4 md:px-8 py-4 md:py-6">Total</th>
                                <th className="px-4 md:px-8 py-4 md:py-6">Status</th>
                                <th className="px-4 md:px-8 py-4 md:py-6">Tanggal</th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-deepbrown-50 dark:divide-deepbrown-700">
                            {filteredOrders.map((order, index) => {
                                const badge = getStatusBadge(order.status);
                                return (
                                    <motion.tr 
                                        key={order.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-cream-50/50 dark:hover:bg-deepbrown-700/50 transition-colors"
                                    >
                                        <td className="px-4 md:px-8 py-4 md:py-6">
                                            <p className="font-black text-sm md:text-base text-terracotta-600 dark:text-terracotta-400">{order.order_code}</p>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-6">
                                            <p className="font-bold text-sm md:text-base text-deepbrown-900 dark:text-cream-50">{order.customer_name}</p>
                                            <p className="text-[10px] md:text-xs text-deepbrown-500 dark:text-cream-200/60">{order.customer_email}</p>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-6">
                                            <p className="font-black text-sm md:text-base text-deepbrown-900 dark:text-cream-50">{formatPrice(order.total)}</p>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-6">
                                            <span className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold ${badge.bg} ${badge.text}`}>
                                                {badge.label}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-6">
                                            <p className="text-xs md:text-sm text-deepbrown-600 dark:text-cream-200/80">
                                                {new Date(order.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="px-2 md:px-3 py-1.5 md:py-2 bg-cream-50 dark:bg-deepbrown-900 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold border-none focus:ring-2 focus:ring-terracotta-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-deepbrown-300 dark:text-deepbrown-600 mx-auto mb-4" />
                        <p className="text-deepbrown-500 dark:text-cream-200/50 font-medium">
                            {searchTerm || filterStatus !== 'all' ? 'Tidak ada pesanan yang cocok' : 'Belum ada pesanan'}
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;
