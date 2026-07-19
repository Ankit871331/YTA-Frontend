import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Shield, Award, Users, Star } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('founder');

  const teamMembers = [
    { name: 'Shubham', role: 'Head Instructor', rank: '7th Dan Black Belt', exp: '25+ Years', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974' },
    { name: 'Instructor Elena Rossi', role: 'Youth Program Director', rank: '4th Dan Black Belt', exp: '12+ Years', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=2070' },
    { name: 'Instructor James Chen', role: 'Adult Program Coordinator', rank: '5th Dan Black Belt', exp: '15+ Years', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1974' }
  ];

  return (
    <div className="pt-32 pb-24">
      <Helmet>
        <title>About Our Academy | Elite Taekwondo Academy</title>
        <meta name="description" content="Meet our founder and expert instructors at Elite Taekwondo Academy. Decades of martial arts experience and passion for teaching." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display mb-8">About Our Academy</h1>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setActiveTab('founder')}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'founder' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              Our Founder
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'team' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              Our Team
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'founder' ? (
            <motion.div
              key="founder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=2070" 
                  alt="Grand Master Kim" 
                  className="rounded-2xl shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary rounded-2xl z-0" />
              </div>
              <div className="space-y-8">
                <span className="text-primary font-bold uppercase tracking-widest block">Grand Master Kim</span>
                <h2 className="text-4xl font-display">A Life Dedicated to Taekwondo</h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Grand Master Kim, a 9th Dan Black Belt, has dedicated over 50 years to the practice and instruction of Taekwondo. Born in South Korea, he began his journey at the age of 5 and has since become a world-renowned figure in the martial arts community.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: Award, title: "World Champion", desc: "1982 International TKD Federation Gold Medalist" },
                    { icon: Shield, title: "9th Dan Master", desc: "Highest attainable rank in Kukkiwon Taekwondo" },
                    { icon: Users, title: "Master Teacher", desc: "Trained over 5,000 black belts worldwide" },
                    { icon: Star, title: "Hall of Fame", desc: "Inducted into the Martial Arts Hall of Fame in 2010" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <item.icon className="text-primary mt-1" size={24} />
                      <div>
                        <h4 className="font-bold uppercase tracking-tight">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, idx) => (
                <div key={idx} className="glass rounded-2xl overflow-hidden group">
                  <div className="h-80 overflow-hidden relative">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-2xl font-display mb-1">{member.name}</h3>
                      <p className="text-primary text-sm uppercase tracking-widest font-bold">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 uppercase tracking-widest">Rank</span>
                      <span className="font-bold">{member.rank}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 uppercase tracking-widest">Experience</span>
                      <span className="font-bold">{member.exp}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed pt-4 border-t border-white/5">
                      Dedicated to fostering the next generation of martial artists with passion and precision.
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
