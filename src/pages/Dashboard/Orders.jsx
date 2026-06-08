import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { buyerOrders } from '../../data/mockData';
import { useAuth } from '../../App';

export default function Orders() {
  const { userData } = useAuth();

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('transit')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (s.includes('deliver')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  const formatPrice = (price) => `₹${(price / 100000).toFixed(2)}L`;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        userRole="buyer"
        userName={userData?.name || 'Buyer'}
        userAvatar={userData?.avatar || null}
      />

      <div className="flex-1 pt-20 md:pt-0 overflow-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track your purchase history and delivery status.
            </p>
          </div>

          {buyerOrders && buyerOrders.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="text-left py-4 px-6">Car</th>
                      <th className="text-left py-4 px-4">Order Date</th>
                      <th className="text-left py-4 px-4">Status</th>
                      <th className="text-right py-4 px-4">Amount</th>
                      <th className="text-right py-4 px-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {buyerOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900">{order.car_name}</td>
                        <td className="py-4 px-4 text-slate-500 font-medium">{order.order_date || 'Processing'}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase border ${getStatusStyles(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right font-black text-slate-900 text-base">
                          {formatPrice(order.price)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition">
                            Track →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center max-w-xl mx-auto my-6 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No orders yet</h3>
              <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">Browse listings and make an offer to get started.</p>
              <Link to="/cars" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-blue-700 transition-all">
                Browse Cars
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
