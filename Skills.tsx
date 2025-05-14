import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Braces, Database, FileCode, DivideIcon as  Server, Files } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';  // Correct usage
interface Skill {
  name: string;
  level: number;
  icon: LucideIcon;
  color: string;
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const skills: Skill[] = [
    { name: 'C Programming', level: 75, icon: Braces, color: 'text-blue-600 dark:text-blue-400' },
    { name: 'MS Office', level: 85, icon: Files, color: 'text-green-600 dark:text-green-400' },
    { name: 'SQL', level: 70, icon: Database, color: 'text-purple-600 dark:text-purple-400' },
    { name: 'PHP', level: 65, icon: Server, color: 'text-indigo-600 dark:text-indigo-400' },
    { name: 'HTML/CSS', level: 60, icon: FileCode, color: 'text-orange-600 dark:text-orange-400' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skillVariants = {
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
    <section id="skills" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-primary-600 dark:text-primary-400"
          >
            My Skills
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            These are the technologies and tools I've worked with during my studies and personal projects.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={skillVariants}
              className="skill-card relative group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-lg bg-gray-100 dark:bg-dark-700 ${skill.color}`}>
                  <skill.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
              </div>
              
              <div className="w-full h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-primary-500 dark:bg-primary-400"
                ></motion.div>
              </div>
              
              <div className="mt-2 text-right text-gray-600 dark:text-gray-400">
                <span className="font-medium">{skill.level}%</span>
              </div>
              
              <div className="mt-4 text-gray-600 dark:text-gray-300">
                <p>
                  {skill.name === 'C Programming' && 'Proficient in core concepts, data structures, and algorithm implementation.'}
                  {skill.name === 'MS Office' && 'Skilled in Word, Excel, PowerPoint, and other Office applications.'}
                  {skill.name === 'SQL' && 'Experience with database design, queries, and data manipulation.'}
                  {skill.name === 'PHP' && 'Knowledge of server-side scripting and web application development.'}
                  {skill.name === 'HTML/CSS' && 'Basic understanding of web markup and styling techniques.'}
                </p>
              </div>
              
              <motion.div
                className="absolute -z-10 inset-0 rounded-lg bg-primary-500/0 group-hover:bg-primary-500/5 dark:group-hover:bg-primary-500/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;