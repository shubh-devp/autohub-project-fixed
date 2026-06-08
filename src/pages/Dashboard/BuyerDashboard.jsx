import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCars, buyerDashboardStats, buyerOrders, mockBuyerProfile } from '../../data/mockData';
import VehicleCard from '../../components/shared/VehicleCard';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../App';
import { getSavedIds, unsaveCarId } from '../../data/savedCarsStorage';

export default function BuyerDashboard() {
  const { userData } = useAuth();
  const displayName = userData?.name || mockBuyerProfile.name || 'Buyer';

  const [activeTab, setActiveTab] = useState('saved');

  const [savedCars, setSavedCars] = useState(() => {
    const ids = getSavedIds();
    return mockCars.filter((car) => ids.includes(car.id));
  });

  const handleUnsave = (carId) => {
    unsaveCarId(carId);
    setSavedCars((prev) => prev.filter((c) => c.id !== carId));
  };

  const formatPrice = (price) => `₹${(price / 100000).toFixed(2)}L`;

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('transit')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (s.includes('deliver')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        userRole="buyer"
        userName={displayName}
        userAvatar={userData?.avatar || null}
      />

      <div className="flex-1 pt-20 md:pt-0 overflow-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, {displayName} 👋
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              View your saved cars, track orders, and manage your documents.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {buyerDashboardStats?.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {stat.label}
                  </span>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  {stat.trend && <p className="text-xs font-bold text-emerald-600 mt-1">📈 {stat.trend}</p>}
                </div>
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50">
                  {stat.icon === 'heart' && (
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )}
                  {stat.icon === 'tag' && (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  )}
                  {stat.icon === 'eye' && (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="flex gap-6 border-b border-slate-100 px-6 bg-slate-50/50 overflow-x-auto">
              {[
                { key: 'saved', label: `Saved Cars (${savedCars.length})` },
                { key: 'orders', label: `My Orders (${buyerOrders.length})` },
                { key: 'documents', label: 'Documents' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`py-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${
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

              {activeTab === 'saved' && (
                savedCars.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedCars.map((car) => (
                      <VehicleCard key={car.id} car={car} onUnsave={handleUnsave} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 max-w-sm mx-auto">
                    <p className="text-sm text-slate-500 mb-3">No saved cars yet. Click the ❤️ on any listing to save it.</p>
                    <Link to="/cars" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition">
                      Browse Listings →
                    </Link>
                  </div>
                )
              )}

              {activeTab === 'orders' && (
                buyerOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-150 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <th className="text-left pb-3 pl-2">Car</th>
                          <th className="text-left pb-3">Order Date</th>
                          <th className="text-left pb-3">Status</th>
                          <th className="text-right pb-3 pr-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {buyerOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/30 transition">
                            <td className="py-3.5 pl-2 font-bold text-slate-900">{order.car_name}</td>
                            <td className="py-3.5 text-slate-500 font-medium">{order.order_date || 'Today'}</td>
                            <td className="py-3.5">
                              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase border ${getStatusStyles(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right pr-2 font-black text-slate-900">
                              {formatPrice(order.price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-slate-500">No orders yet.</p>
                  </div>
                )
              )}

              {activeTab === 'documents' && (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 max-w-md mx-auto my-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5">Documents</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Vehicle documents and insurance certificates appear here after a purchase is completed.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

