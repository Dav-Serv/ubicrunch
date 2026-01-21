import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const About = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section id="about" className="py-20 bg-cream-100 dark:bg-deepbrown-800 transition-colors duration-300 overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-100 dark:bg-terracotta-900/30 rounded-bl-full opacity-50" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-deepbrown-100 dark:bg-black/20 rounded-tr-full opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* Image Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 relative"
                    >
                        <div className="relative w-full max-w-[500px] overflow-hidden bg-transparent mx-auto md:mx-0">
                            <img 
                                src="/images/about-logo.png" 
                                alt="Deep Choc Ubi Logo" 
                                className="w-full h-[500px] object-contain hover:scale-105 transition-transform duration-700"
                            />
                            {/* Floating Stats */}
                            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                                <p className="text-3xl font-bold text-terracotta-500">100%</p>
                                <p className="text-sm font-medium text-deepbrown-900">Organic Sweet Potato</p>
                            </div>
                        </div>
                        {/* Blob Backing */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-terracotta-200 rounded-[2rem] transform -rotate-3" />
                    </motion.div>

                    {/* Content Side */}
                    <div className="md:w-1/2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="text-terracotta-500 font-bold tracking-wider uppercase text-sm">Our Story</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-deepbrown-900 dark:text-cream-50 mt-2 mb-6">
                                Redefining the <span className="text-gradient">Snack Experience</span>
                            </h2>
                            <p className="text-lg text-deepbrown-600 dark:text-cream-200/80 leading-relaxed mb-6">
                                Deep Chock Ubi starts with a simple mission: to bring the authentic sweetness of local Indonesian sweet potatoes to the world, packaged in a modern, healthy, and crunchy delight. 
                            </p>
                            
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-deepbrown-600 dark:text-cream-200/80 leading-relaxed mb-4">
                                            We partner directly with local farmers in Cisarua to select only the best organic sweet potatoes. Processed with vacuum frying technology, we ensure every chip retains its nutrients, fiber, and vibrant naturally-occuring color without excess oil or high heat degradation.
                                        </p>
                                        <p className="text-deepbrown-600 dark:text-cream-200/80 leading-relaxed">
                                            Our commitment goes beyond snacks. By supporting local agriculture, we ensure a sustainable ecosystem that benefits both the environment and the dedicated hands that cultivate our premium ingredients.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.ul 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-4"
                        >
                            <li className="flex items-center space-x-3">
                                <CheckCircle2 className="w-6 h-6 text-terracotta-500" />
                                <span className="text-deepbrown-800 dark:text-cream-100 font-medium">Sourced from sustainable local farms</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <CheckCircle2 className="w-6 h-6 text-terracotta-500" />
                                <span className="text-deepbrown-800 dark:text-cream-100 font-medium">No artificial preservatives or MSG</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <CheckCircle2 className="w-6 h-6 text-terracotta-500" />
                                <span className="text-deepbrown-800 dark:text-cream-100 font-medium">Vacuum fried for less oil & more crunch</span>
                            </li>
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="pt-6"
                        >
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="group px-8 py-3 bg-deepbrown-900 border-2 border-deepbrown-900 text-white rounded-full font-bold hover:bg-transparent hover:text-deepbrown-900 dark:hover:text-cream-50 dark:hover:border-cream-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
