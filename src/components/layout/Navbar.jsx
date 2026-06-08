import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Pune'];

const NAV_LINKS = {
  guest: [
    { label: 'Buy Cars', to: '/cars' },
    { label: 'Sell Car', to: '/sell' },
    
  ],
  buyer: [
    { label: 'Browse Cars', to: '/cars' },
    { label: 'Compare', to: '/compare' },
    { label: 'My Dashboard', to: '/buyer-dashboard' },
  ],
  seller: [
    { label: 'Browse Store', to: '/cars' },
    { label: 'My Dashboard', to: '/seller-dashboard' },
    { label: 'Sell New Car', to: '/sell' },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin-dashboard' },
    { label: 'Users', to: '/admin-users' },
    { label: 'Listings', to: '/admin-listings' },
  ],
};

export default function Navbar({ 
  userRole = 'guest', 
  isLoggedIn = false, 
  onLogout = () => {}, 
  onCityChange 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCity, setActiveCity] = useState('Mumbai');
  const navigate = useNavigate();

  const currentNavLinks = NAV_LINKS[userRole?.toLowerCase()] || NAV_LINKS.guest;

  const handleLogout = () => {
    setMobileMenuOpen(false);
    if (typeof onLogout === 'function') onLogout();
    navigate('/');
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setActiveCity(selectedCity);
    if (typeof onCityChange === 'function') onCityChange(selectedCity);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md">
      {/* Primary Layout Control Frame */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* Core Brand Identity Node */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 bg-indigo-600 group-hover:bg-indigo-500 rounded-lg flex items-center justify-center font-black text-white text-sm tracking-tighter transition-colors shadow-md shadow-indigo-600/20">
            AH
          </div>
          <span className="font-black text-lg tracking-tight text-white group-hover:text-indigo-400 transition-colors">
            Autohub
          </span>
        </Link>

        {/* Desktop Anchor Track Layout */}
        <nav className="hidden md:flex items-center gap-7">
          {currentNavLinks.map((link) => (
            <Link
              key={link.to + link.label}
              to={link.to}
              className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Global Configuration Controls Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Uncontrolled input flaw resolved via explicit state tracking wrapper */}
          <div className="relative">
            <select 
              value={activeCity}
              onChange={handleCityChange}
              className="bg-slate-800 text-slate-200 text-xs font-semibold px-3 py-2 pr-8 rounded-lg border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all cursor-pointer appearance-none"
            >
              {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-xs font-bold uppercase tracking-wider px-4 py-2 border border-rose-500/30 hover:border-rose-500 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-all duration-200 shadow-sm"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs font-bold uppercase tracking-wider px-3 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-xs font-bold uppercase tracking-wider px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/10 active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Interactive Trigger Elements */}
        <div className="flex md:hidden items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-9 h-9 bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 rounded-xl flex items-center justify-center border border-slate-700/60 transition-colors"
              aria-label="Terminate interface session"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          ) : (
            <Link
              to="/login"
              className="w-9 h-9 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center border border-slate-700/60"
              aria-label="Profile entry portal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors border border-transparent focus:border-slate-700"
            aria-label="Toggle layout content menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Dynamic Popout Mobile Layer Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 text-white animate-fadeIn">
          <div className="p-4 space-y-4">
            <nav className="flex flex-col space-y-1">
              {currentNavLinks.map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className="block text-sm font-semibold px-3 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-slate-800/80 pt-4 px-3">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Active Region Selection
              </label>
              <div className="relative">
                <select 
                  value={activeCity}
                  onChange={handleCityChange}
                  className="w-full bg-slate-800 text-slate-200 text-sm font-semibold px-3 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 appearance-none cursor-pointer"
                >
                  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {!isLoggedIn && (
              <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-2 px-3">
                <Link
                  to="/login"
                  className="block w-full text-center text-sm font-bold uppercase tracking-wide py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center text-sm font-bold uppercase tracking-wide py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
