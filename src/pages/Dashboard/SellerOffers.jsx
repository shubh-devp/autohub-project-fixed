import { useState } from 'react';
import { useAuth } from '../../App';
import Sidebar from '../../components/layout/Sidebar';
import {
  mockSellerProfile,
  sellerOffers
} from '../../data/mockData';

export default function SellerOffers() {
  const { userData } = useAuth();
  // Bring data into local state to manage instant dashboard updates cleanly
  const [offers, setOffers] = useState(sellerOffers);

  const handleAccept = (id) => {
    setOffers(prevOffers =>
      prevOffers.map(offer =>
        offer.id === id ? { ...offer, status: 'accepted' } : offer
      )
    );
  };

  const handleReject = (id) => {
    setOffers(prevOffers =>
      prevOffers.map(offer =>
        offer.id === id ? { ...offer, status: 'rejected' } : offer
      )
    );
  };

  const formatPrice = (price) => {
    return `₹${(price / 100000).toFixed(2)}L`;
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        userRole="seller"
        userName={userData?.name || mockSellerProfile.name}
        userAvatar={userData?.avatar || null}
      />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Header Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Incoming Negotiations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review, evaluate, and respond to incoming transactional purchase requests from verified buyers.
          </p>
        </div>

        {/* Tabular Layout section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-150 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-800">Active Offers Log</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-150 bg-slate-50/30 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="text-left p-4 pl-6">Verified Buyer</th>
                  <th className="text-left p-4">Vehicle Description</th>
                  <th className="text-left p-4">Listed Value</th>
                  <th className="text-left p-4">Proposed Offer</th>
                  <th className="text-left p-4 pr-6 text-right">Routing Decisions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">
                {offers.length > 0 ? (
                  offers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-slate-50/40 transition">
                      <td className="p-4 pl-6 font-semibold text-slate-900">{offer.buyer_name}</td>
                      <td className="p-4 font-medium text-slate-600">{offer.car_name}</td>
                      <td className="p-4 text-slate-400 line-through">
                        {offer.original_price ? formatPrice(offer.original_price) : 'N/A'}
                      </td>
                      <td className="p-4 font-bold text-slate-900 text-base">
                        {formatPrice(offer.amount)}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex gap-2 justify-end items-center">
                          {offer.status?.toLowerCase() === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleAccept(offer.id)}
                                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 active:scale-95 shadow-sm transition-all"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleReject(offer.id)}
                                className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold hover:bg-rose-100 active:scale-95 transition-all"
                              >
                                Decline
                              </button>
                            </>
                          ) : (
                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-bold border tracking-wide uppercase ${
                                offer.status === 'accepted'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border-rose-200'
                              }`}
                            >
                              Offer {offer.status}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-400 font-medium">
                      No purchasing offers found for your listed inventory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}