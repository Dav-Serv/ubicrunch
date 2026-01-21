import React, { useState } from 'react';
import { 
    ShoppingCart, 
    TrendingUp, 
    Calendar, 
    Search, 
    Filter, 
    Download,
    CheckCircle2,
    Clock,
    XCircle,
    User,
    Phone,
    MapPin
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { formatPrice } from '../../lib/utils';
import { motion } from 'framer-motion';

const AdminSales = () => {
    // Mock data for sales/orders
    const [orders, setOrders] = useState([
        { id: '8821', customer: 'Rafly Hermansyah', phone: '081234567890', address: 'Jl. Merdeka No. 10, Jakarta', total: 45000, status: 'Proses', date: '21 Jan, 11:00 AM' },
        { id: '8822', customer: 'Zaki Ahmad', phone: '089876543210', address: 'Komp. Melati Blok B3, Tangerang', total: 120000, status: 'Selesai', date: '21 Jan, 10:45 AM' },
        { id: '8823', customer: 'Putri Salsa', phone: '085512345678', address: 'Apartemen Green Lt. 5, Bekasi', total: 35000, status: 'Batal', date: '21 Jan, 10:20 AM' },
        { id: '8824', customer: 'Lutfi Hakim', phone: '087788990011', address: 'Perum Gading Serpong, Tangerang', total: 85000, status: 'Proses', date: '21 Jan, 09:50 AM' },
        { id: '8825', customer: 'Budi Santoso', phone: '081122334455', address: 'Jl. Mawar Indah 2, Depok', total: 55000, status: 'Selesai', date: '20 Jan, 08:30 PM' },
    ]);

    const updateStatus = (orderId, newStatus) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Selesai': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            case 'Proses': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Batal': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    // Calculate Summary (Rekap)
    const totalRevenue = orders.reduce((sum, order) => order.status === 'Selesai' ? sum + order.total : sum, 0);
    const completedOrders = orders.filter(o => o.status === 'Selesai').length;
    const processingOrders = orders.filter(o => o.status === 'Proses').length;

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-deepbrown-900 dark:text-cream-50">Laporan Penjualan</h1>
                    <p className="text-deepbrown-500 dark:text-cream-200/50 mt-1 font-medium">Rekapitulasi dan manajemen status pesanan.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-4 bg-deepbrown-900 dark:bg-deepbrown-800 text-white rounded-2xl font-black transition-all hover:bg-terracotta-500 shadow-xl active:scale-95">
                    <Download className="w-5 h-5" />
                    <span>Download Rekap</span>
                </button>
            </div>

            {/* Sales Recap Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-white dark:bg-deepbrown-800 p-6 rounded-4xl border border-deepbrown-50 dark:border-deepbrown-700 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <TrendingUp className="w-32 h-32" />
                    </div>
                    <p className="text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest">Total Pendapatan</p>
                    <p className="text-3xl font-black text-deepbrown-900 dark:text-cream-50 mt-2">{formatPrice(totalRevenue)}</p>
                    <div className="mt-4 flex items-center gap-2 text-green-500 text-xs font-bold">
                        <TrendingUp className="w-4 h-4" />
                        <span>Realized Revenue</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-deepbrown-800 p-6 rounded-4xl border border-deepbrown-50 dark:border-deepbrown-700 shadow-sm">
                    <p className="text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest">Pesanan Selesai</p>
                    <p className="text-3xl font-black text-deepbrown-900 dark:text-cream-50 mt-2">{completedOrders}</p>
                    <div className="mt-4 flex items-center gap-2 text-deepbrown-500 dark:text-cream-200/40 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Transaksi Berhasil</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-deepbrown-800 p-6 rounded-4xl border border-deepbrown-50 dark:border-deepbrown-700 shadow-sm">
                    <p className="text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest">Dalam Proses</p>
                    <p className="text-3xl font-black text-deepbrown-900 dark:text-cream-50 mt-2">{processingOrders}</p>
                    <div className="mt-4 flex items-center gap-2 text-deepbrown-500 dark:text-cream-200/40 text-xs font-bold">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span>Butuh Tindakan</span>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-deepbrown-800 rounded-[2.5rem] shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 overflow-hidden">
                <div className="p-8 border-b border-deepbrown-50 dark:border-deepbrown-700 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-black text-deepbrown-900 dark:text-cream-50">Daftar Transaksi</h2>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-deepbrown-400" />
                            <input 
                                type="text"
                                placeholder="Cari pelanggan..."
                                className="pl-10 pr-4 py-3 bg-cream-50 dark:bg-deepbrown-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-terracotta-500 transition-all w-full dark:text-cream-50"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead className="bg-cream-50 dark:bg-deepbrown-900/50 text-[10px] uppercase font-black tracking-[0.2em] text-deepbrown-400 dark:text-cream-200/40">
                            <tr>
                                <th className="px-8 py-5">Pelanggan</th>
                                <th className="px-8 py-5">Info Kontak</th>
                                <th className="px-8 py-5">Alamat</th>
                                <th className="px-8 py-5">Total</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Update Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-deepbrown-50 dark:divide-deepbrown-700">
                            {orders.map((order, index) => (
                                <motion.tr 
                                    key={order.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group hover:bg-cream-50/50 dark:hover:bg-deepbrown-700/50 transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-cream-100 dark:bg-deepbrown-900 rounded-full flex items-center justify-center text-terracotta-500">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-black text-deepbrown-900 dark:text-cream-50 leading-tight">{order.customer}</p>
                                                <p className="text-[10px] text-deepbrown-400 uppercase font-black mt-1">Order #DC-{order.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-deepbrown-600 dark:text-cream-200/60 font-medium">
                                            <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                                            <span>{order.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-start gap-2 max-w-[200px]">
                                            <MapPin className="w-3.5 h-3.5 text-terracotta-500 mt-1 shrink-0" />
                                            <span className="text-sm text-deepbrown-600 dark:text-cream-200/60 leading-tight">{order.address}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-black text-deepbrown-900 dark:text-cream-50">{formatPrice(order.total)}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => updateStatus(order.id, 'Proses')}
                                                className={`p-2 rounded-xl transition-all ${order.status === 'Proses' ? 'bg-yellow-500 text-white' : 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white'}`}
                                                title="Set ke Proses"
                                            >
                                                <Clock className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(order.id, 'Selesai')}
                                                className={`p-2 rounded-xl transition-all ${order.status === 'Selesai' ? 'bg-green-500 text-white' : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'}`}
                                                title="Set ke Selesai"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(order.id, 'Batal')}
                                                className={`p-2 rounded-xl transition-all ${order.status === 'Batal' ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}
                                                title="Set ke Batal"
                                            >
                                                <XCircle className="w-4 h-4" />
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

export default AdminSales;
