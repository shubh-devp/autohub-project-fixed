import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { mockSellerProfile, mockCars } from '../../data/mockData';
import { useAuth } from '../../App';

export default function SellerListings() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState(mockCars);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this vehicle listing?")) {
      setListings(prev => prev.filter(car => car.id !== id));
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
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
        {/* Upper Header Actions Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              My Listings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your active vehicle listings.
            </p>
          </div>
          
          <Link
            to="/sell"
            className="w-full sm:w-auto text-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
          >
            + Create New Listing
          </Link>
        </div>

        {/* Listings Core Matrix Stack */}
        <div className="grid gap-4">
          {listings.length > 0 ? (
            listings.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl p-4 md:p-5 border border-slate-200/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-slate-300"
              >
                {/* Structural Asset Details Wrapper */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Vehicle Mock Image Block Thumbnail */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-150 flex items-center justify-center text-slate-400">
                    {car.image || car.imageUrl ? (
                      <img 
                        src={car.image || car.imageUrl} 
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    )}
                  </div>

                  {/* Operational Data Fields */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-base md:text-lg text-slate-900 leading-tight">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">
                      {car.year} • {car.kms_driven?.toLocaleString() || '0'} km • {car.fuel_type || 'Petrol'}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0x" />
                      </svg>
                      {car.location || 'Pan India'}
                    </div>
                  </div>
                </div>

                {/* Pricing & Control Function Blocks */}
                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Asking Value</span>
                    <span className="text-xl font-black text-slate-900">{formatPrice(car.price)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/sell?edit=${car.id}`)}
                      className="px-3.5 py-1.5 border border-slate-200 text-slate-700 bg-white rounded-lg text-xs font-bold hover:bg-slate-50 active:scale-95 transition-all"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(car.id)}
                      className="px-3.5 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 active:scale-95 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-500 font-medium">
              Your sales inventory is completely blank right now. Click above to add your first vehicle.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

