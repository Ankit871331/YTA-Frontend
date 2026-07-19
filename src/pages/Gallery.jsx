import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Maximize2, X } from 'lucide-react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${API}/api/gallery`);
        setImages(res.data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Fallback images if DB is empty
  const fallbackImages = [
    'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=2072',
    'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&q=80&w=2071',
    'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=2072'
  ];

  const displayImages = images.length > 0 ? images.map(img => img.image) : fallbackImages;

  return (
    <div className="pt-32 pb-24">
      <Helmet>
        <title>Academy Gallery | Elite Taekwondo Academy</title>
        <meta name="description" content="View photos of our training sessions, tournaments, and belt promotion ceremonies at Elite Taekwondo Academy." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display mb-8">Academy Gallery</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Capturing the spirit, discipline, and triumphs of our martial arts community.
          </p>
        </div>

        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass h-64 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {displayImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary scale-0 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Gallery Full"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
