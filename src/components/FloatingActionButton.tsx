import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Menu, Github, Linkedin, Mail, X } from "lucide-react";

const FloatingActionButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const quickLinks = [
        { icon: Github, label: "GitHub", href: "https://github.com/Samrudh2006", color: "from-violet-500 to-purple-500" },
        { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/samrudhdwivedula", color: "from-blue-500 to-cyan-500" },
        { icon: Mail, label: "Email", href: "mailto:samrudhdwivedula12@gmail.com", color: "from-red-500 to-orange-500" },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-8 left-8 z-50">
                    {/* Quick Links Menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                className="absolute bottom-20 left-0 flex flex-col gap-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                            >
                                {quickLinks.map((link, index) => {
                                    const Icon = link.icon;
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-3 rounded-full glass-panel hover:scale-110 transition-transform bg-gradient-to-r ${link.color} bg-opacity-10`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            title={link.label}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </motion.a>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main FAB Buttons */}
                    <div className="flex gap-3">
                        {/* Menu Toggle */}
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-4 rounded-full glass-panel hover:bg-primary/10 transition-colors relative"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                boxShadow: isMenuOpen
                                    ? "0 0 30px hsl(var(--secondary) / 0.6)"
                                    : "0 0 20px hsl(var(--primary) / 0.3)",
                            }}
                        >
                            <motion.div
                                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </motion.div>
                        </motion.button>

                        {/* Scroll to Top */}
                        <motion.button
                            onClick={scrollToTop}
                            className="p-4 rounded-full glass-panel hover:bg-primary/10 transition-colors"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
                            }}
                        >
                            <ArrowUp className="h-6 w-6" />
                        </motion.button>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FloatingActionButton;
