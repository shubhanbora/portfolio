import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send, Linkedin, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Replace these with your actual EmailJS credentials
  const serviceId = 'service_wdncicw';
  const templateId = 'template_4ayaron';
  const publicKey = '0I4lXvynVE7Oauz-h';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setSubmitMessage('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        setSubmitMessage('Something went wrong. Please try again later.');
        console.error('EmailJS error:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitMessage(''), 5000);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-primary-600 dark:text-primary-400"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Have a question or want to connect? Feel free to reach out and I'll get back to you soon.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                  <a href="mailto:shubhan121b@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    shubhan121b@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Anandaram Dhekial Phookan College, Assam, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/shubhan-bora-6bb752292/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    linkedin.com/in/shubhan-bora-6bb752292/
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <Youtube size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">YouTube</h4>
                  <a 
                    href="http://www.youtube.com/@Endofus2" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    youtube.com/@Endofus2
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors dark:text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors dark:text-white"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </span>
                )}
              </motion.button>
              
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-center"
                >
                  {submitMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
