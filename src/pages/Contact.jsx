import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import axios from 'axios';

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const program = params.get('program');
    if (program) {
      setFormData(prev => ({
        ...prev,
        message: `I would like to enroll in the ${program}. Please provide more information.`
      }));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      await axios.post('/api/contact', formData);
      setStatus({ type: 'success', message: 'Message sent! We will get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <Helmet>
        <title>Contact Us | Elite Taekwondo Academy</title>
        <meta name="description" content="Have questions? Contact Elite Taekwondo Academy today. Visit our dojo, call us, or send a message. We're here to help you start your journey." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display mb-8">Get In Touch</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Ready to start your martial arts journey? Have questions about our programs? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: MapPin, title: "Visit Us", detail: "123 Martial Arts Way, NY 10001" },
                { icon: Phone, title: "Call Us", detail: "+1 (555) 123-4567" },
                { icon: Mail, title: "Email Us", detail: "info@elitetkd.com" },
                { icon: Send, title: "Socials", detail: "@EliteTKD_Academy" }
              ].map((item, idx) => (
                <div key={idx} className="glass p-8 rounded-2xl border border-white/5">
                  <item.icon className="text-primary mb-4" size={28} />
                  <h4 className="font-display uppercase tracking-widest text-sm mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Map Embed */}
            <div className="glass rounded-3xl overflow-hidden h-80 border border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2157071449434!2d-73.98784412424681!3d40.757978734839106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1709212345678!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-white/10"
          >
            <h3 className="text-3xl font-display mb-8">Send a Message</h3>
            {status.message && (
              <div className={`p-4 rounded-lg mb-8 text-center text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {status.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:border-primary outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Your Message</label>
                <textarea 
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:border-primary outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-2"
              >
                {loading ? 'Sending...' : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
