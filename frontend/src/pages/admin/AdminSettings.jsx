import React from 'react';
import { 
    User, 
    Lock, 
    Bell, 
    Moon, 
    Sun, 
    Shield, 
    Save,
    Mail,
    UserCircle
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const AdminSettings = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <AdminLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-black text-deepbrown-900 dark:text-cream-50">Pengaturan Dashboard</h1>
                <p className="text-deepbrown-500 dark:text-cream-200/50 mt-1 font-medium">Kelola profil admin dan preferensi tampilan Anda.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Left Column: Account Settings */}
                <div className="xl:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-deepbrown-800 rounded-[2.5rem] border border-deepbrown-50 dark:border-deepbrown-700 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-deepbrown-50 dark:border-deepbrown-700 flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                                <UserCircle className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-deepbrown-900 dark:text-cream-50">Profil Admin</h2>
                                <p className="text-xs text-deepbrown-400 dark:text-cream-200/40 font-bold uppercase tracking-widest">Informasi Dasar Akun</p>
                            </div>
                        </div>
                        
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest mb-3 ml-1">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-deepbrown-400" />
                                        <input 
                                            type="text" 
                                            defaultValue="Admin Ubi"
                                            className="w-full pl-12 pr-4 py-4 bg-cream-50 dark:bg-deepbrown-900 border-none rounded-2xl text-sm font-bold text-deepbrown-900 dark:text-cream-50 focus:ring-2 focus:ring-terracotta-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest mb-3 ml-1">
                                        Alamat Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-deepbrown-400" />
                                        <input 
                                            type="email" 
                                            defaultValue="admin@gmail.com"
                                            className="w-full pl-12 pr-4 py-4 bg-cream-50 dark:bg-deepbrown-900 border-none rounded-2xl text-sm font-bold text-deepbrown-900 dark:text-cream-50 focus:ring-2 focus:ring-terracotta-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest mb-3 ml-1">
                                    Jabatan / Role
                                </label>
                                <div className="relative">
                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-deepbrown-400" />
                                    <input 
                                        type="text" 
                                        defaultValue="Super Admin"
                                        disabled
                                        className="w-full pl-12 pr-4 py-4 bg-cream-50/50 dark:bg-deepbrown-900/50 border-none rounded-2xl text-sm font-bold text-deepbrown-400 dark:text-cream-200/20 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button className="flex items-center gap-2 px-8 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-2xl font-black transition-all shadow-lg shadow-terracotta-500/20 active:scale-95">
                                    <Save className="w-5 h-5" />
                                    <span>Simpan Perubahan</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-deepbrown-800 rounded-[2.5rem] border border-deepbrown-50 dark:border-deepbrown-700 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-deepbrown-50 dark:border-deepbrown-700 flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center">
                                <Lock className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-deepbrown-900 dark:text-cream-50">Keamanan</h2>
                                <p className="text-xs text-deepbrown-400 dark:text-cream-200/40 font-bold uppercase tracking-widest">Ubah Kata Sandi</p>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest mb-3 ml-1">
                                        Password Baru
                                    </label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="w-full px-6 py-4 bg-cream-50 dark:bg-deepbrown-900 border-none rounded-2xl text-sm font-bold text-deepbrown-900 dark:text-cream-50 focus:ring-2 focus:ring-terracotta-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest mb-3 ml-1">
                                        Konfirmasi Password
                                    </label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="w-full px-6 py-4 bg-cream-50 dark:bg-deepbrown-900 border-none rounded-2xl text-sm font-bold text-deepbrown-900 dark:text-cream-50 focus:ring-2 focus:ring-terracotta-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Preferences */}
                <div className="space-y-8">
                    <section className="bg-white dark:bg-deepbrown-800 rounded-[2.5rem] border border-deepbrown-50 dark:border-deepbrown-700 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-deepbrown-50 dark:border-deepbrown-700 flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
                                {theme === 'dark' ? <Moon className="w-6 h-6 text-purple-500" /> : <Sun className="w-6 h-6 text-yellow-500" />}
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-deepbrown-900 dark:text-cream-50">Tampilan</h2>
                                <p className="text-xs text-deepbrown-400 dark:text-cream-200/40 font-bold uppercase tracking-widest">Kustomisasi Mode</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center justify-between p-2 bg-cream-50 dark:bg-deepbrown-900 rounded-3xl gap-2">
                                <button 
                                    onClick={() => theme === 'dark' && toggleTheme()}
                                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black transition-all ${theme === 'light' ? 'bg-white text-deepbrown-900 shadow-sm' : 'text-cream-200/40 hover:text-cream-100'}`}
                                >
                                    <Sun className="w-5 h-5" />
                                    <span>Light</span>
                                </button>
                                <button 
                                    onClick={() => theme === 'light' && toggleTheme()}
                                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black transition-all ${theme === 'dark' ? 'bg-deepbrown-800 text-cream-50 shadow-sm' : 'text-deepbrown-400 hover:text-deepbrown-600'}`}
                                >
                                    <Moon className="w-5 h-5" />
                                    <span>Dark</span>
                                </button>
                            </div>

                            <div className="mt-6 p-4 bg-terracotta-50 dark:bg-terracotta-900/10 rounded-2xl border border-terracotta-100 dark:border-terracotta-900/20">
                                <p className="text-xs text-terracotta-600 dark:text-terracotta-400 font-medium leading-relaxed">
                                    Simpan mata Anda dengan beralih ke Dark Mode saat bekerja di malam hari.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-deepbrown-800 rounded-[2.5rem] border border-deepbrown-50 dark:border-deepbrown-700 shadow-sm overflow-hidden p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                                <Bell className="w-5 h-5 text-orange-500" />
                            </div>
                            <h3 className="font-black text-deepbrown-900 dark:text-cream-50">Notifikasi</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Email Pesanan Baru', active: true },
                                { label: 'Laporan Mingguan', active: false },
                                { label: 'Update Sistem', active: true }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-deepbrown-600 dark:text-cream-200/60">{item.label}</span>
                                    <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${item.active ? 'bg-terracotta-500' : 'bg-cream-200/50 dark:bg-deepbrown-700'}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
