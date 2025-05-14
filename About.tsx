import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Calendar, GraduationCap, MapPin } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2 
      } 
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={childVariants} className="text-center mb-12">
            <h2 className="mb-4 text-primary-600 dark:text-primary-400">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get to know me better - my education, background, and what drives me in the world of technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div variants={childVariants} className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Journey</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I'm currently a BCA 2nd year student passionate about technology and software development. My journey in the tech world started with learning programming languages and exploring different aspects of computer applications.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I'm particularly interested in developing my skills in web development and database management. As I progress through my education, I'm excited to apply my knowledge to real-world projects.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                When I'm not coding or studying, I enjoy exploring new technologies, watching tech tutorials, and contributing to my YouTube channel.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">BCA Student</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bachelor of Computer Applications</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Started August 2024</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Regular Offline Course</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={childVariants} className="order-1 md:order-2">
              <div className="relative mb-6 md:mb-0">
                <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-lg relative">
                  <img 
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Students studying" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white dark:bg-dark-800 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Anandaram Dhekial Phookan College</h4>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin size={14} className="mr-1" />
                        <span>Assam, India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;