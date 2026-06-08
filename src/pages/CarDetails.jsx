
import { useState } from 'react';
import { mockCars } from '../data/mockData';
import { useParams, useNavigate } from 'react-router-dom';
import { isCarSaved, saveCarId, unsaveCarId } from '../data/savedCarsStorage';
import { useAuth } from '../App';

export default function CarDetails(){
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, userRole } = useAuth();
 const car = mockCars.find((c) => c.id === parseInt(id)) || mockCars[0];
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(() => isCarSaved(car.id));
  const [selectedImage, setSelectedImage] = useState(0);

  const [loanAmount, setLoanAmount] = useState(car.price);
const [loanYears, setLoanYears] = useState(5);
const [interestRate, setInterestRate] = useState(9);

const calculateEMI = () => {
  const principal = loanAmount;
  const monthlyRate = interestRate / 12 / 100;
  const months = loanYears * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(emi);
};



  const galleryImages = [car.image, car.image, car.image, car.image];

  const specs = [
    { label: 'Brand', value: car.brand },
    { label: 'Model', value: car.model },
    { label: 'Year', value: car.year },
    { label: 'Fuel Type', value: car.fuel },
    { label: 'Transmission', value: car.transmission },
    { label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
    { label: 'Previous Owners', value: car.owner_count },
    { label: 'Location', value: car.location },
  ];

  const formatPrice = (price) => {
    return `₹${(price / 100000).toFixed(1)}L`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {car.brand} {car.model} <span className="text-slate-400 font-medium">({car.year})</span>
          </h1>
          <button
            onClick={() => {
              if (!isLoggedIn) { navigate('/login'); return; }
              if (isSaved) { unsaveCarId(car.id); setIsSaved(false); }
              else { saveCarId(car.id); setIsSaved(true); }
            }}
            className="p-2 hover:bg-slate-100 rounded-full transition group"
            aria-label="Save listing"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isSaved ? '#f97316' : 'none'}
              stroke={isSaved ? '#f97316' : '#64748b'}
              strokeWidth="2"
              className="group-hover:scale-105 transition"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Visuals & Detailed Breakdown Stack */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery Component */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200/60 shadow-sm">
              <div className="relative bg-slate-900 aspect-[16/10] sm:h-[400px]">
                <img
                  src={galleryImages[selectedImage]}
                  alt={`${car.brand} {car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3 p-4 overflow-x-auto bg-slate-50/50 border-t border-slate-100">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition relative ${
                      selectedImage === idx ? 'border-orange-500 shadow-sm ring-1 ring-orange-500' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail slot ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Inspection Score Report Block */}
            <div className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-150">
                <h3 className="text-lg font-bold text-slate-900">Official Evaluation Report</h3>
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#d97706" stroke="none">
                    <polygon points="12 2 15.09 10.26 23.77 10.36 17.13 16.01 19.09 24.29 12 18.54 4.91 24.29 6.87 16.01 0.23 10.36 8.91 10.26 12 2" />
                  </svg>
                  <span className="text-sm font-bold text-amber-800">{car.inspection_score || '4.2'}/5</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Certified pre-owned vehicle
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Complete history report verified
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 5-day conditional return guarantee
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Free warranty cover up to 1 year
                </div>
              </div>
            </div>

            {/* Interactive EMI Calculator Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Financing & EMI Calculator
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Loan Amount (₹)</label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tenure</label>
                    <select
                      value={loanYears}
                      onChange={(e) => setLoanYears(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm font-semibold outline-none focus:border-blue-500 transition"
                    >
                      <option value={1}>1 Year</option>
                      <option value={3}>3 Years</option>
                      <option value={5}>5 Years</option>
                      <option value={7}>7 Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Interest Rate (% P.A.)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-semibold"
                    />
                  </div>
                </div>

                <div className="bg-orange-50/60 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Estimated Monthly EMI</p>
                    <p className="text-2xl font-black text-orange-600">₹{calculateEMI().toLocaleString()}/mo</p>
                  </div>
                  <span className="text-xs text-slate-400 max-w-[150px] text-right hidden sm:block">Calculated on reducing interest balance metrics.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Transactional Sidebar Panel */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm">
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Asking Price</span>
                <p className="text-slate-900 text-3xl font-black tracking-tight">{formatPrice(car.price)}</p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (!isLoggedIn) { navigate('/login'); return; }
                    setIsContactOpen(true);
                  }}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-sm text-sm"
                >
                  Contact Seller
                </button>
                <button
                  onClick={() => {
                    if (!isLoggedIn) { navigate('/login'); return; }
                    setIsContactOpen(true);
                  }}
                  className="w-full border border-slate-300 text-slate-700 bg-white py-3 rounded-lg font-bold hover:bg-slate-50 hover:border-slate-400 transition text-sm"
                >
                  Make an Offer
                </button>
              </div>

              {/* Specifications Matrix Grid */}
              <div className="mt-6 pt-6 border-t border-slate-150">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Specifications Matrix</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {specs.map((spec) => (
                    <div key={spec.label} className="pb-2 border-b border-slate-50">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{spec.label}</p>
                      <p className="text-sm font-semibold text-slate-800">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seller Core Data Block */}
              <div className="mt-6 pt-6 border-t border-slate-150">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Verified Point of Contact</h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-sm">
                    PS
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Priya Sharma</p>
                    <p className="text-xs text-slate-400 font-medium">Individual Verified Seller</p>
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-600 space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="flex items-center gap-2"><span>📞</span> +91 9876543210</p>
                  <p className="flex items-center gap-2"><span>📍</span> Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Cross-Sell Recommendations Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          Similar Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCars
            .filter((c) => c.id !== car.id)
            .slice(0, 3)
            .map((related) => (
              <div
                key={related.id}
                onClick={() => {
                  navigate(`/cars/${related.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-md transition cursor-pointer group"
              >
                <div className="h-44 bg-slate-100 overflow-hidden relative">
                  <img
                    src={related.image}
                    alt={related.model}
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition text-sm sm:text-base">
                    {related.brand} {related.model}
                  </h3>
                  <p className="text-orange-600 font-black mt-1 text-sm">
                    ₹{(related.price / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Slide-Up Contact Action Drawer Backdrop */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-end md:items-center md:justify-center p-0 md:p-4">
          <div className="bg-white rounded-t-xl md:rounded-xl w-full md:w-[400px] p-6 shadow-xl border border-slate-100 animate-slide-up">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Secure Message Routing</h2>
              <button
                onClick={() => setIsContactOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); setIsContactOpen(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Shubham Khanzode"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Contact Number</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Message Content</label>
                <textarea
                  required
                  defaultValue={`Hi Priya, I'm highly interested in your listed ${car.brand} ${car.model}. Please share details regarding verification documentation logs.`}
                  rows="3"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none text-slate-700"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-bold hover:bg-orange-600 transition shadow-sm text-sm"
              >
                Initiate Chat Route
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}