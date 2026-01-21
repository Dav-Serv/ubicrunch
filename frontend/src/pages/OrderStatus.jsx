import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Clock, XCircle, ArrowLeft, MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import Layout from '../components/layout/Layout';
import api from '../api/api';
import { formatPrice } from '../lib/utils';

const OrderStatus = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, [code]);

    const fetchOrder = async () => {
        try {
            const response = await api.get(`/order/${code}`);
            setOrder(response.data);
            setLoading(false);
        } catch (err) {
            setError('Pesanan tidak ditemukan');
            setLoading(false);
        }
    };

    const getStatusInfo = (status) => {
        const statusMap = {
            pending: { label: 'Menunggu Konfirmasi', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
            processing: { label: 'Sedang Diproses', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            completed: { label: 'Selesai', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
            cancelled: { label: 'Dibatalkan', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' }
        };
        return statusMap[status] || statusMap.pending;
    };

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-6 py-20 text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-terracotta-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-4 text-deepbrown-600 dark:text-cream-200">Memuat pesanan...</p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="container mx-auto px-6 py-20 text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-deepbrown-900 dark:text-cream-50 mb-2">{error}</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 px-6 py-3 bg-terracotta-500 text-white rounded-xl font-bold hover:bg-terracotta-600 transition-all"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </Layout>
        );
    }

    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;

    return (
        <Layout>
            <div className="container mx-auto px-6 py-10">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-deepbrown-600 dark:text-cream-200 hover:text-terracotta-500 transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Kembali ke Beranda</span>
                </button>

                <div className="max-w-4xl mx-auto">
                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 mb-8 text-center"
                    >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-deepbrown-900 dark:text-cream-50 mb-2">
                            Pesanan Berhasil Dibuat!
                        </h1>
                        <p className="text-deepbrown-600 dark:text-cream-200/80">
                            Kode Pesanan: <span className="font-bold text-terracotta-600 dark:text-terracotta-400">{order.order_code}</span>
                        </p>
                    </motion.div>

                    {/* Order Status */}
                    <div className="bg-white dark:bg-deepbrown-800 rounded-2xl p-6 shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 mb-8">
                        <h2 className="text-xl font-bold text-deepbrown-900 dark:text-cream-50 mb-4">Status Pesanan</h2>
                        <div className={`flex items-center gap-4 p-4 ${statusInfo.bg} rounded-xl`}>
                            <StatusIcon className={`w-8 h-8 ${statusInfo.color}`} />
                            <div>
                                <p className={`font-bold ${statusInfo.color}`}>{statusInfo.label}</p>
                                <p className="text-sm text-deepbrown-500 dark:text-cream-200/60">
                                    {new Date(order.created_at).toLocaleDateString('id-ID', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white dark:bg-deepbrown-800 rounded-2xl p-6 shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 mb-8">
                        <h2 className="text-xl font-bold text-deepbrown-900 dark:text-cream-50 mb-4">Detail Pesanan</h2>
                        <div className="space-y-4">
                            {order.items?.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b border-deepbrown-100 dark:border-deepbrown-700 pb-4 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-bold text-deepbrown-900 dark:text-cream-50">{item.menu_name}</p>
                                        <p className="text-sm text-deepbrown-500 dark:text-cream-200/60">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-deepbrown-900 dark:text-cream-50">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-deepbrown-200 dark:border-deepbrown-700">
                                <div className="flex justify-between text-deepbrown-600 dark:text-cream-200 mb-2">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(order.total - 15000)}</span>
                                </div>
                                <div className="flex justify-between text-deepbrown-600 dark:text-cream-200 mb-2">
                                    <span>Ongkir</span>
                                    <span>Rp 15.000</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-deepbrown-900 dark:text-cream-50 pt-2 border-t border-deepbrown-100 dark:border-deepbrown-700">
                                    <span>Total</span>
                                    <span>{formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping & Payment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-deepbrown-800 rounded-2xl p-6 shadow-sm border border-deepbrown-50 dark:border-deepbrown-700">
                            <h3 className="text-lg font-bold text-deepbrown-900 dark:text-cream-50 mb-4">Informasi Pengiriman</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-terracotta-500 mt-1" />
                                    <div>
                                        <p className="font-medium text-deepbrown-900 dark:text-cream-50">{order.customer_name}</p>
                                        <p className="text-sm text-deepbrown-600 dark:text-cream-200/80">{order.shipping_address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-terracotta-500" />
                                    <p className="text-sm text-deepbrown-600 dark:text-cream-200/80">{order.customer_phone}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-terracotta-500" />
                                    <p className="text-sm text-deepbrown-600 dark:text-cream-200/80">{order.customer_email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-deepbrown-800 rounded-2xl p-6 shadow-sm border border-deepbrown-50 dark:border-deepbrown-700">
                            <h3 className="text-lg font-bold text-deepbrown-900 dark:text-cream-50 mb-4">Metode Pembayaran</h3>
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-terracotta-500" />
                                <p className="font-medium text-deepbrown-900 dark:text-cream-50 capitalize">{order.payment_method}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderStatus;
