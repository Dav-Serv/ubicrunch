import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    CheckCircle2, 
    Circle, 
    Clock, 
    Utensils, 
    Truck, 
    Check, 
    ArrowLeft,
    Package,
    Phone,
    MapPin
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { formatPrice } from '../lib/utils';

const OrderStatus = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    
    // In a real app, this would be fetched from the backend
    // and potentially polled or updated via WebSockets
    const [status, setStatus] = useState('pending');
    
    const statuses = [
        { id: 'pending', label: 'Order Created', icon: Clock, description: 'Your order has been placed and is waiting for confirmation.' },
        { id: 'confirmed', label: 'Diterima Resto', icon: CheckCircle2, description: 'The restaurant has accepted your order.' },
        { id: 'preparing', label: 'Sedang Dimasak', icon: Utensils, description: 'Chef is preparing your delicious meal.' },
        { id: 'on_delivery', label: 'Dikirim', icon: Truck, description: 'Your order is on the way to your location.' },
        { id: 'completed', label: 'Selesai', icon: Check, description: 'Order delivered. Enjoy your meal!' },
    ];

    const currentStatusIndex = statuses.findIndex(s => s.id === status);

    // Simulation: slowly advance status (only for demo purposes)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (status === 'pending') setStatus('confirmed');
            else if (status === 'confirmed') setStatus('preparing');
        }, 5000);
        return () => clearTimeout(timer);
    }, [status]);

    return (
        <Layout>
            <div className="container mx-auto px-6 py-10 max-w-4xl">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center text-deepbrown-500 hover:text-terracotta-500 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>

                <div className="bg-white dark:bg-deepbrown-800 rounded-3xl shadow-xl overflow-hidden border border-deepbrown-50 dark:border-deepbrown-700">
                    {/* Header */}
                    <div className="bg-linear-to-r from-terracotta-500 to-terracotta-600 p-8 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-terracotta-100 text-sm font-medium mb-1">Order Tracking</p>
                                <h1 className="text-3xl font-bold">#ORD-{orderId}</h1>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
                                {status.toUpperCase().replace('_', ' ')}
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Left Column: Timeline */}
                            <div className="md:col-span-2 space-y-8">
                                <h2 className="text-xl font-bold text-deepbrown-900 dark:text-cream-50">Order Status</h2>
                                
                                <div className="relative">
                                    {/* Vertical Line */}
                                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-deepbrown-700" />
                                    
                                    <div className="space-y-10 relative">
                                        {statuses.map((s, index) => {
                                            const isCompleted = index < currentStatusIndex;
                                            const isActive = index === currentStatusIndex;
                                            const Icon = s.icon;

                                            return (
                                                <div key={s.id} className="flex group">
                                                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-500 ${
                                                        isActive 
                                                            ? 'bg-terracotta-500 border-terracotta-100 dark:border-terracotta-900/50 text-white scale-110 shadow-lg shadow-terracotta-500/30' 
                                                            : isCompleted 
                                                                ? 'bg-green-500 border-green-100 dark:border-green-900/30 text-white' 
                                                                : 'bg-white dark:bg-deepbrown-800 border-gray-100 dark:border-deepbrown-700 text-gray-300 dark:text-gray-600'
                                                    }`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    
                                                    <div className="ml-6">
                                                        <h3 className={`font-bold transition-colors ${
                                                            isActive ? 'text-terracotta-600 dark:text-terracotta-400 text-lg' : 
                                                            isCompleted ? 'text-green-600 dark:text-green-500' : 'text-gray-400 dark:text-gray-600'
                                                        }`}>
                                                            {s.label}
                                                        </h3>
                                                        <p className={`text-sm mt-1 max-w-sm ${
                                                            isActive ? 'text-deepbrown-600 dark:text-cream-200' : 'text-gray-400 dark:text-gray-600'
                                                        }`}>
                                                            {s.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Info */}
                            <div className="space-y-8">
                                <div className="bg-cream-50 dark:bg-deepbrown-900/50 p-6 rounded-2xl border border-deepbrown-50 dark:border-deepbrown-800">
                                    <h3 className="font-bold text-deepbrown-900 dark:text-cream-50 mb-4 flex items-center">
                                        <Package className="w-4 h-4 mr-2 text-terracotta-500" />
                                        Delivery Details
                                    </h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-start">
                                            <MapPin className="w-4 h-4 mr-3 text-deepbrown-400 shrink-0 mt-0.5" />
                                            <p className="text-deepbrown-600 dark:text-cream-200">
                                                Jl. Kuningan Mulia No.1, RT.6/RW.1, Guntur, Kecamatan Setiabudi, Kota Jakarta Selatan, 12980
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 mr-3 text-deepbrown-400 shrink-0" />
                                            <p className="text-deepbrown-600 dark:text-cream-200">0812-3456-7890</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-cream-50 dark:bg-deepbrown-900/50 p-6 rounded-2xl border border-deepbrown-50 dark:border-deepbrown-800">
                                    <h3 className="font-bold text-deepbrown-900 dark:text-cream-50 mb-4">Payment Method</h3>
                                    <div className="flex items-center p-3 bg-white dark:bg-deepbrown-800 rounded-xl border border-deepbrown-100 dark:border-deepbrown-700">
                                        <div className="w-10 h-10 bg-terracotta-100 dark:bg-terracotta-900/30 rounded-lg flex items-center justify-center mr-3">
                                            <CheckCircle2 className="w-5 h-5 text-terracotta-500" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-deepbrown-900 dark:text-cream-50 text-sm">Cash on Delivery</p>
                                            <p className="text-xs text-deepbrown-500">Bayar saat sampai</p>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    className="w-full py-4 bg-deepbrown-900 dark:bg-deepbrown-700 text-white font-bold rounded-xl hover:bg-deepbrown-800 dark:hover:bg-deepbrown-600 transition-all flex items-center justify-center"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderStatus;
