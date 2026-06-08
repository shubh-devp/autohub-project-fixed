

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCars } from '../data/mockData';
import VehicleCard from '../components/shared/VehicleCard';
import SearchBar from '../components/shared/SearchBar';

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched]     = useState(false);
  const navigate = useNavigate();

  const handleSearch = (term) => {
    setHasSearched(true);
    if (term.trim()) {
      const filtered = mockCars.filter(
        (car) =>
          car.brand.toLowerCase().includes(term.toLowerCase()) ||
          car.model.toLowerCase().includes(term.toLowerCase()) ||
          car.location.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(mockCars);
    }
  };

  const bodyTypes = [
    { name: 'Sedan',    count: 12 },
    { name: 'SUV',      count: 28 },
    { name: 'Hatchback',count: 15 },
    { name: 'MUV',      count: 8  },
  ];

  const displayedCars = hasSearched ? searchResults : mockCars.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Fixed Background Overlay Layout */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        <img
          src="https://t4.ftcdn.net/jpg/06/47/49/29/360_F_647492977_BqqDnIZdRjA3jLCWl8WPGO3Eb8B6HYy1.jpg" 
          alt="AutoHub Hero Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-2 pointer-events-none"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-4">
              Find Your Perfect Car
            </h1>
            <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto">
              Browse verified pre-owned cars with complete inspection reports and transparent pricing
            </p>
          </div>
          <SearchBar onSearch={handleSearch} isHeroVariant={true} />
        </div>
      </section>

      {/* Browse by Category */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Browse by Body Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bodyTypes.map((type) => (
            <div
              key={type.name}
              onClick={() => navigate('/cars')}
              className="bg-white rounded-lg p-6 text-center hover:shadow-md transition border border-slate-100 cursor-pointer"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5">
                  <path d="M19 8H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
                  <circle cx="7" cy="17" r="1.5" />
                  <circle cx="17" cy="17" r="1.5" />
                  <path d="M5 12h14" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">{type.name}</h3>
              <p className="text-sm text-slate-600">{type.count} cars</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured / Search Results */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          {hasSearched ? 'Search Results' : 'Featured Cars'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>

        {hasSearched && searchResults.length === 0 && (
          <div className="text-center py-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6B7E8E" strokeWidth="1.5" className="mx-auto mb-4">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p className="text-base text-slate-600">No cars found. Try adjusting your search.</p>
          </div>
        )}

        {!hasSearched && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/cars')}
              className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition text-base shadow-sm"
            >
              View All Cars
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to Sell Your Car?
          </h2>
          <p className="text-base text-orange-100 mb-6">
            Get competitive offers from verified buyers in just a few minutes
          </p>
          <button
            onClick={() => navigate('/sell')}
            className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition shadow-sm"
          >
            Start Selling
          </button>
        </div>
      </section>
    </div>
  );
}
