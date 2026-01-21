import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-white dark:bg-deepbrown-900 transition-colors duration-300 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-terracotta-500 font-bold tracking-wider uppercase text-sm">Get in Touch</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-deepbrown-900 dark:text-cream-50 mt-2">
                        We'd Love to <span className="text-gradient">Hear From You</span>
                    </h2>
                    <p className="text-lg text-deepbrown-600 dark:text-cream-200/80 mt-4">
                        Have a question about our flavors? Want to partner with us? Or just want to say hi? Drop us a message!
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/3 space-y-8 bg-cream-50 dark:bg-deepbrown-800 p-8 rounded-3xl h-fit border border-deepbrown-50 dark:border-deepbrown-700"
                    >
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-white dark:bg-deepbrown-700 rounded-xl shadow-sm text-terracotta-500">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-deepbrown-900 dark:text-cream-50 text-lg">Our HQ</h3>
                                    <p className="text-deepbrown-600 dark:text-cream-200/80">Jl. Raya Cisarua No. 45<br/>Bogor, Jawa Barat 16750</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-white dark:bg-deepbrown-700 rounded-xl shadow-sm text-terracotta-500">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-deepbrown-900 dark:text-cream-50 text-lg">Email Us</h3>
                                    <p className="text-deepbrown-600 dark:text-cream-200/80">hello@ubicrunch.com</p>
                                    <p className="text-deepbrown-600 dark:text-cream-200/80">partners@ubicrunch.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-white dark:bg-deepbrown-700 rounded-xl shadow-sm text-terracotta-500">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-deepbrown-900 dark:text-cream-50 text-lg">Call Us</h3>
                                    <p className="text-deepbrown-600 dark:text-cream-200/80">+62 812-3456-7890</p>
                                    <p className="text-deepbrown-600 dark:text-cream-200/80 text-sm opacity-70">Mon-Fri, 9am - 5pm</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-deepbrown-200 dark:border-deepbrown-700">
                            <h3 className="font-bold text-deepbrown-900 dark:text-cream-50 mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="p-3 bg-deepbrown-900 dark:bg-terracotta-500 text-white rounded-full hover:bg-terracotta-500 dark:hover:bg-terracotta-400 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 bg-deepbrown-900 dark:bg-terracotta-500 text-white rounded-full hover:bg-terracotta-500 dark:hover:bg-terracotta-400 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 bg-deepbrown-900 dark:bg-terracotta-500 text-white rounded-full hover:bg-terracotta-500 dark:hover:bg-terracotta-400 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-2/3"
                    >
                        <form className="space-y-6 bg-white dark:bg-deepbrown-800 p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 dark:border-deepbrown-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-deepbrown-700 dark:text-cream-200">Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        className="w-full p-4 rounded-xl border border-gray-200 dark:border-deepbrown-600 focus:outline-none focus:ring-2 focus:ring-terracotta-500 bg-gray-50/50 dark:bg-deepbrown-900 dark:text-cream-50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-deepbrown-700 dark:text-cream-200">Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="your@email.com" 
                                        className="w-full p-4 rounded-xl border border-gray-200 dark:border-deepbrown-600 focus:outline-none focus:ring-2 focus:ring-terracotta-500 bg-gray-50/50 dark:bg-deepbrown-900 dark:text-cream-50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-deepbrown-700 dark:text-cream-200">Subject</label>
                                <select className="w-full p-4 rounded-xl border border-gray-200 dark:border-deepbrown-600 focus:outline-none focus:ring-2 focus:ring-terracotta-500 bg-gray-50/50 dark:bg-deepbrown-900 text-deepbrown-600 dark:text-cream-50">
                                    <option>General Inquiry</option>
                                    <option>Wholesale / Partnership</option>
                                    <option>Feedback</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-deepbrown-700 dark:text-cream-200">Message</label>
                                <textarea 
                                    rows="5" 
                                    placeholder="Tell us what's on your mind..." 
                                    className="w-full p-4 rounded-xl border border-gray-200 dark:border-deepbrown-600 focus:outline-none focus:ring-2 focus:ring-terracotta-500 bg-gray-50/50 dark:bg-deepbrown-900 dark:text-cream-50 resize-none"
                                />
                            </div>

                            <button className="w-full py-4 bg-gradient-to-r from-deepbrown-900 to-deepbrown-800 dark:from-terracotta-600 dark:to-terracotta-500 text-white font-bold rounded-xl hover:from-terracotta-600 hover:to-terracotta-500 transition-all shadow-lg hover:shadow-terracotta-500/30 flex items-center justify-center gap-2 group">
                                <span>Send Message</span>
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
