import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import VehicleCard from '../../components/shared/VehicleCard';
import { mockCars } from '../../data/mockData';
import { getSavedIds, unsaveCarId } from '../../data/savedCarsStorage';
import { useAuth } from '../../App';

export default function SavedCars() {
  const { userData } = useAuth();

  const [carsList, setCarsList] = useState(() => {
    const savedIds = getSavedIds();
    return mockCars.filter((car) => savedIds.includes(car.id));
  });

  const handleUnsave = (carId) => {
    unsaveCarId(carId);
    setCarsList((prev) => prev.filter((car) => car.id !== carId));
  };

  return (
    <DashboardLayout
      userRole="buyer"
      userName={userData?.name || 'Buyer'}
      userAvatar={userData?.avatar || null}
    >
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Saved Cars
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Cars you've saved while browsing. Click the heart icon on any listing to add or remove.
        </p>
      </div>

      {carsList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {carsList.map((car) => (
            <VehicleCard key={car.id} car={car} onUnsave={handleUnsave} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 md:p-16 text-center max-w-xl mx-auto my-6 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No saved cars yet</h3>
          <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
            Click the ❤️ icon on any car card while browsing to save it here.
          </p>
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
          >
            Browse Car Listings
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
