import React, { useState, useEffect } from 'react';
import { Mail, Search, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../api/api';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await api.get('/admin/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMessages = messages.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-deepbrown-900 dark:text-cream-50">Pesan Masuk</h1>
                    <p className="text-deepbrown-500 dark:text-cream-200/50 mt-1 font-medium">
                        Kelola pesan dari formulir kontak.
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-deepbrown-400" />
                <input 
                    type="text" 
                    placeholder="Cari pesan berdasarkan nama, email, atau subjek..." 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-deepbrown-50 dark:border-deepbrown-700 bg-white dark:bg-deepbrown-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Messages Table */}
            <div className="bg-white dark:bg-deepbrown-800 rounded-[2.5rem] shadow-sm border border-deepbrown-50 dark:border-deepbrown-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-cream-50 dark:bg-deepbrown-900 border-b border-deepbrown-50 dark:border-deepbrown-700">
                            <tr>
                                <th className="px-8 py-6 text-left text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest">Pengirim</th>
                                <th className="px-8 py-6 text-left text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest">Subjek</th>
                                <th className="px-8 py-6 text-left text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest">Pesan</th>
                                <th className="px-8 py-6 text-left text-xs font-black text-deepbrown-400 dark:text-cream-200/40 uppercase tracking-widest">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-deepbrown-50 dark:divide-deepbrown-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-8 text-center text-deepbrown-500">Memuat pesan...</td>
                                </tr>
                            ) : filteredMessages.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-8 text-center text-deepbrown-500">Tidak ada pesan ditemukan.</td>
                                </tr>
                            ) : (
                                filteredMessages.map((msg) => (
                                    <tr key={msg.id} className="hover:bg-cream-50/50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-terracotta-100 dark:bg-terracotta-900/30 rounded-full flex items-center justify-center text-terracotta-600 dark:text-terracotta-400 font-bold text-sm">
                                                    {msg.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-deepbrown-900 dark:text-cream-50">{msg.name}</div>
                                                    <div className="text-sm text-deepbrown-500 dark:text-cream-200/60">{msg.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-medium text-deepbrown-900 dark:text-cream-50">{msg.subject}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm text-deepbrown-600 dark:text-cream-200/80 max-w-xs truncate" title={msg.message}>
                                                {msg.message}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-deepbrown-500 dark:text-cream-200/60 font-medium">
                                            {formatDate(msg.created_at)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminMessages;
