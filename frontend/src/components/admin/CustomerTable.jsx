import React from 'react';

const CustomerTable = ({ data }) => {
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'selesai':
                return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            case 'proses':
                return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'batal':
                return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
                <thead className="bg-cream-50 dark:bg-deepbrown-900/50 text-[10px] uppercase font-black tracking-[0.2em] text-deepbrown-400 dark:text-cream-200/40">
                    <tr>
                        <th className="px-4 md:px-8 py-4 md:py-5">Nama Pelanggan</th>
                        <th className="px-4 md:px-8 py-4 md:py-5">No. Telepon</th>
                        <th className="px-4 md:px-8 py-4 md:py-5">Alamat</th>
                        <th className="px-4 md:px-8 py-4 md:py-5 text-center">Status Order</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-deepbrown-50 dark:divide-deepbrown-700">
                    {data.map((item, index) => (
                        <tr key={index} className="group hover:bg-cream-50/50 dark:hover:bg-deepbrown-700/50 transition-colors">
                            <td className="px-4 md:px-8 py-4 md:py-6 font-bold text-sm md:text-base text-deepbrown-900 dark:text-cream-50">{item.nama}</td>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-deepbrown-600 dark:text-cream-200/70 font-medium text-sm">{item.telepon}</td>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-deepbrown-600 dark:text-cream-200/70 text-xs md:text-sm max-w-[200px] md:max-w-[250px] truncate">{item.alamat}</td>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                                <span className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-wider shadow-sm ${getStatusStyle(item.status)}`}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
