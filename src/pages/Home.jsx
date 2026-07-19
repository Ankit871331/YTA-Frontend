import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Users, Calendar, Image as ImageIcon, ArrowRight, Star } from 'lucide-react';
const { API } = import.meta.env.VITE_API_URL;


export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="overflow-hidden">
      <Helmet>
  <title>{`Elite Taekwondo Academy | Martial Arts Excellence ${API}`}</title>
        <meta name="description" content="Join Elite Taekwondo Academy for world-class martial arts training. Programs for kids, teens, and adults. Discipline, respect, and excellence." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsOrganization",
            "name": "Elite Taekwondo Academy",
            "description": "Professional Martial Arts Academy",
            "url": "https://elitetkd.com",
            "logo": "https://elitetkd.com/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Martial Arts Way",
              "addressLocality": "New York",
              "addressRegion": "NY",
              "postalCode": "10001",
              "addressCountry": "US"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=2070" 
            alt="Taekwondo Training" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <span className="text-primary font-bold uppercase tracking-[0.3em] mb-4 block">Master Your Mind & Body</span>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-tight">
              ELITE <span className="text-primary">TAEKWONDO</span> <br /> ACADEMY
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Join the premier martial arts academy where discipline meets excellence. Transform your life through the power of Taekwondo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary px-10 py-4 text-lg w-full sm:w-auto">Start Free Trial</Link>
              <Link to="/classes" className="btn-outline px-10 py-4 text-lg w-full sm:w-auto">View Classes</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Discipline", desc: "Building character through structured training and respect." },
              { icon: Users, title: "Community", desc: "A supportive environment for students of all ages and levels." },
              { icon: Star, title: "Excellence", desc: "Striving for the highest standards in martial arts mastery." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 group"
              >
                <feature.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-display mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=2072" 
                  alt="Master Instructor" 
                  className="rounded-2xl shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary rounded-2xl z-0" />
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-primary font-bold uppercase tracking-widest mb-4 block">Our Legacy</span>
                <h2 className="text-4xl md:text-5xl font-display mb-8">Decades of Martial Arts Mastery</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Founded by Grand Master Kim, Elite Taekwondo Academy has been a beacon of martial arts excellence for over 30 years. Our mission is to provide high-quality instruction that fosters personal growth, physical fitness, and mental resilience.
                </p>
                <Link to="/about" className="flex items-center space-x-2 text-primary font-bold uppercase tracking-widest hover:translate-x-2 transition-transform">
                  <span>Learn More About Us</span>
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-dark-lighter relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-4">What Our Students Say</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Parent", text: "Elite TKD has transformed my son's confidence. The instructors are patient and truly care about each student's progress." },
              { name: "Michael Chen", role: "Black Belt", text: "The level of technical instruction here is unmatched. It's not just about kicking; it's about the philosophy behind the art." },
              { name: "Emma Williams", role: "Adult Student", text: "I started as a total beginner at 35. The community is so welcoming, and I've never felt more fit and focused." }
            ].map((testimonial, idx) => (
              <div key={idx} className="glass p-8 rounded-2xl relative">
                <Star className="text-primary mb-6 fill-primary" size={24} />
                <p className="text-gray-300 italic mb-8">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-primary text-sm uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
