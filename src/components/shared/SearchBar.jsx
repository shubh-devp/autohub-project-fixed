
import { useState } from 'react';

export default function SearchBar({ onSearch, isHeroVariant = false }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Fix: Added architectural safety protection guard against undefined callback errors
    if (typeof onSearch === 'function') {
      onSearch(searchTerm.trim());
    } else {
      console.warn('SearchBar component executed a submit event without an active onSearch prop binding.');
    }
  };

  // Base layout config style wrappers
  const formWrapperClass = isHeroVariant 
    ? 'w-full max-w-2xl mx-auto' 
    : 'w-full max-w-md';

  const inputContainerClass = isHeroVariant
    ? 'flex gap-2 bg-white rounded-xl overflow-hidden shadow-md border border-slate-200/40 p-1 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-transparent transition-all duration-200'
    : 'relative flex items-center bg-white rounded-lg border border-slate-200 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 transition-all duration-200';

  const inputFieldClass = isHeroVariant
    ? 'flex-1 px-4 py-3 text-base border-none outline-none text-slate-800 placeholder-slate-400 bg-transparent'
    : 'w-full pl-4 pr-11 py-2 text-sm border-none outline-none text-slate-800 placeholder-slate-400 bg-transparent rounded-lg';

  return (
    <form onSubmit={handleSubmit} className={formWrapperClass}>
      <div className={inputContainerClass}>
        <input
          type="text"
          placeholder={isHeroVariant ? "Search by brand, model, or location..." : "Search cars..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={inputFieldClass}
          aria-label="Search vehicle database inventory"
        />

        {isHeroVariant ? (
          /* Large Hero Layout Submission CTA Callout Button */
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2.5 font-bold text-sm rounded-lg hover:bg-orange-700 active:scale-[0.98] transition-all duration-200 flex items-center gap-2 shadow-sm shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Search
          </button>
        ) : (
          /* Standard Component Inline Contextual Search Node Button Icon */
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-orange-500 hover:bg-slate-50 transition-colors duration-200"
            aria-label="Execute lookup query"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}