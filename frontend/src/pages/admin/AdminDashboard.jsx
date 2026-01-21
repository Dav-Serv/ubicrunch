import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import CustomerTable from '../../components/admin/CustomerTable';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProduk: 0,
        frekuensiPenjualan: 0,
        totalPenjualan: 0
    });

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Simulating data fetch
        const timer = setTimeout(() => {
            setStats({
                totalProduk: 120,
                frekuensiPenjualan: 450,
                totalPenjualan: 15000000
            });

            setCustomers([
                { nama: 'Rafly Hermansyah', telepon: '081234567890', alamat: 'Jl. Merdeka No. 10, Jakarta Pusat', status: 'Selesai' },
                { nama: 'Zaki Ahmad', telepon: '089876543210', alamat: 'Komp. Melati Blok B3, Tangerang', status: 'Proses' },
                { nama: 'Putri Salsa', telepon: '085512345678', alamat: 'Apartemen Green Park Lt. 5, Bekasi', status: 'Selesai' },
                { nama: 'Budi Santoso', telepon: '081122334455', alamat: 'Jl. Mawar Indah 2, Depok', status: 'Batal' },
                { nama: 'Lutfi Hakim', telepon: '087788990011', alamat: 'Perum Gading Serpong, Tangerang', status: 'Proses' },
            ]);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    return (
        <AdminLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-black text-deepbrown-900 dark:text-cream-50">Dashboard Overview</h1>
                <p className="text-deepbrown-500 dark:text-cream-200/50 mt-1 font-medium">Monitoring performa toko Anda hari ini.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <StatCard 
                    title="Total Produk" 
                    value={`${stats.totalProduk} Produk`} 
                    icon={Package} 
                    bgClass="bg-blue-50 dark:bg-blue-900/20"
                    colorClass="text-blue-500"
                    index={0}
                />
                <StatCard 
                    title="Frekuensi Penjualan" 
                    value={`${stats.frekuensiPenjualan} Transaksi`} 
                    icon={ShoppingCart} 
                    bgClass="bg-purple-50 dark:bg-purple-900/20"
                    colorClass="text-purple-500"
                    index={1}
                />
                <StatCard 
                    title="Total Penjualan" 
                    value={formatRupiah(stats.totalPenjualan)} 
                    icon={DollarSign} 
                    bgClass="bg-terracotta-50 dark:bg-terracotta-900/20"
                    colorClass="text-terracotta-500"
                    index={2}
                />
            </div>

            {/* Customer Table Section */}
            <div className="bg-white dark:bg-deepbrown-800 rounded-[2.5rem] shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 overflow-hidden">
                <div className="p-8 border-b border-deepbrown-50 dark:border-deepbrown-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cream-50 dark:bg-deepbrown-900 rounded-2xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-terracotta-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-deepbrown-900 dark:text-cream-50">Data Pelanggan</h2>
                            <p className="text-xs text-deepbrown-400 dark:text-cream-200/40 font-bold uppercase tracking-widest mt-0.5">Transaksi Terbaru</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-terracotta-500/20">
                        Lihat Semua
                    </button>
                </div>
                
                <CustomerTable data={customers} />
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
