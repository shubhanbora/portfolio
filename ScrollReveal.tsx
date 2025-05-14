import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  triggerOnce?: boolean;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = 0.1,
  delay = 0,
  direction = 'up',
  triggerOnce = false,
  className = '',
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  });

  const getDirectionVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'down':
        return {
          hidden: { y: -50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'left':
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case 'right':
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      default:
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={getDirectionVariants()}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;