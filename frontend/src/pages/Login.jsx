import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await api.post('/login', { email, password });
            const { token, user } = response.data;
            
            // Store token and user data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            // Success redirect
            navigate('/admin');
        } catch (error) {
            console.error('Login failed:', error);
            alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-deepbrown-900 flex items-center justify-center p-6 selection:bg-terracotta-500/30 font-sans">
            {/* Background decorative blur */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cream-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[480px] bg-deepbrown-800 border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative z-10"
            >
                {/* Header Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-linear-to-br from-terracotta-400 to-terracotta-600 rounded-3xl flex items-center justify-center shadow-lg shadow-terracotta-500/20">
                        <LogIn className="w-10 h-10 text-white" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-cream-50 mb-2">Selamat Datang</h1>
                    <p className="text-cream-200/60 font-medium">Silakan masuk untuk melanjutkan</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-cream-200 mb-3 ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cream-500 group-focus-within:text-terracotta-400 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input 
                                type="email"
                                name="email"
                                defaultValue="admin@foodapp.test"
                                className="w-full bg-cream-50 border-none rounded-2xl py-4 pl-12 pr-4 text-deepbrown-900 font-bold placeholder:text-deepbrown-300 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 transition-all shadow-inner"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-cream-200 mb-3 ml-1">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cream-500 group-focus-within:text-terracotta-400 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input 
                                type="password"
                                name="password"
                                defaultValue="password"
                                className="w-full bg-cream-50 border-none rounded-2xl py-4 pl-12 pr-4 text-deepbrown-900 font-bold placeholder:text-deepbrown-300 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 transition-all shadow-inner"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-extrabold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-terracotta-500/25 active:scale-[0.98]"
                        >
                            <span>Masuk Sekarang</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-10">
                    <p className="text-cream-200/60 font-medium">
                        Belum punya akun? <button className="text-terracotta-400 hover:text-terracotta-300 font-bold transition-colors">Daftar disini</button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
