import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Phone, MapPin, Send } from 'lucide-react';

// WhatsApp number in international format WITHOUT '+' or spaces
const WHATSAPP_NUMBER = '919560312832';
const INITIAL_FORM = { name: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name) errors.name = 'Please enter your name.';
  else if (values.name.length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!values.message) errors.message = 'Please enter a message.';
  else if (values.message.length < 10) errors.message = 'Message must be at least 10 characters.';

  return errors;
}

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });

  // Prefill message when arriving from /programs?program=...
  useEffect(() => {
    const program = new URLSearchParams(location.search).get('program');
    if (program) {
      setFormData((prev) => ({
        ...prev,
        message: `I would like to enroll in the ${program}. Please provide more information.`,
      }));
    }
  }, [location.search]);

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. sanitize
    const values = {
      name: formData.name.trim(),
      message: formData.message.trim(),
    };

    // 2. validate
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    // 3. build the WhatsApp message
    const text = `Hi, my name is ${values.name}.\n\n${values.message}`;
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    // 4. open WhatsApp (new tab for better UX)
    window.open(waLink, '_blank', 'noopener,noreferrer');

    // 5. feedback
    setStatus({
      type: 'success',
      message: 'WhatsApp is opening. Just hit send to reach us!',
    });

    // optional: clear form
    // setTimeout(() => setFormData(INITIAL_FORM), 1500);
  };

  const inputBase =
    'w-full bg-white/5 border rounded-xl py-4 px-6 focus:border-primary outline-none transition-all';
  const okBorder = 'border-white/10';
  const badBorder = 'border-red-500/60';

  return (
    <div className="pt-32 pb-24">
      <Helmet>
        <title>Contact Us | Elite Taekwondo Academy</title>
        <meta
          name="description"
          content="Have questions? Contact Elite Taekwondo Academy today. Visit our dojo, call us, or message us on WhatsApp. We're here to help you start your journey."
        />
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
                { icon: MapPin, title: 'Visit Us', detail: 'Sec 22B near community center, Gurgaon Haryana 122001' },
                { icon: Phone, title: 'Call Us', detail: '+91 9560312832' },
                { icon: MessageCircle, title: 'WhatsApp', detail: '+91 9560312832' },
                { icon: Send, title: 'Socials', detail: '@EliteTKD_Academy' },
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
                title="Elite Taekwondo Academy location"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3355.3567744156776!2d77.06319707549633!3d28.509483875732155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDMwJzM0LjEiTiA3N8KwMDMnNTYuOCJF!5e1!3m2!1sen!2sin!4v1789730034232!5m2!1sen!2sin"
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
              <div
                role="status"
                aria-live="polite"
                className={`p-4 rounded-lg mb-8 text-center text-sm ${
                  status.type === 'success'
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  aria-invalid={Boolean(errors.name)}
                  className={`${inputBase} ${errors.name ? badBorder : okBorder}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange('message')}
                  aria-invalid={Boolean(errors.message)}
                  className={`${inputBase} resize-none ${errors.message ? badBorder : okBorder}`}
                  placeholder="How can we help you?"
                />
                {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-2"
              >
                <span>Send on WhatsApp</span>
                <MessageCircle size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}