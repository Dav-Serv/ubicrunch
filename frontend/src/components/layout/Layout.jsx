import React from 'react';
import Navbar from './Navbar';
import CartDrawer from '../cart/CartDrawer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen font-sans bg-cream-50 dark:bg-deepbrown-900 text-deepbrown-900 selection:bg-terracotta-200 transition-colors duration-300">
            <Navbar />
            <CartDrawer />
            <main className="pt-20">
                {children}
            </main>
            <footer className="bg-deepbrown-900 dark:bg-black text-white py-12 mt-20 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-2xl font-bold font-sans dark:text-cream-100">Ubi<span className="text-terracotta-500">Crunch</span>.</h2>
                            <p className="text-deepbrown-200 dark:text-gray-400 mt-2">Premium Sweet Potato Chips</p>
                        </div>
                        <div className="flex space-x-8">
                            <a href="#" className="hover:text-terracotta-500 dark:hover:text-terracotta-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-terracotta-500 dark:hover:text-terracotta-400 transition-colors">Terms</a>
                            <a href="#" className="hover:text-terracotta-500 dark:hover:text-terracotta-400 transition-colors">Instagram</a>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-deepbrown-800 dark:border-gray-800 text-center text-deepbrown-400 dark:text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} UbiCrunch. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
