import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  sellerDashboardStats, 
  sellerListings, 
  sellerOffers, 
  mockSellerProfile 
} from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../App';

export default function SellerDashboard() {
  const { userData } = useAuth();
  const displayName = userData?.name || mockSellerProfile.name || 'Seller';
  const [activeTab, setActiveTab] = useState('listings');
  const [offersList, setOffersList] = useState(sellerOffers);

  const handleAcceptOffer = (id) => {
    setOffersList(prev => prev.map(o => o.id === id ? { ...o, status: 'accepted' } : o));
  };

  const handleRejectOffer = (id) => {
    setOffersList(prev => prev.map(o => o.id === id ? { ...o, status: 'rejected' } : o));
  };

  const formatPrice = (price) => {
    return `₹${(price / 100000).toFixed(2)}L`;
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        userRole="seller"
        userName={displayName}
        userAvatar={userData?.avatar || null}
      />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* Upper Header Control Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Seller Control Center
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Analyze system conversions, monitor listing exposure, and audit active transactions.
            </p>
          </div>
          <Link
            to="/sell"
            className="w-full sm:w-auto text-center px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
          >
            + Create New Listing
          </Link>
        </div>

        {/* Aggregated Analytical Cards Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {sellerDashboardStats?.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {stat.label}
                </span>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
              {stat.trend && (
                <div className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
                  <span>📈</span> {stat.trend} growth
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stateful Navigation Sub-tabs Shell */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="flex gap-6 border-b border-slate-100 px-6 bg-slate-50/50">
            {[
              { key: 'listings', label: `Active Inventory (${sellerListings.length})` },
              { key: 'offers', label: `Pending Offers (${offersList.filter(o => o.status === 'pending').length})` },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-4 font-bold text-sm border-b-2 transition-all relative ${
                  activeTab === key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-6">
            {/* Active Inventory Tab Pane */}
            {activeTab === 'listings' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="text-left pb-3 pl-2">Vehicle Asset</th>
                      <th className="text-left pb-3">Target Price</th>
                      <th className="text-left pb-3">Impressions</th>
                      <th className="text-left pb-3">Bids Logged</th>
                      <th className="text-left pb-3">Status</th>
                      <th className="text-right pb-3 pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {sellerListings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-slate-50/30 transition">
                        <td className="py-3.5 pl-2 font-bold text-slate-900">{listing.car_name}</td>
                        <td className="py-3.5 font-medium">{formatPrice(listing.price)}</td>
                        <td className="py-3.5 font-semibold text-slate-500">{listing.views}</td>
                        <td className="py-3.5 font-semibold text-slate-500">{listing.offers}</td>
                        <td className="py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase border ${
                            listing.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : listing.status === 'Sold' ? 'bg-slate-50 text-slate-500 border-slate-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {listing.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right pr-2">
                          <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition">
                            Modify
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Buyer Negotiations Tab Pane */}
            {activeTab === 'offers' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="text-left pb-3 pl-2">Vehicle Model</th>
                      <th className="text-left pb-3">Buyer Signature</th>
                      <th className="text-left pb-3">Proposed Value</th>
                      <th className="text-left pb-3">Submission Date</th>
                      <th className="text-left pb-3">State Log</th>
                      <th className="text-right pb-3 pr-2">Resolution Routing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {offersList.map((offer) => {
                      const statusClean = offer.status?.toLowerCase() || 'pending';
                      
                      return (
                        <tr key={offer.id} className="hover:bg-slate-50/30 transition">
                          <td className="py-3.5 pl-2 font-bold text-slate-900">{offer.car_name}</td>
                          <td className="py-3.5 font-semibold text-slate-600">{offer.buyer_name}</td>
                          <td className="py-3.5 font-bold text-slate-900 text-base">{formatPrice(offer.amount)}</td>
                          <td className="py-3.5 text-slate-500 font-medium">{offer.offer_date || 'Today'}</td>
                          <td className="py-3.5">
                            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase border ${
                              statusClean === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : statusClean === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {statusClean}
                            </span>
                          </td>
                          <td className="py-3.5 text-right pr-2">
                            <div className="flex gap-2 justify-end">
                              {statusClean === 'pending' ? (
                                <>
                                  <button 
                                    onClick={() => handleAcceptOffer(offer.id)}
                                    className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition"
                                  >
                                    Accept
                                  </button>
                                  <button 
                                    onClick={() => handleRejectOffer(offer.id)}
                                    className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold hover:bg-rose-100 transition"
                                  >
                                    Decline
                                  </button>
                                </>
                              ) : (
                                <span className={`text-xs font-bold ${statusClean === 'accepted' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                  Archived Logs
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

