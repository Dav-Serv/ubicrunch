import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import ProductGrid from '../components/products/ProductGrid';

import About from '../components/home/About';
import Contact from '../components/home/Contact';

const Home = () => {
    return (
        <Layout>
            <Hero />
            <ProductGrid />
            <About />
            
            {/* Value Proposition Section */}
            <section className="py-20 bg-white dark:bg-deepbrown-900 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-terracotta-50 dark:bg-terracotta-900/20 rounded-2xl text-center border border-transparent dark:border-terracotta-900/50">
                            <div className="text-4xl mb-4">🌿</div>
                            <h3 className="text-xl font-bold text-deepbrown-900 dark:text-cream-50 mb-2">100% Natural</h3>
                            <p className="text-deepbrown-600 dark:text-cream-200/70">No preservatives, just pure sweet potato goodness.</p>
                        </div>
                        <div className="p-8 bg-cream-100 dark:bg-deepbrown-800/50 rounded-2xl text-center border border-transparent dark:border-deepbrown-700">
                            <div className="text-4xl mb-4">🔥</div>
                            <h3 className="text-xl font-bold text-deepbrown-900 dark:text-cream-50 mb-2">Vacuum Fried</h3>
                            <p className="text-deepbrown-600 dark:text-cream-200/70">Locked in nutrients and natural sweetness with less oil.</p>
                        </div>
                        <div className="p-8 bg-deepbrown-50 dark:bg-deepbrown-900/50 rounded-2xl text-center border border-transparent dark:border-deepbrown-800">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-xl font-bold text-deepbrown-900 dark:text-cream-50 mb-2">Premium Quality</h3>
                            <p className="text-deepbrown-600 dark:text-cream-200/70">Handpicked organic sweet potatoes from local farmers.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
        </Layout>
    );
};

export default Home;
