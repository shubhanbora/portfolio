import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-white dark:bg-dark-900 shadow-md py-3'
      : 'bg-transparent py-5'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container-custom flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <a href="#" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Shubhan<span className="text-accent-600 dark:text-accent-500">.dev</span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-8"
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              className="nav-link font-medium"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-dark-800 shadow-lg"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="nav-link font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;