import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Check, Clock, Users, Shield, Zap, X, Info, Star, Target, Trophy } from 'lucide-react';

export default function Classes() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const navigate = useNavigate();

  const handleEnroll = (programTitle) => {
    setSelectedProgram(null);
    navigate(`/contact?program=${encodeURIComponent(programTitle)}`);
  };

  const handleDownloadSyllabus = () => {
    alert("Syllabus download started! (This is a demo - in a real app, this would trigger a PDF download)");
  };

  const programs = [
    { 
      title: "Beginner Program", 
      age: "Ages 5-12", 
      desc: "Focus on fundamentals, coordination, and basic techniques. Perfect for those starting their martial arts journey.",
      longDesc: "Our Beginner Program is specifically designed to introduce children to the world of Taekwondo in a fun, safe, and structured environment. We focus on building a strong foundation of physical coordination while instilling core values like respect, discipline, and perseverance.",
      features: ["Basic Stances & Kicks", "Discipline & Focus", "Self-Defense Basics", "2 Classes per Week"],
      curriculum: [
        "Introduction to basic blocks and strikes",
        "Learning the first Poomsae (Form)",
        "Focus on balance and flexibility",
        "Character development workshops"
      ],
      color: "border-white/20",
      icon: Shield
    },
    { 
      title: "Intermediate Program", 
      age: "Ages 13+", 
      desc: "Advanced combinations, sparring techniques, and physical conditioning. Building strength and mental resilience.",
      longDesc: "The Intermediate Program takes practitioners to the next level by introducing more complex techniques and higher intensity training. Students begin to explore the competitive aspects of Taekwondo while deepening their understanding of the art's philosophy.",
      features: ["Advanced Form (Poomsae)", "Olympic Sparring", "Board Breaking", "3 Classes per Week"],
      curriculum: [
        "Advanced kicking combinations",
        "Introduction to Olympic-style sparring",
        "Power development and board breaking",
        "Leadership and assistant teaching opportunities"
      ],
      color: "border-primary/50",
      icon: Zap
    },
    { 
      title: "Advanced Program", 
      age: "Black Belt Club", 
      desc: "Mastery of the art, leadership training, and high-performance competition prep. For dedicated practitioners.",
      longDesc: "Reserved for our most dedicated students, the Advanced Program focuses on mastery. This elite group trains for high-level competitions and black belt excellence. It's not just about physical skill, but about becoming a leader in the dojo and the community.",
      features: ["Mastery of All Forms", "Instructor Training", "Weaponry Basics", "Unlimited Classes"],
      curriculum: [
        "Mastery of all black belt forms",
        "High-performance competition training",
        "Traditional weaponry and advanced self-defense",
        "Certified instructor training program"
      ],
      color: "border-primary",
      icon: Users
    }
  ];

  const schedule = [
    { time: "4:00 PM - 5:00 PM", mon: "Beginner", tue: "Intermediate", wed: "Beginner", thu: "Intermediate", fri: "All Levels", sat: "Open Mat" },
    { time: "5:15 PM - 6:15 PM", mon: "Intermediate", tue: "Beginner", wed: "Intermediate", thu: "Beginner", fri: "Sparring", sat: "Black Belt" },
    { time: "6:30 PM - 7:30 PM", mon: "Advanced", tue: "Adults", wed: "Advanced", thu: "Adults", fri: "Open Mat", sat: "Closed" },
  ];

  return (
    <div className="pt-32 pb-24">
      <Helmet>
        <title>Our Classes & Schedule | Elite Taekwondo Academy</title>
        <meta name="description" content="Explore our Taekwondo programs for all ages and skill levels. View our weekly class schedule and find the perfect program for you." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display mb-8">Our Programs</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We offer specialized training programs tailored to different age groups and skill levels. Each program is designed to challenge and inspire.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {programs.map((program, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`glass p-8 rounded-2xl border-2 ${program.color} relative overflow-hidden group z-10`}
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
              <program.icon className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-display mb-2">{program.title}</h3>
              <span className="text-primary text-sm font-bold uppercase tracking-widest mb-6 block">{program.age}</span>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">{program.desc}</p>
              <ul className="space-y-4 mb-8">
                {program.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center space-x-3 text-sm">
                    <Check size={16} className="text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setSelectedProgram(program)}
                className="btn-primary w-full cursor-pointer relative z-20"
              >
                Learn More
              </button>
            </motion.div>
          ))}
        </div>

        {/* Schedule Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display mb-4">Weekly Schedule</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="glass rounded-2xl overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-6 font-display uppercase tracking-widest text-sm text-primary">Time</th>
                  <th className="p-6 font-display uppercase tracking-widest text-sm">Mon</th>
                  <th className="p-6 font-display uppercase tracking-widest text-sm">Tue</th>
                  <th className="p-6 font-display uppercase tracking-widest text-sm">Wed</th>
                  <th className="p-6 font-display uppercase tracking-widest text-sm">Thu</th>
                  <th className="p-6 font-display uppercase tracking-widest text-sm">Fri</th>
                  <th className="p-6 font-display uppercase tracking-widest text-sm">Sat</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {schedule.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold flex items-center space-x-2">
                      <Clock size={16} className="text-primary" />
                      <span>{row.time}</span>
                    </td>
                    <td className="p-6 text-gray-400">{row.mon}</td>
                    <td className="p-6 text-gray-400">{row.tue}</td>
                    <td className="p-6 text-gray-400">{row.wed}</td>
                    <td className="p-6 text-gray-400">{row.thu}</td>
                    <td className="p-6 text-gray-400">{row.fri}</td>
                    <td className="p-6 text-gray-400">{row.sat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center">
          <h2 className="text-4xl font-display mb-16">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass p-12 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-display mb-4">Monthly Membership</h3>
              <div className="text-5xl font-display text-primary mb-6">$149<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-gray-400 mb-8">Full access to all age-appropriate classes, no long-term contracts.</p>
              <button className="btn-outline w-full">Sign Up Now</button>
            </div>
            <div className="glass p-12 rounded-2xl border-2 border-primary relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-lg">Best Value</div>
              <h3 className="text-2xl font-display mb-4">Annual Membership</h3>
              <div className="text-5xl font-display text-primary mb-6">$1,499<span className="text-lg text-gray-500">/yr</span></div>
              <p className="text-gray-400 mb-8">Get 2 months free + a complimentary uniform (Dobok) and gear bag.</p>
              <button className="btn-primary w-full">Get Started</button>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            key="program-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              key="program-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass w-full max-w-4xl rounded-3xl border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 md:h-64 bg-primary/20 flex items-center justify-center">
                <selectedProgram.icon className="w-24 h-24 text-primary animate-pulse" />
                <button 
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-6 right-6 p-2 bg-dark/50 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-6 left-8">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">{selectedProgram.age}</span>
                  <h2 className="text-3xl md:text-4xl font-display uppercase tracking-widest">{selectedProgram.title}</h2>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center space-x-2 text-primary mb-4">
                        <Info size={20} />
                        <h4 className="font-bold uppercase tracking-widest text-sm">Overview</h4>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {selectedProgram.longDesc}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 text-primary mb-4">
                        <Star size={20} />
                        <h4 className="font-bold uppercase tracking-widest text-sm">Key Benefits</h4>
                      </div>
                      <ul className="grid grid-cols-1 gap-4">
                        {selectedProgram.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-3 text-gray-300">
                            <Check size={18} className="text-primary shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                      <div className="flex items-center space-x-2 text-primary mb-6">
                        <Target size={20} />
                        <h4 className="font-bold uppercase tracking-widest text-sm">Curriculum Highlights</h4>
                      </div>
                      <ul className="space-y-4">
                        {selectedProgram.curriculum.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-sm text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => handleEnroll(selectedProgram.title)}
                        className="btn-primary flex-grow py-4 text-sm cursor-pointer"
                      >
                        Enroll in {selectedProgram.title}
                      </button>
                      <button 
                        onClick={handleDownloadSyllabus}
                        className="btn-outline flex-grow py-4 text-sm cursor-pointer"
                      >
                        Download Syllabus
                      </button>
                    </div>
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
