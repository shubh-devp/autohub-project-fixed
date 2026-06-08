// import { useState } from 'react';

// export default function SearchBar({ onSearch, isHeroVariant = false }) {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Fix: Added safety protection guard against missing/undefined callback errors
//     if (typeof onSearch === 'function') {
//       onSearch(searchTerm.trim());
//     } else {
//       console.warn('SearchBar component executed a submit event without an active onSearch prop binding.');
//     }
//   };

//   // Build uniform layout configurations dynamically based on variant context
//   const formWrapperClass = isHeroVariant 
//     ? 'w-full max-w-2xl mx-auto' 
//     : 'w-full max-w-md';

//   const inputContainerClass = isHeroVariant
//     ? 'flex gap-2 bg-white rounded-xl overflow-hidden shadow-md border border-slate-200/40 p-1 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-transparent transition-all duration-200'
//     : 'relative flex items-center bg-white rounded-lg border border-slate-200 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 transition-all duration-200';

//   const inputFieldClass = isHeroVariant
//     ? 'flex-1 px-4 py-3 text-base border-none outline-none text-slate-800 placeholder-slate-400 bg-transparent'
//     : 'w-full pl-4 pr-11 py-2 text-sm border-none outline-none text-slate-800 placeholder-slate-400 bg-transparent rounded-lg';

//   return (
//     <form onSubmit={handleSubmit} className={formWrapperClass}>
//       <div className={inputContainerClass}>
//         <input
//           type="text"
//           placeholder={isHeroVariant ? "Search by brand, model, or location..." : "Search cars..."}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className={inputFieldClass}
//           aria-label="Search vehicle database inventory"
//         />

//         {isHeroVariant ? (
//           /* Large Hero Layout Submission CTA Callout Button */
//           <button
//             type="submit"
//             className="bg-indigo-600 text-white px-6 py-2.5 font-bold text-sm rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 flex items-center gap-2 shadow-sm shrink-0"
//           >
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//               <circle cx="11" cy="11" r="8" />
//               <path d="m21 21-4.35-4.35" />
//             </svg>
//             Search
//           </button>
//         ) : (
//           /* Standard Component Inline Contextual Search Node Button Icon */
//           <button
//             type="submit"
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors duration-200"
//             aria-label="Execute lookup query"
//           >
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//               <circle cx="11" cy="11" r="8" />
//               <path d="m21 21-4.35-4.35" />
//             </svg>
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }


import { useState } from 'react';

export default function FilterPanel({ onFilterChange, isOpen, onClose }) {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    priceRange: [300000, 2000000],
    year: '',
    mileage: '',
    bodyStyle: '',
    city: '', // Added City state attribute
  });

  const makes = ['Maruti', 'Hyundai', 'Tata', 'Mahindra', 'Renault', 'Honda'];
  const bodyStyles = ['Sedan', 'SUV', 'Hatchback', 'MUV', 'Coupe'];
  
  // Custom specifications dynamic option pools
  const modelOptions = ['Nexon', 'XUV500', 'Kwid', 'City', 'Swift', 'i20'];
  const cityOptions = ['Mumbai', 'Pune', 'Hyderabad', 'Ahmedabad', 'Bangalore', 'Delhi'];
  const yearOptions = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (typeof onFilterChange === 'function') {
      onFilterChange(newFilters);
    }
  };

  const handlePriceChange = (e) => {
    const value = [filters.priceRange[0], parseInt(e.target.value, 10)];
    handleFilterChange('priceRange', value);
  };

  const handleReset = () => {
    const resetFilters = {
      make: '',
      model: '',
      priceRange: [300000, 2000000],
      year: '',
      mileage: '',
      bodyStyle: '',
      city: '',
    };
    setFilters(resetFilters);
    if (typeof onFilterChange === 'function') {
      onFilterChange(resetFilters);
    }
  };

  const formatPrice = (price) => {
    return `₹${(price / 100000).toFixed(1)}L`;
  };

  return (
    <>
      {/* Mobile Overlay Background Shield */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Filter Panel Container Box */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white z-50 md:z-auto transform transition-transform duration-300 md:transform-none overflow-y-auto md:overflow-visible ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Close Button UI (Visible on Mobile Only) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-slate-600 hover:text-slate-900 z-50"
          aria-label="Close filters menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Filters</h3>
          </div>

          {/* Dynamic Requirement Dropdown 1: Car Model Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Car Model</label>
            <select
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white text-slate-700 cursor-pointer"
            >
              <option value="">All Models</option>
              {modelOptions.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Requirement Dropdown 2: City Location Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">City Location</label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white text-slate-700 cursor-pointer"
            >
              <option value="">All Cities</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Requirement Dropdown 3: Production Year Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Model Year</label>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white text-slate-700 cursor-pointer"
            >
              <option value="">Any Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Core Feature Option: Make Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Make (Brand)</label>
            <select
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white text-slate-700 cursor-pointer"
            >
              <option value="">All Makes</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Core Feature Option: Body Style Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Body Style</label>
            <select
              value={filters.bodyStyle}
              onChange={(e) => handleFilterChange('bodyStyle', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white text-slate-700 cursor-pointer"
            >
              <option value="">All Styles</option>
              {bodyStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Max Price: {formatPrice(filters.priceRange[1])}
            </label>
            <input
              type="range"
              min="300000"
              max="2000000"
              step="50000"
              value={filters.priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
              <span>{formatPrice(300000)}</span>
              <span>{formatPrice(2000000)}</span>
            </div>
          </div>

          {/* Max Mileage Constraint */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Max Mileage</label>
            <select
              value={filters.mileage}
              onChange={(e) => handleFilterChange('mileage', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white text-slate-700 cursor-pointer"
            >
              <option value="">Any Mileage</option>
              <option value="50000">Up to 50,000 km</option>
              <option value="100000">Up to 100,000 km</option>
              <option value="150000">Up to 150,000 km</option>
            </select>
          </div>

          {/* Layout Footer Operational Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-slate-200">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-semibold hover:bg-orange-600 active:scale-[0.98] transition md:hidden"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

