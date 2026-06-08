import { Link } from 'react-router-dom';
import { useAuth } from '../../App';

export default function Footer() {
  const { isLoggedIn, userRole } = useAuth();
  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800">
      {/* Main Footer Context Layout Block Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Profile & Outgoing Channels */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 bg-indigo-600 group-hover:bg-indigo-500 rounded-lg flex items-center justify-center font-black text-white text-sm transition-colors shadow-md shadow-indigo-600/10">
                AH
              </div>
              <span className="font-black text-base tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                Autohub
              </span>
            </Link>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs">
              The trusted marketplace to buy and sell verified vehicles with peace of mind and verified inspection analytics.
            </p>
            {/* Outgoing Asset Profile Channels Container */}
            <div className="flex gap-2.5 pt-2">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 bg-slate-800 text-slate-400 rounded-lg flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-200"
                aria-label="Follow our platform updates on Twitter/X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 bg-slate-800 text-slate-400 rounded-lg flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-200"
                aria-label="Connect with our marketplace community on Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Browse & Search Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Browse</h3>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link to="/cars" className="text-slate-400 hover:text-white transition-colors">Cars for Sale</Link></li>
              <li><Link to="/auctions" className="text-slate-400 hover:text-white transition-colors">Live Auctions</Link></li>
              <li><Link to="/financing" className="text-slate-400 hover:text-white transition-colors">Financing Options</Link></li>
              <li><Link to="/insurance" className="text-slate-400 hover:text-white transition-colors">Vehicle Insurance</Link></li>
            </ul>
          </div>

          {/* Column 3: Seller Operations Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">For Sellers</h3>
            <ul className="space-y-2 text-xs font-semibold">
              {isLoggedIn && userRole === 'seller' ? (
                <>
                  <li><Link to="/sell" className="text-slate-400 hover:text-white transition-colors">Sell Your Car</Link></li>
                  <li><Link to="/seller-dashboard" className="text-slate-400 hover:text-white transition-colors">Seller Dashboard</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/register" className="text-slate-400 hover:text-white transition-colors">Become a Seller</Link></li>
                </>
              )}
              <li><Link to="/bulk-upload" className="text-slate-400 hover:text-white transition-colors">Bulk Inventory Upload</Link></li>
              <li><Link to="/pricing-guide" className="text-slate-400 hover:text-white transition-colors">Market Valuation Evaluation Guide</Link></li>
            </ul>
          </div>

          {/* Column 4: Platform Security & Support Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Trust &amp; Safety</h3>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link to="/safety" className="text-slate-400 hover:text-white transition-colors">Safety Tips</Link></li>
              <li><Link to="/inspections" className="text-slate-400 hover:text-white transition-colors">Inspection Framework Process</Link></li>
              <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Shield Mandate</Link></li>
              <li><Link to="/support" className="text-slate-400 hover:text-white transition-colors">Contact Technical Support</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer Ledger Section */}
      <div className="border-t border-slate-800 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
          <p>© {new Date().getFullYear()} Autohub. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Configurations</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


