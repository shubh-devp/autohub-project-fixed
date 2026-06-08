
import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../App';

export default function Register() {
  const { login, isLoggedIn, userRole } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to={userRole === 'seller' ? '/seller-dashboard' : '/buyer-dashboard'} replace />;
  }

  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    role: 'buyer',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleRoleToggle = (selectedRole) => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Field sanitization processing logic checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
      setError('Please populate all administrative input lines.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Password tokens do not match confirmation input fields.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password security standard requires at least 6 tokens.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login({ 
        id: 'user_' + Date.now(), 
        name: formData.name, 
        email: formData.email, 
        role: formData.role 
      });
      navigate(formData.role === 'seller' ? '/seller-dashboard' : '/buyer-dashboard');
      setLoading(false);
    }, 800);
  };

  const inputStyles = "w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg placeholder-slate-400 text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition";

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />

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

        {/* Central Entry Card Block */}
        <div className="bg-white rounded-xl shadow-xl shadow-slate-950/20 p-6 md:p-8 border border-slate-100">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Create an account
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Gain access to secure car transactional trading systems.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Context Input Field: Identity Tag */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Full Name
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="John Doe" 
                className={inputStyles} 
              />
            </div>

            {/* Context Input Field: Electronic Communication Link */}
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

            {/* Fix: Swapped the messy drop-down selector field for a clean intent layout container block */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Account Purpose Type
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleRoleToggle('buyer')}
                  className={`py-1.5 rounded-md text-xs font-bold transition-all ${
                    formData.role === 'buyer'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Buy Vehicles
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleToggle('seller')}
                  className={`py-1.5 rounded-md text-xs font-bold transition-all ${
                    formData.role === 'seller'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Sell Vehicles
                </button>
              </div>
            </div>

            {/* Context Input Field: Access Passcode Primary Generation */}
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

            {/* Context Input Field: Passcode Corroboration Check */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Confirm Password
              </label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
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
              {loading ? 'Instantiating Ledger Entity...' : 'Complete Sign Up'}
            </button>
          </form>

          {/* Fallback Navigational Redirection Node */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-center text-xs font-medium text-slate-500">
              Already have an active account?{' '}
              <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-800 transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
