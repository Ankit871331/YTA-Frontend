import { Link } from 'react-router-dom';
import { Shield, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="bg-dark-lighter pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">Contact </Link>
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-display font-bold uppercase tracking-tighter">YTA <span className="text-primary">TKD</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering individuals through the art of Taekwondo. Discipline, respect, and excellence in every kick.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/youth_taekwondo_academy_" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/classes" className="hover:text-primary transition-colors">Class Schedule</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Upcoming Events</Link></li>
              <li><Link to="/portal" className="hover:text-primary transition-colors">Student Portal</Link></li>
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h4 className="text-lg font-display mb-6">Our Classes</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/classes" className="hover:text-primary transition-colors">Beginner Program</Link></li>
              <li><Link to="/classes" className="hover:text-primary transition-colors">Intermediate Program</Link></li>
              <li><Link to="/classes" className="hover:text-primary transition-colors">Advanced Program</Link></li>
              <li><Link to="/classes" className="hover:text-primary transition-colors">Black Belt Club</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-primary" />
                <span>Sec-22 Mullahera, Gurgaon Haryana</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <span>+91 95603 12832</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <span>subhamtkdc@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Elite Taekwondo Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
