import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <a href="#" className="text-2xl font-bold text-white">
              Shubhan<span className="text-accent-500">.dev</span>
            </a>
            <p className="mt-4 text-gray-400">
              BCA student at Anandaram Dhekial Phookan College. Passionate about technology and programming.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/shubhan-bora-6bb752292/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="http://www.youtube.com/@Endofus2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="mailto:shubhan121b@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-400">
              <p>Anandaram Dhekial Phookan College</p>
              <p>Assam, India</p>
              <p className="mt-2">
                <a href="mailto:shubhan121b@gmail.com" className="hover:text-white transition-colors">
                  shubhan121b@gmail.com
                </a>
              </p>
            </address>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} Shubhan Bora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;