import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { isCarSaved, saveCarId, unsaveCarId } from '../../data/savedCarsStorage';

export default function VehicleCard({ car, onViewDetails, onUnsave }) {
  const [isSaved, setIsSaved] = useState(() => isCarSaved(car?.id));
  const [imgSrc, setImgSrc] = useState(car?.image);
  const navigate = useNavigate();

  if (!car) return null;

  const formatPrice = (price) => `₹${(price / 100000).toFixed(1)}L`;
  const formatMileage = (mileage) => `${mileage?.toLocaleString() || 0} km`;

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      unsaveCarId(car.id);
      setIsSaved(false);
      if (typeof onUnsave === 'function') onUnsave(car.id);
    } else {
      saveCarId(car.id);
      setIsSaved(true);
    }
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onViewDetails === 'function') {
      onViewDetails(car.id);
    } else {
      navigate(`/cars/${car.id}`);
    }
  };

  const handleImageError = () => {
    if (car.fallback_image && imgSrc !== car.fallback_image) {
      setImgSrc(car.fallback_image);
    } else {
      setImgSrc('https://placehold.co/400x250?text=Vehicle+Image');
    }
  };

  return (
    <Link to={`/cars/${car.id}`} className="block group select-none">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/60 transition-all duration-300 flex flex-col h-full">
        
        {/* Card Image */}
        <div className="relative bg-slate-100 h-48 w-full overflow-hidden">
          <img
            src={imgSrc}
            alt={`${car.brand} ${car.model}`}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          
          <button
            onClick={handleSave}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white active:scale-90 transition z-10"
            aria-label={isSaved ? 'Remove from saved' : 'Save car'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isSaved ? '#E11D48' : 'none'}
              stroke={isSaved ? '#E11D48' : '#475569'}
              strokeWidth="2.5"
              className="transition-colors duration-200"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {car.inspection_score >= 4.5 && (
            <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
              Certified
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 justify-between">
          <div className="mb-3">
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-wider mb-0.5">
              {car.brand}
            </p>
            <h3 className="text-base font-bold text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
              {car.model}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Model Year {car.year} • {car.location}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1 py-2.5 border-t border-b border-slate-100 mb-3 bg-slate-50/50 rounded-lg px-1">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Driven</span>
              <span className="text-xs font-bold text-slate-800">{formatMileage(car.mileage)}</span>
            </div>
            <div className="text-center border-l border-r border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Fuel</span>
              <span className="text-xs font-bold text-slate-800">{car.fuel}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Gearbox</span>
              <span className="text-xs font-bold text-slate-800 text-ellipsis overflow-hidden block whitespace-nowrap">{car.transmission}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-900 font-black text-xl tracking-tight">
              {formatPrice(car.price)}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#D97706" stroke="none">
                <polygon points="12 2 15.09 10.26 23.77 10.36 17.13 16.01 19.09 24.29 12 18.54 4.91 24.29 6.87 16.01 0.23 10.36 8.91 10.26 12 2" />
              </svg>
              <span className="text-xs font-black text-amber-800">{car.inspection_score}</span>
            </div>
          </div>

          <div
            onClick={handleDetailsClick}
            className="w-full bg-slate-900 text-white py-2 rounded-lg font-bold text-xs hover:bg-indigo-600 active:scale-[0.99] transition-all text-center block cursor-pointer shadow-sm"
          >
            View Details
          </div>
        </div>

      </div>
    </Link>
  );
}
