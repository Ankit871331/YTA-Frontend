import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  LayoutDashboard, Users, Calendar, Image as ImageIcon, Plus, 
  Trash2, Edit, CheckCircle, LogOut, Search, DollarSign, Award, X
} from 'lucide-react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({ students: 0, events: 0, pendingFees: 0 });
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, type: '', mode: 'add', data: null });
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [statsRes, studentsRes, eventsRes, galleryRes] = await Promise.all([
          axios.get(`${API}/api/admin/stats`, config),
          axios.get(`${API}/api/admin/students`, config),
          axios.get(`${API}/api/admin/events`, config),
          axios.get(`${API}/api/admin/gallery`, config)
        ]);
        setStats(statsRes.data);
        setStudents(studentsRes.data);
        setEvents(eventsRes.data);
        setGallery(galleryRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        if (err.response?.status === 401) navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API}/api/admin/students/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setStudents(prev => prev.filter(s => s._id !== id));
      setStats(prev => ({ ...prev, students: prev.students - 1 }));
    } catch (err) {
      console.error('Error deleting student:', err);
      if (err.response?.status === 401) {
        navigate('/admin/login');
      } else {
        alert('Error deleting student: ' + (err.response?.data?.message || 'Server error'));
      }
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API}/api/admin/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setEvents(prev => prev.filter(e => e._id !== id));
      setStats(prev => ({ ...prev, events: prev.events - 1 }));
    } catch (err) {
      console.error('Error deleting event:', err);
      if (err.response?.status === 401) {
        navigate('/admin/login');
      } else {
        alert('Error deleting event: ' + (err.response?.data?.message || 'Server error'));
      }
    }
  };

  const deleteGalleryImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API}/api/admin/gallery/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setGallery(prev => prev.filter(g => g._id !== id));
    } catch (err) {
      console.error('Error deleting image:', err);
      if (err.response?.status === 401) {
        navigate('/admin/login');
      } else {
        alert('Error deleting image: ' + (err.response?.data?.message || 'Server error'));
      }
    }
  };

  const markAsPaid = async (student) => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.put(`${API}/api/admin/students/${student._id}`, { feesPending: 0 }, config);
      setStudents(prev => prev.map(s => s._id === res.data._id ? res.data : s));
      // Update stats
      setStats(prev => ({ ...prev, pendingFees: prev.pendingFees - student.feesPending }));
    } catch (err) {
      alert('Error updating payment status');
    }
  };

  const handleOpenModal = (type, mode = 'add', data = null) => {
    setModal({ open: true, type, mode, data });
    setFormData(data || {});
  };

  const handleCloseModal = () => {
    setModal({ open: false, type: '', mode: 'add', data: null });
    setFormData({});
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      let endpoint = '';
      if (modal.type === 'students') endpoint = `${API}/api/admin/students`;
      if (modal.type === 'events') endpoint = `${API}/api/admin/events`;
      if (modal.type === 'gallery') endpoint = `${API}/api/admin/gallery`;

      if (modal.mode === 'add') {
        const res = await axios.post(endpoint, formData, config);
        if (modal.type === 'students') {
          setStudents(prev => [...prev, res.data]);
          setStats(prev => ({ ...prev, students: prev.students + 1 }));
        }
        if (modal.type === 'events') {
          setEvents(prev => [...prev, res.data]);
          setStats(prev => ({ ...prev, events: prev.events + 1 }));
        }
        if (modal.type === 'gallery') setGallery(prev => [...prev, res.data]);
      } else {
        const res = await axios.put(`${endpoint}/${modal.data._id}`, formData, config);
        if (modal.type === 'students') setStudents(prev => prev.map(s => s._id === res.data._id ? res.data : s));
        if (modal.type === 'events') setEvents(prev => prev.map(e => e._id === res.data._id ? res.data : e));
        if (modal.type === 'gallery') setGallery(prev => prev.map(g => g._id === res.data._id ? res.data : g));
      }
      handleCloseModal();
    } catch (err) {
      alert('Error saving data');
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark">
      <Helmet>
        <title>Admin Dashboard | Elite Taekwondo Academy</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-2">
            {[
              { id: 'stats', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'students', icon: Users, label: 'Students' },
              { id: 'events', icon: Calendar, label: 'Events' },
              { id: 'gallery', icon: ImageIcon, label: 'Gallery' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm text-red-500 hover:bg-red-500/10 transition-all mt-8"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-grow glass p-8 rounded-3xl border border-white/10">
            <AnimatePresence mode="wait">
              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-display">System Overview</h2>
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${stats.dbStatus === 'Connected' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${stats.dbStatus === 'Connected' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                      <span>{stats.dbStatus || 'Checking...'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                      <Users className="text-primary mb-4" size={32} />
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Students</p>
                      <p className="text-4xl font-display">{stats.students}</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                      <Calendar className="text-primary mb-4" size={32} />
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Active Events</p>
                      <p className="text-4xl font-display">{stats.events}</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                      <DollarSign className="text-red-500 mb-4" size={32} />
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Pending Fees</p>
                      <p className="text-4xl font-display text-red-500">{stats.pendingFees}</p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-xl font-display mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {students.slice(0, 5).map((student, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold">{student.name}</p>
                              <p className="text-xs text-gray-500">Joined {new Date(student.joiningDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-primary">{student.beltRank} Belt</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'students' && (
                <motion.div
                  key="students"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-display">Manage Students</h2>
                    <button 
                      onClick={() => handleOpenModal('students')}
                      className="btn-primary py-2 px-6 text-sm flex items-center space-x-2"
                    >
                      <Plus size={18} />
                      <span>Add Student</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-gray-500">
                          <th className="py-4 px-4">Student</th>
                          <th className="py-4 px-4">ID</th>
                          <th className="py-4 px-4">Rank</th>
                          <th className="py-4 px-4">Fees</th>
                          <th className="py-4 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 font-bold">{student.name}</td>
                            <td className="py-4 px-4 font-mono text-xs text-gray-500">{student.studentId}</td>
                            <td className="py-4 px-4">
                              <span className="text-xs font-bold uppercase tracking-widest text-primary">{student.beltRank}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs font-bold ${student.feesPending > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                  {student.feesPending > 0 ? `$${student.feesPending}` : 'Paid'}
                                </span>
                                {student.feesPending > 0 && (
                                  <button 
                                    onClick={() => markAsPaid(student)}
                                    className="p-1 text-green-500 hover:bg-green-500/10 rounded transition-colors"
                                    title="Mark as Paid"
                                  >
                                    <CheckCircle size={14} />
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button 
                                  onClick={() => handleOpenModal('students', 'edit', student)}
                                  className="p-2 text-gray-500 hover:text-white transition-colors"
                                ><Edit size={18} /></button>
                                <button 
                                  onClick={() => deleteStudent(student._id)}
                                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                ><Trash2 size={18} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-display">Manage Events</h2>
                    <button 
                      onClick={() => handleOpenModal('events')}
                      className="btn-primary py-2 px-6 text-sm flex items-center space-x-2"
                    >
                      <Plus size={18} />
                      <span>Add Event</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => (
                      <div key={event._id} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex gap-6">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-24 h-24 object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow">
                          <h4 className="font-bold text-lg mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-500 mb-4">{new Date(event.date).toLocaleDateString()}</p>
                          <div className="flex items-center space-x-4">
                            <button 
                              onClick={() => handleOpenModal('events', 'edit', event)}
                              className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors flex items-center space-x-1"
                            >
                              <Edit size={14} />
                              <span>Edit</span>
                            </button>
                            <button 
                              onClick={() => deleteEvent(event._id)}
                              className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors flex items-center space-x-1"
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'gallery' && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-display">Manage Gallery</h2>
                    <button 
                      onClick={() => handleOpenModal('gallery')}
                      className="btn-primary py-2 px-6 text-sm flex items-center space-x-2"
                    >
                      <Plus size={18} />
                      <span>Upload Image</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {gallery.map((img) => (
                      <div key={img._id} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10">
                        <img 
                          src={img.image} 
                          alt="Gallery" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            onClick={() => deleteGalleryImage(img._id)}
                            className="bg-red-500 p-2 rounded-full text-white hover:scale-110 transition-transform"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {modal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass w-full max-w-2xl p-8 rounded-3xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-display uppercase tracking-widest">
                  {modal.mode} {modal.type.slice(0, -1)}
                </h3>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {modal.type === 'students' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                      <input 
                        type="text" required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Belt Rank</label>
                      <select 
                        value={formData.beltRank || 'White'}
                        onChange={(e) => setFormData({...formData, beltRank: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                      >
                        {['White', 'Yellow', 'Green', 'Blue', 'Red', 'Black'].map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Date of Birth</label>
                      <input 
                        type="date" required
                        value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone</label>
                      <input 
                        type="text" required
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                      <input 
                        type="email" required
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Pending Fees ($)</label>
                      <div className="flex items-center space-x-4">
                        <input 
                          type="number" required
                          value={formData.feesPending || 0}
                          onChange={(e) => setFormData({...formData, feesPending: parseInt(e.target.value) || 0})}
                          className="flex-grow bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                        />
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, feesPending: 0})}
                          className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${formData.feesPending === 0 ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                        >
                          Paid
                        </button>
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, feesPending: 150})}
                          className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${formData.feesPending > 0 ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                        >
                          Unpaid
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-500 italic">Set to 0 if student has paid in full.</p>
                    </div>
                  </div>
                )}

                {modal.type === 'events' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Event Title</label>
                      <input 
                        type="text" required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Date</label>
                        <input 
                          type="date" required
                          value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Image URL</label>
                        <input 
                          type="text" required
                          value={formData.image || ''}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Description</label>
                      <textarea 
                        rows="4" required
                        value={formData.description || ''}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none resize-none"
                      />
                    </div>
                  </div>
                )}

                {modal.type === 'gallery' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Image URL</label>
                    <input 
                      type="text" required
                      value={formData.image || ''}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-primary outline-none"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={handleCloseModal} className="btn-outline flex-1 py-3">Cancel</button>
                  <button type="submit" className="btn-primary flex-1 py-3">Save {modal.type.slice(0, -1)}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
