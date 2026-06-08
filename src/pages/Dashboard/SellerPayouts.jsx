import { useMemo } from 'react';
import { useAuth } from '../../App';
import Sidebar from '../../components/layout/Sidebar';
import {
  mockSellerProfile,
  sellerPayouts
} from '../../data/mockData';

export default function SellerPayouts() {
  const { userData } = useAuth();
  // Dynamically compute aggregate metrics from mock metrics arrays safely
  const metrics = useMemo(() => {
    const totalEarnings = sellerPayouts
      .filter(p => p.status?.toLowerCase() === 'completed' || p.status?.toLowerCase() === 'paid')
      .reduce((sum, p) => sum + p.offer_price, 0);

    const pendingClearance = sellerPayouts
      .filter(p => p.status?.toLowerCase() === 'pending' || p.status?.toLowerCase() === 'processing')
      .reduce((sum, p) => sum + p.offer_price, 0);

    return {
      total: totalEarnings,
      pending: pendingClearance,
      count: sellerPayouts.length
    };
  }, []);

  const getStatusStyles = (status = '') => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'pending':
      case 'processing':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'failed':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
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
        {/* Header Elements */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Payout Ledgers
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage your verified balance disbursements and account transfers.
          </p>
        </div>

        {/* Aggregated Performance Metrics Cards Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Disbursed</span>
            <p className="text-2xl font-black text-slate-900">{formatPrice(metrics.total)}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">In Escrow / Pending</span>
            <p className="text-2xl font-black text-amber-600">{formatPrice(metrics.pending)}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Sales Events</span>
            <p className="text-2xl font-black text-blue-600">{metrics.count} Vehicles</p>
          </div>
        </div>

        {/* Tabular Layout Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-150 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-800">Transaction History</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-150 bg-slate-50/30 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="text-left p-4 pl-6">Vehicle Asset Identity</th>
                  <th className="text-left p-4">Settlement Date</th>
                  <th className="text-left p-4">Disbursed Amount</th>
                  <th className="text-left p-4 pr-6">Routing Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">
                {sellerPayouts.length > 0 ? (
                  sellerPayouts.map((payout) => (
                    <tr key={payout.id} className="hover:bg-slate-50/40 transition">
                      <td className="p-4 pl-6 font-semibold text-slate-900">{payout.car_name}</td>
                      <td className="p-4 text-slate-500 font-medium">{payout.date}</td>
                      <td className="p-4 font-bold text-slate-900">
                        {formatPrice(payout.offer_price)}
                      </td>
                      <td className="p-4 pr-6">
                        <span className={`px-2.5 py-1 rounded-md border text-xs font-bold tracking-wide inline-block ${getStatusStyles(payout.status)}`}>
                          {payout.status || 'Completed'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-slate-400 font-medium">
                      No payout logs found on file for this profile.
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
