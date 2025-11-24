import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Brain, Shield, FolderGit2, BookOpen, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Brain, label: "Skills", href: "#skills" },
    { icon: Shield, label: "Projects", href: "#projects" },
    { icon: FolderGit2, label: "Achievements", href: "#achievements" },
    { icon: BookOpen, label: "Blog", href: "#blog" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-panel shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="font-signature text-2xl md:text-3xl glow-text"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Samrudh
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="group relative px-4 py-2 flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-center gap-2 pb-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="p-2 text-foreground/80 hover:text-primary transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="h-5 w-5" />
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;