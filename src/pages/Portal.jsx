import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, User, Calendar, Award, CreditCard, HelpCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

export default function Portal() {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotData, setForgotData] = useState({ name: '', dob: '' });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API}/api/students/portal/${studentId}`);
      setStudentData(res.data);
    } catch (err) {
      setError('Student not found. Please check your ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleFindId = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/api/students/find-id`, forgotData);
      setStudentId(res.data.studentId);
      setShowForgot(false);
      setError('ID found! You can now login.');
    } catch (err) {
      setError('No student found with these details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark">
      <Helmet>
        <title>Student Portal | Elite Taekwondo Academy</title>
        <meta name="description" content="Access your student records, track your progress, check belt rank, and view fee status at Elite Taekwondo Academy." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!studentData ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="glass p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10"
            >
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <User className="text-primary" size={40} />
                </div>
                <h1 className="text-4xl font-display mb-4">Student Portal</h1>
                <p className="text-gray-400">Enter your Student ID to access your records</p>
              </div>

              {error && (
                <div className={`p-4 rounded-lg mb-8 text-center text-sm ${error.includes('found!') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {error}
                </div>
              )}

              {!showForgot ? (
                <form onSubmit={handleSearch} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Student ID</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                      <input 
                        type="text" 
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g. ETKD-2024-001"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-2"
                  >
                    {loading ? 'Searching...' : 'Access Records'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="w-full text-center text-sm text-gray-500 hover:text-primary transition-colors flex items-center justify-center space-x-2"
                  >
                    <HelpCircle size={16} />
                    <span>Forgot your Student ID?</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleFindId} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={forgotData.name}
                        onChange={(e) => setForgotData({...forgotData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-primary outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Date of Birth</label>
                      <input 
                        type="date" 
                        value={forgotData.dob}
                        onChange={(e) => setForgotData({...forgotData, dob: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-primary outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      type="button"
                      onClick={() => setShowForgot(false)}
                      className="btn-outline flex-1 py-4 flex items-center justify-center space-x-2"
                    >
                      <ArrowLeft size={18} />
                      <span>Back</span>
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary flex-1 py-4"
                    >
                      {loading ? 'Finding...' : 'Find My ID'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setStudentData(null)}
                  className="text-gray-500 hover:text-primary flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span className="font-bold uppercase tracking-widest text-sm">Logout</span>
                </button>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Student Dashboard</span>
              </div>

              <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl font-display">
                  {studentData.name.charAt(0)}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-display mb-1">{studentData.name}</h2>
                  <p className="text-gray-500 font-mono text-sm">{studentData.studentId}</p>
                </div>
                <div className="md:ml-auto flex flex-col items-center md:items-end">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Current Rank</span>
                  <span className="text-2xl font-display text-primary">{studentData.beltRank} Belt</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Calendar, label: "Joining Date", value: new Date(studentData.joiningDate).toLocaleDateString() },
                  { icon: Award, label: "Last Exam Marks", value: `${studentData.marks}%` },
                  { icon: CreditCard, label: "Fees Pending", value: `$${studentData.feesPending}`, color: studentData.feesPending > 0 ? 'text-red-500' : 'text-green-500' },
                  { icon: User, label: "Attendance", value: "92%" }
                ].map((stat, idx) => (
                  <div key={idx} className="glass p-6 rounded-2xl border border-white/5">
                    <stat.icon className="text-primary mb-4" size={24} />
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                    <p className={`text-xl font-display ${stat.color || 'text-white'}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="glass p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-display mb-6">Recent Progress</h3>
                <div className="space-y-6">
                  {[
                    { title: "Yellow Belt Promotion", date: "Jan 15, 2024", status: "Completed" },
                    { title: "Spring Tournament", date: "Mar 20, 2024", status: "Upcoming" },
                    { title: "Advanced Sparring Seminar", date: "Feb 10, 2024", status: "Completed" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
