
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../App';

export default function SellCar() {
  const navigate = useNavigate();
  const { isLoggedIn, userRole } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (userRole !== 'seller') return <Navigate to="/" replace />;
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] =
  useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    fuel: 'Petrol',
    transmission: 'Manual',
    mileage: '',
    price: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    inspectionDate: '',
inspectionTime: '',
rcDocument: '',
insuranceDocument: '',
idDocument: '',
  });
  const [errors, setErrors] = useState({});

const steps = [
  { id: 1, label: 'Vehicle Info' },
  { id: 2, label: 'Pricing' },
  { id: 3, label: 'Photos' },
  { id: 4, label: 'Contact' },
  { id: 5, label: 'Confirmation' },
];

  const brands = ['Maruti', 'Hyundai', 'Tata', 'Mahindra', 'Renault', 'Honda'];

 const handleChange = (e) => {
  const { name } = e.target;

  const value =
    typeof e.target.value === 'string'
      ? e.target.value.replace(/[<>]/g, '')
      : e.target.value;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  }
};
const validateStep = () => {
  const newErrors = {};
  const currentYear = new Date().getFullYear();

  if (currentStep === 1) {
    if (!formData.brand) {
      newErrors.brand = 'Please select a brand';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Please enter a model';
    }

    if (
      Number(formData.year) < 1980 ||
      Number(formData.year) > currentYear
    ) {
      newErrors.year = `Year must be between 1980 and ${currentYear}`;
    }

    if (!formData.mileage) {
      newErrors.mileage = 'Please enter mileage';
    } else if (Number(formData.mileage) < 0) {
      newErrors.mileage = 'Mileage cannot be negative';
    }
  }

  if (currentStep === 2) {
    if (!formData.price) {
      newErrors.price = 'Please enter a price';
    } else if (Number(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
  }

  if (currentStep === 4) {
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter email';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter phone number';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10 digit mobile number';
    }

    if (!formData.inspectionDate) {
      newErrors.inspectionDate = 'Please select a date';
    }

    if (!formData.inspectionTime) {
      newErrors.inspectionTime = 'Please select a time';
    }
  }
  if (
  formData.description.trim().length < 10
) {
  newErrors.description =
    "Description must contain at least 10 characters";
}
if (!acceptedTerms) {
  newErrors.terms =
    "Please accept Terms & Conditions";
}
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleNext = () => {
  if (validateStep()) {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  }
};

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert('Car listing created successfully!');
      navigate('/seller-dashboard');
    }
  };

  const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg"
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG and PNG images allowed");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Maximum file size is 5MB");
    return;
  }
};

  return (
<div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Sell Your Car</h1>
          <p className="text-base text-slate-600">Complete the form below to list your vehicle</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative z-10">
                <button
                  type="button"
                  onClick={() => idx + 1 <= currentStep && setCurrentStep(step.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition mb-2 border ${
                    step.id <= currentStep
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-slate-200 text-slate-600 border-slate-200'
                  }`}
                >
                  {step.id}
                </button>
                <p className="text-xs font-semibold text-slate-900 text-center">{step.label}</p>
                
                {/* Visual Connector Line */}
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute h-1 top-6 -z-10 transition-colors duration-300 ${
                      step.id < currentStep ? 'bg-orange-500' : 'bg-slate-200'
                    }`}
                    style={{
                      left: 'calc(50% + 24px)',
                      width: 'calc(100% - 48px)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 md:p-8 shadow-md">
          {/* Step 1: Vehicle Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Vehicle Information</h2>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Brand</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${
                    errors.brand ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'
                  }`}
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                {errors.brand && <p className="text-xs text-red-600 mt-1">{errors.brand}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Model</label>
                <input
                  type="text"
                  name="model"
                  placeholder="e.g., Swift, City, Fortuner"
                  value={formData.model}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${
                    errors.model ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'
                  }`}
                />
                {errors.model && <p className="text-xs text-red-600 mt-1">{errors.model}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.year && (
  <p className="text-xs text-red-600 mt-1">
    {errors.year}
  </p>
)}

                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Mileage (km)</label>
                  <input
                    type="number"
                    min="0"
                    name="mileage"
                    placeholder="e.g., 50000"
                    value={formData.mileage}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${
                      errors.mileage ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'
                    }`}
                  />
                  {errors.mileage && <p className="text-xs text-red-600 mt-1">{errors.mileage}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Fuel Type</label>
                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Transmission</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  name="description"
                  minLength={10}
maxLength={500}
                  placeholder="Tell us about your car's condition, features, etc."
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}

                  className="w-full px-4 py-2 border border-slate-200 rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Pricing */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Set Your Price</h2>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Expected Price (₹)</label>
                <input
                  type="number"
                  min="1"
                  name="price"
                  placeholder="e.g., 550000"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${
                    errors.price ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'
                  }`}
                />
                {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  💡 <strong>Pricing Tip:</strong> Cars with lower mileage and higher inspection scores typically get higher offers.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Media */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Upload Photos</h2>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-orange-500 transition cursor-pointer">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B7E8E"
                  strokeWidth="1.5"
                  className="mx-auto mb-3"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <p className="text-base font-semibold text-slate-900">Click to upload photos</p>
                <p className="text-sm text-slate-600">or drag and drop (PNG, JPG up to 10MB)</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  📸 <strong>Photo Tips:</strong> Clear photos from multiple angles help sell your car faster.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Your Contact Details</h2>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${
                    errors.name ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${
                    errors.email ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
 onChange={(e) =>
  setFormData({
    ...formData,
    phone: e.target.value.replace(/\D/g, "").slice(0,10)
  })
}
  maxLength={10}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  // onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${
                    errors.phone ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-4">
                <input type="checkbox" id="terms" className="mt-1" />
                <label htmlFor="terms" className="text-sm text-blue-700">
                  I agree to the Terms & Conditions and consent to be contacted regarding my listing
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation View */}
          {currentStep === 5 && (
            <div className="space-y-6 text-center py-4">
              <h2 className="text-2xl font-bold text-slate-900">Ready to Submit!</h2>
              <p className="text-base text-slate-600 max-w-md mx-auto">
                Please review all the data you entered across the steps before hitting submission below.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 text-left max-w-md mx-auto text-sm text-blue-700">
                <strong>Summary:</strong> {formData.brand || 'No brand'} {formData.model} ({formData.year})
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-slate-200">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex-1 px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-900 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Submit Listing
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}