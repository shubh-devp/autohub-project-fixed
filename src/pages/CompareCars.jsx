import { useState } from 'react';
import { mockCars } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function CompareCars() {
  const navigate = useNavigate();
  const [selectedCars, setSelectedCars] = useState([mockCars[0], mockCars[1], mockCars[2]]);

  const handleCarChange = (index, carId) => {
    const newSelected = [...selectedCars];
    newSelected[index] = mockCars.find((c) => c.id === parseInt(carId));
    setSelectedCars(newSelected);
  };

  const handleRemoveCar = (index) => {
    const newSelected = selectedCars.filter((_, i) => i !== index);
    setSelectedCars(newSelected);
  };

  const handleAddCar = () => {
    if (selectedCars.length < 4) {
      setSelectedCars([...selectedCars, mockCars[0]]);
    }
  };

  const formatPrice = (price) => {
    return `₹${(price / 100000).toFixed(1)}L`;
  };

  const specs = [
    { label: 'Price', key: 'price', format: (v) => formatPrice(v) },
    { label: 'Year', key: 'year', format: (v) => v },
    { label: 'Fuel Type', key: 'fuel', format: (v) => v },
    { label: 'Transmission', key: 'transmission', format: (v) => v },
    { label: 'Mileage', key: 'mileage', format: (v) => `${v.toLocaleString()} km` },
    { label: 'Owners', key: 'owner_count', format: (v) => v },
    { label: 'Inspection Score', key: 'inspection_score', format: (v) => `${v}/5` },
    { label: 'Location', key: 'location', format: (v) => v },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Compare Cars</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Car Selection Dropdowns */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedCars.map((car, index) => (
              <div key={index} className="bg-white rounded-lg p-4 relative border border-slate-100 shadow-sm">
                {selectedCars.length > 2 && (
                  <button
                    onClick={() => handleRemoveCar(index)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-600 transition"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
                <select
                  value={car.id}
                  onChange={(e) => handleCarChange(index, e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                >
                  {mockCars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.brand} {c.model} ({c.year})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  Slot {index + 1}: {car.brand} {car.model}
                </p>
              </div>
            ))}

            {selectedCars.length < 4 && (
              <button
                onClick={handleAddCar}
                className="bg-white rounded-lg p-4 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center text-slate-600 font-semibold gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Car
              </button>
            )}
          </div>
        </div>

        {/* Comparison Table Grid */}
        <div className="bg-white rounded-xl overflow-x-auto shadow-sm border border-slate-200">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-6 py-6 text-left text-sm font-bold text-slate-900 sticky left-0 bg-slate-50 z-10 w-48">
                  Vehicle Details
                </th>
                {selectedCars.map((car) => (
                  <th key={car.id} className="px-6 py-6 text-center min-w-[180px] bg-white">
                    <div className="flex flex-col items-center">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="w-28 h-20 object-cover rounded-lg mb-3 border border-slate-100 shadow-sm"
                      />
                      <span className="block font-bold text-base text-slate-900">
                        {car.brand}
                      </span>
                      <span className="block text-xs font-semibold text-slate-500">
                        {car.model}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.label} className="border-b border-slate-150 hover:bg-slate-50/30 transition last:border-b-0">
                  <td className="px-6 py-4 bg-slate-50 font-semibold text-slate-700 text-sm sticky left-0 z-10 w-48 border-r border-slate-150">
                    {spec.label}
                  </td>
                  {selectedCars.map((car) => (
                    <td
                      key={car.id}
                      className="px-6 py-4 text-sm text-slate-900 text-center min-w-[180px]"
                    >
                      <span className={spec.key === 'price' ? 'font-bold text-orange-600 text-base' : 'font-medium'}>
                        {spec.format(car[spec.key])}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(`/cars/${selectedCars[0]?.id}`)}
            className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition shadow-sm text-sm"
          >
            View First Car Details
          </button>
          <button
            onClick={() => alert('Comparison saved!')}
            className="w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 bg-white rounded-lg font-semibold hover:bg-slate-50 transition shadow-sm text-sm"
          >
            Save Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
