import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  // Fix: Added click-to-fill capability for frictionless developer/reviewer entry loops
  const handleQuickFill = (email, password) => {
    setFormData({ email, password });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password) {
      setError('Please populate all missing entry points.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (formData.password.length >= 6) {
        let role = 'buyer';

        if (formData.email.includes('seller')) {
          role = 'seller';
        }
        if (formData.email.includes('admin')) {
          role = 'admin';
        }

        login({
          id: 'user_' + Date.now(),
          email: formData.email.trim(),
          role,
          name: formData.email.split('@')[0],
        });

        if (role === 'seller') {
          navigate('/seller-dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/buyer-dashboard');
        }
      } else {
        setError('Invalid matching identification sequence or credentials.');
      }
      setLoading(false);
    }, 800);
  };

  const inputStyles = "w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg placeholder-slate-400 text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition";

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Unified Application Corporate Branding */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white shadow-sm shadow-indigo-500/50 group-hover:scale-105 transition-transform">
              AH
            </div>
            <span className="font-black text-xl text-white tracking-tight">
              Autohub
            </span>
          </Link>
        </div>

        {/* Central Authentication Card Block */}
        <div className="bg-white rounded-xl shadow-xl shadow-slate-950/20 p-6 md:p-8 border border-slate-100">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Sign in to manage your vehicle listings and transactions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Vector: Electronic Identity Matrix Routing Address */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputStyles}
              />
            </div>

            {/* Input Vector: Private Cryptographic Entry Token */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputStyles}
              />
            </div>

            {/* Dynamically Populated Processing Fault Notification Container */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-2">
                <span className="text-base leading-none">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Verification Execution Trigger Action Bar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold shadow-sm shadow-indigo-600/10 hover:bg-indigo-700 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Authorizing Identity Logs...' : 'Sign In'}
            </button>
          </form>

          {/* Fallback Navigational Redirection Node */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-center text-xs font-medium text-slate-500">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-800 transition">
                Sign up
              </Link>
            </p>
          </div>

          
          

        </div>
      </div>
    </div>
  );
}