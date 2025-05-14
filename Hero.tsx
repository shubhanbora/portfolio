import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Youtube } from 'lucide-react';
const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span 
            className="inline-block text-accent-600 dark:text-accent-500 font-medium mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Hello, I'm
          </motion.span>
          <motion.h1 
            className="mb-4 font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Shubhan Bora
          </motion.h1>
          <motion.p 
            className="text-xl mb-6 text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            BCA Student and Aspiring Developer
          </motion.p>
          <motion.p 
            className="mb-8 max-w-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Passionate about technology and learning new skills. Currently focused on
            building my expertise in programming and development.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <a href="#contact" className="btn btn-primary">
              Contact Me
            </a>
            <a href="#about" className="btn bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-700">
              About Me
            </a>
          </motion.div>

          <motion.div 
            className="mt-8 flex space-x-5 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <a href="https://www.linkedin.com/in/shubhan-bora-6bb752292/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Linkedin size={20} />
            </a>
            <a href="http://www.youtube.com/@Endofus2" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Youtube size={20} />
            </a>
            <a href="mailto:shubhan121b@gmail.com" className="social-icon">
              <Mail size={20} />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Github size={20} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-xl animate-float">
            <img 
              src="/image/Firefly 20241103003601.jpg"
              alt="Profile Portrait" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-500/20 dark:bg-accent-500/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-xl"></div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-16 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <a href="#about" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 animate-bounce">
          <ArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;