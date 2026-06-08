import { useState } from 'react';
import { mockCars } from '../data/mockData';
import VehicleCard from '../components/shared/VehicleCard';
import FilterPanel from '../components/shared/FilterPanel';
import SearchBar from '../components/shared/SearchBar';

export default function CarListing() {
  const [filteredCars, setFilteredCars] = useState(mockCars);
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeTextSearch, setActiveTextSearch] = useState('');

  const applySorting = (cars, sort) => {
    const sorted = [...cars];
    switch (sort) {
      case 'price_low':   return sorted.sort((a, b) => a.price   - b.price);
      case 'price_high':  return sorted.sort((a, b) => b.price   - a.price);
      case 'year_new':    return sorted.sort((a, b) => b.year    - a.year);
      case 'mileage_low': return sorted.sort((a, b) => a.mileage - b.mileage);
      default:            return sorted;
    }
  };

  const handleFilterChange = (filters) => {
    let result = mockCars;

    // 1. Handle Top SearchBar Text Input Queries
    if (activeTextSearch) {
      const query = activeTextSearch.toLowerCase();
      result = result.filter(
        (car) =>
          car.brand?.toLowerCase().includes(query) ||
          car.model?.toLowerCase().includes(query) ||
          car.location?.toLowerCase().includes(query)
      );
    }

    // 2. Dropdown Filter: Car Model (e.g. Swift, i20) matches car.model
    if (filters.model) {
      result = result.filter((c) => c.model?.toLowerCase() === filters.model.toLowerCase());
    }

    // 3. Dropdown Filter: City Location matches car.location
    if (filters.city) {
      result = result.filter((c) => c.location?.toLowerCase() === filters.city.toLowerCase());
    }

    // 4. Dropdown Filter: Model Year Check (Safe typecasting comparison)
    if (filters.year) {
      result = result.filter((c) => c.year?.toString() === filters.year.toString());
    }

    // 5. Dropdown Filter: Make (Brand) matches car.brand
    if (filters.make) {
      result = result.filter((c) => c.brand?.toLowerCase() === filters.make.toLowerCase());
    }

    // 6. Dropdown Filter: Body Style (Sedan, SUV) matches car.bodyStyle if present
    if (filters.bodyStyle) {
      result = result.filter((c) => c.bodyStyle?.toLowerCase() === filters.bodyStyle.toLowerCase());
    }

    // 7. Slider: Price Range Check
    if (filters.priceRange) {
      result = result.filter(
        (c) => c.price >= filters.priceRange[0] && c.price <= filters.priceRange[1]
      );
    }

    // 8. Dropdown Filter: Max Mileage Check
    if (filters.mileage) {
      result = result.filter((c) => c.mileage <= parseInt(filters.mileage, 10));
    }

    setFilteredCars(applySorting(result, sortBy));
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setFilteredCars(applySorting(filteredCars, newSort));
  };

  const handleSearchSubmit = (value) => {
    setActiveTextSearch(value);
    const filtered = mockCars.filter(
      (car) =>
        car.brand?.toLowerCase().includes(value.toLowerCase()) ||
        car.model?.toLowerCase().includes(value.toLowerCase()) ||
        car.location?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCars(applySorting(filtered, sortBy));
  };

  return (
    <div className="min-h-screen bg-slate-50 w-full text-slate-800">
      
      {/* Top Search Controls Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-96">
            <SearchBar onSearch={handleSearchSubmit} isHeroVariant={false} />
          </div>

          <div className="flex gap-2 items-center justify-end w-full md:w-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              List
            </button>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg outline-none cursor-pointer focus:border-orange-500"
            >
              <option value="relevance">Relevance</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="year_new">Newest First</option>
              <option value="mileage_low">Lowest Mileage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Structural Grid Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-8 items-start">
          
          {/* Desktop Filtering Sidebar Container */}
          <aside className="hidden md:block w-64 shrink-0 bg-white border border-slate-200/80 rounded-xl shadow-xs sticky top-24">
            <FilterPanel onFilterChange={handleFilterChange} isOpen={false} />
          </aside>

          {/* Mobile Layout Filter Drawer Container */}
          <div className="md:hidden">
            <FilterPanel 
              onFilterChange={handleFilterChange} 
              isOpen={isFilterOpen} 
              onClose={() => setIsFilterOpen(false)} 
            />
          </div>

          {/* Main Inventory Results Stream Box */}
          <div className="flex-1 min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Showing <span className="text-slate-900 font-black">{filteredCars.length}</span> results
              </p>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg bg-white text-slate-700"
              >
                Filters
              </button>
            </div>

            {filteredCars.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'flex flex-col gap-4'}>
                {filteredCars.map((car) => (
                  <VehicleCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" className="mx-auto mb-3">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <p className="text-sm font-semibold text-slate-500">No matching items found in inventory list.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
