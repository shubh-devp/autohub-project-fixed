import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../App';

const iconMap = {
  home: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4h4" />
    </svg>
  ),
  heart: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  shopping: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  file: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  user: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  list: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  inbox: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  wallet: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
};

const sidebarMenus = {

  seller: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', to: '/seller-dashboard' },
    { id: 'listings', label: 'My Listings', icon: 'list', to: '/seller-listings' },
    { id: 'offers', label: 'Offers', icon: 'inbox', to: '/seller-offers' },
    { id: 'inspections', label: 'Inspections', icon: 'check', to: '/seller-inspections' },
    { id: 'payouts', label: 'Payouts', icon: 'wallet', to: '/seller-payouts' },
    { id: 'profile', label: 'Profile', icon: 'user', to: '/profile' },
  ],
  buyer: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', to: '/buyer-dashboard' },
    { id: 'saved', label: 'Saved Cars', icon: 'heart', to: '/buyer-dashboard/saved' },
    { id: 'orders', label: 'My Orders', icon: 'shopping', to: '/buyer-dashboard/orders' },
    { id: 'docs', label: 'Documents', icon: 'file', to: '/buyer-dashboard/documents' },
    { id: 'profile', label: 'Profile', icon: 'user', to: '/profile' },
  ]
};

export default function Sidebar({ userRole = 'buyer', userName = 'User', userAvatar }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const normalizedRole = userRole?.toLowerCase();
  const currentMenu = sidebarMenus[normalizedRole] || sidebarMenus.buyer;

  const defaultAvatar = "https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80";

  const handleLogout = () => {
    setIsOpen(false);
    if (typeof logout === 'function') logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Toggle Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
        aria-label="Toggle navigation structural layer menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Dimmed Overlay mobile dark room screen view backdrop background overlay shield */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity cursor-pointer"
        />
      )}

      {/* Primary Sidebar Body Content Container */}
      <aside
        className={`fixed top-0 left-0 md:sticky w-64 h-screen bg-slate-900 text-slate-100 border-r border-slate-800 shadow-xl md:shadow-none transform transition-transform duration-300 ease-in-out z-50 flex flex-col shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* User Workspace Identity Profile Header Info Box Component */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <img 
              src={userAvatar || defaultAvatar} 
              alt={userName} 
              className="w-10 h-10 rounded-full object-cover border border-slate-700 bg-slate-800" 
              onError={(e) => { e.target.src = defaultAvatar; }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate leading-tight">{userName}</p>
              <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mt-0.5">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Navigation Action Control Links Streams Node Wrapper */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-none">
          {currentMenu.map((item) => {
            // FIXED: Dashboard enforces exact matching, sub pages allow trailing path segment expansions cleanly
            const isCurrentActive = item.id === 'dashboard'
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.id}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-xs tracking-wide transition-all ${
                  isCurrentActive
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className={isCurrentActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}>
                  {iconMap[item.icon] || iconMap.home}
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* System Workspace Log termination button menu footer card node container */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors font-medium text-xs tracking-wide text-left cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}