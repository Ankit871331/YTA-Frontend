import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Clock, ArrowRight, Filter, X, Info } from 'lucide-react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API}/api/events`);
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.status === filter;
  });

  return (
    <div className="pt-32 pb-24">
      <Helmet>
        <title>Events & Tournaments | Elite Taekwondo Academy</title>
        <meta name="description" content="Stay updated with the latest events, seminars, and tournaments at Elite Taekwondo Academy. View our upcoming and past events." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-display mb-8">Events & Tournaments</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              From local belt tests to international tournaments, stay connected with our active martial arts community.
            </p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 p-2 rounded-full border border-white/10">
            {['all', 'upcoming', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass h-96 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={event.image || 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=2070'} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute top-4 right-4 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${event.status === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-500 text-white'}`}>
                    {event.status}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-xs text-primary font-bold uppercase tracking-widest mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>10:00 AM</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display mb-4 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center space-x-2 text-gray-500 text-xs">
                      <MapPin size={14} />
                      <span>Main Dojo</span>
                    </div>
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="text-primary font-bold uppercase tracking-widest text-xs flex items-center space-x-2 hover:translate-x-2 transition-transform"
                    >
                      <span>Details</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-24 glass rounded-3xl">
            <Calendar className="mx-auto text-gray-700 mb-6" size={64} />
            <h3 className="text-2xl font-display text-gray-500 uppercase tracking-widest">No events found</h3>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass w-full max-w-3xl rounded-3xl border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img 
                  src={selectedEvent.image || 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=2070'} 
                  alt={selectedEvent.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-6 right-6 p-2 bg-dark/50 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-6 left-8">
                  <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 ${selectedEvent.status === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-500 text-white'}`}>
                    {selectedEvent.status}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display uppercase tracking-widest">{selectedEvent.title}</h2>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Date</p>
                      <p className="font-bold">{new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Time</p>
                      <p className="font-bold">10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Location</p>
                      <p className="font-bold">Main Academy Dojo</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-primary">
                    <Info size={20} />
                    <h4 className="font-bold uppercase tracking-widest text-sm">Event Description</h4>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {selectedEvent.description}
                  </p>
                  <div className="pt-8">
                    <button 
                      onClick={() => setSelectedEvent(null)}
                      className="btn-primary px-12 py-4 text-sm"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
