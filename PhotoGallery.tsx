import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  title: string;
  category: string;
}

const PhotoGallery: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const photos: Photo[] = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Campus Life',
      category: 'education',
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Coding Time',
      category: 'tech',
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Team Project',
      category: 'tech',
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Database Design',
      category: 'tech',
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'College Library',
      category: 'education',
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/256517/pexels-photo-256517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Study Group',
      category: 'education',
    },
  ];

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'tech', name: 'Tech' },
    { id: 'education', name: 'Education' },
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const photoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="gallery" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-primary-600 dark:text-primary-400"
          >
            Photo Gallery
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            A visual journey through my academic and technical experiences.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={photoVariants}
              layoutId={`photo-${photo.id}`}
              onClick={() => setSelectedPhoto(photo)}
              className="overflow-hidden rounded-xl shadow-md cursor-pointer group relative aspect-w-4 aspect-h-3"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-medium">{photo.title}</h3>
                  <p className="text-gray-200 text-sm capitalize">{photo.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.button
            className="absolute top-5 right-5 text-white bg-black/50 rounded-full p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
          <motion.div
            layoutId={`photo-${selectedPhoto.id}`}
            className="max-w-4xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white text-lg md:text-xl font-medium">{selectedPhoto.title}</h3>
              <p className="text-gray-200 text-sm md:text-base capitalize">{selectedPhoto.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default PhotoGallery;