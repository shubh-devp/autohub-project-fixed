import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../App';
import {
  mockSellerProfile,
  sellerInspections
} from '../../data/mockData';

export default function SellerInspections() {
  const { userData } = useAuth();
  
  const getStatusStyles = (status = '') => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'scheduled':
      case 'pending':
      case 'in_progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        userRole="seller"
        userName={userData?.name || mockSellerProfile.name}
        userAvatar={userData?.avatar || null}
      />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Page Section Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Vehicle Inspections
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track evaluation bookings, review inspector details, and access certification scores.
          </p>
        </div>

        {/* Dynamic Card Feed Layout Container */}
        <div className="grid gap-4">
          {sellerInspections && sellerInspections.length > 0 ? (
            sellerInspections.map((inspection) => {
              const isDone = inspection.status?.toLowerCase() === 'completed';
              
              return (
                <div
                  key={inspection.id}
                  className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-300 transition"
                >
                  {/* Left Column Description Layout */}
                  <div className="space-y-3 w-full md:w-auto">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Asset Checked</span>
                      <h3 className="font-bold text-lg text-slate-900 leading-tight">
                        {inspection.car_name}
                      </h3>
                    </div>

                    {/* Operational Grid Metrics Metadata row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-slate-600 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">🕵️‍♂️</span>
                        <span>Inspector: <strong className="text-slate-800">{inspection.inspector}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">📅</span>
                        <span>Date Logs: <span className="text-slate-700">{inspection.date}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Action Badge Block */}
                  <div className="flex sm:flex-row md:flex-col items-start md:items-end justify-between md:justify-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block md:text-right mb-1">Status</span>
                      <span className={`px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${getStatusStyles(inspection.status)}`}>
                        {inspection.status || 'Scheduled'}
                      </span>
                    </div>

                    {/* Conditional contextual interactive action links */}
                    <div className="md:mt-1">
                      {isDone ? (
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition">
                          View Report Matrix →
                        </button>
                      ) : (
                        <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition">
                          Reschedule Request
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-400 font-medium">
              No vehicle evaluation history logs are recorded on your profile context currently.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}