import { useState } from 'react';
import {  mockBuyerProfile, mockSellerProfile } from '../../data/mockData';
import { useAuth } from '../../App';
import Sidebar from '../../components/layout/Sidebar';

export default function Profile() {
  const { userRole, userData } = useAuth();
  
  const fallbackProfile = userRole === 'seller' ? mockSellerProfile : mockBuyerProfile;
  const [formData, setFormData] = useState({
    name: userData?.name || fallbackProfile.name || '',
    email: userData?.email || fallbackProfile.email || '',
    phone: userData?.phone || fallbackProfile.phone || '',
    location: userData?.location || 'Mumbai',
    notifications: { 
      offers: true, 
      messages: true, 
      updates: false 
    },
  });
  
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [name]: checked },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Shared explicitly styled clean inputs helper replacing broken input-base styles
  const inputStyles = "w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none";

  // 1. Map roles directly to their corresponding mock data profile assets
  const profileMap = {
    buyer: mockBuyerProfile,
    seller: mockSellerProfile,
    
  };

  // 2. Resolve the active profile based on the normalized user role string
  const activeProfile = profileMap[userRole?.toLowerCase()] || {};

  const solvedName = userData?.name || activeProfile.name || 'User';
  const solvedAvatar = userData?.avatar || activeProfile.avatar || null;

  return (
    <div className="flex min-h-screen bg-slate-50">
     <Sidebar 
        userRole={userRole || 'buyer'} 
        userName={solvedName} 
        userAvatar={solvedAvatar} 
      />
      <div className="flex-1 pt-20 md:pt-0 overflow-auto">
        <div className="p-4 md:p-8 max-w-2xl mx-auto md:mx-0 w-full">
          
          {/* Header block */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Profile Configuration
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Maintain operational contact anchors, physical routing locations, and system telemetry channels.
            </p>
          </div>

          {/* Success Dialog Banner */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold rounded-xl flex items-center gap-2 animate-fadeIn">
              <span>✅</span> Profile modifications successfully written to account registry ledger.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Structural Form Layer: Personal Metadata */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 md:p-6">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                👤 Personal Registry Details
              </h2>
              
              <div className="space-y-4">
                {[
                  { label: 'Legal Full Name',   name: 'name',  type: 'text'  },
                  { label: 'Verified Email',    name: 'email', type: 'email' },
                  { label: 'Active Contact No', name: 'phone', type: 'tel'   },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type} 
                      name={name} 
                      value={formData[name]} 
                      onChange={handleChange}
                      className={inputStyles}
                      required
                    />
                  </div>
                ))}
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Primary Operational Node
                  </label>
                  <select 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    className={`${inputStyles} appearance-none cursor-pointer`}
                  >
                    {['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Ahmedabad'].map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Control Matrix Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 md:p-6">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                🔔 System Telemetry Routing
              </h2>
              
              <div className="space-y-3.5">
                {[
                  { name: 'offers',   label: 'Incoming Bid Proposals & Pricing Adjustments' },
                  { name: 'messages', label: 'Real-time Inter-user Instant Chat Relays' },
                  { name: 'updates',  label: 'Core Platform Engineering Changelogs' },
                ].map(({ name, label }) => (
                  <label key={name} className="flex items-start gap-3 cursor-pointer group select-none">
                    <input
                      type="checkbox" 
                      name={name}
                      checked={formData.notifications[name]}
                      onChange={handleCheckboxChange}
                      className="mt-0.5 w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500/20 transition-all cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Security Protocol Control Frame */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 md:p-6 flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-slate-900">🛡️ Access Authentication</h2>
                <p className="text-xs text-slate-400 mt-0.5">Update account login keys or clear token profiles.</p>
              </div>
              <button 
                type="button" 
                className="px-3.5 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-bold text-blue-600 hover:bg-slate-50 transition"
              >
                Reset Password
              </button>
            </div>

            {/* Submissions Action Row */}
            <div className="flex gap-3 pt-2">
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
              >
                Commit Changes
              </button>
              <button 
                type="button" 
                className="px-5 py-2.5 border border-slate-200 bg-white text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}