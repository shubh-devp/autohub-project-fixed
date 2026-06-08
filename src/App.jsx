import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home            from './pages/Home';
import CarListing      from './pages/CarListing';
import CarDetails      from './pages/CarDetails';
import CompareCars     from './pages/CompareCars';
import SellCar         from './pages/SellCar';
import Login           from './pages/Auth/Login';
import Register        from './pages/Auth/Register';
import BuyerDashboard  from './pages/Dashboard/BuyerDashboard';
import SellerDashboard from './pages/Dashboard/SellerDashboard';

import Profile         from './pages/Dashboard/Profile';
import SavedCars       from './pages/Dashboard/SavedCars';
import Orders          from './pages/Dashboard/Orders';
import Documents       from './pages/Dashboard/Documents';
import SellerListings  from './pages/Dashboard/SellerListings';
import SellerOffers    from './pages/Dashboard/SellerOffers';
import SellerInspections from './pages/Dashboard/SellerInspections';
import SellerPayouts    from './pages/Dashboard/SellerPayouts';


// ─── Auth Context ────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// ─── Protected Route ─────────────────────────────────────────────────────────
function ProtectedRoute({ children, allowedRoles }) {
  const { isLoggedIn, userRole } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(userRole))
    return <Navigate to="/" replace />;
  return children;
}

// ─── Layout Wrapper ──────────────────────────────────────────────────────────
function AppLayout() {
  const { isLoggedIn, userRole, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  // Cleaner approach: hide footer if the route includes 'dashboard' or matches 'profile'
  const shouldHideFooter = 
    location.pathname.includes('dashboard') || 
    location.pathname === '/profile';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isAuthPage && (
        <Navbar
          userRole={userRole}
          isLoggedIn={isLoggedIn}
          onLogout={logout}
        />
      )}

      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/"         element={<Home />} />
          <Route path="/cars"     element={<CarListing />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/compare"  element={<CompareCars />} />
          
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected – Buyer */}
          <Route path="/buyer-dashboard" element={ 
              <ProtectedRoute allowedRoles={['buyer']}>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />


          <Route path="/buyer-dashboard/saved" element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <SavedCars />
              </ProtectedRoute>
            }
          />
          <Route path="/buyer-dashboard/orders" element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/buyer-dashboard/documents" element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <Documents />
              </ProtectedRoute>
            }
          />     

          {/* Protected – Seller */}
 <Route
  path="/sell"
  element={
    isLoggedIn && userRole === "seller"
      ? <SellCar />
      : <Navigate to="/login" replace />
  }
/>

<Route
  path="/seller-dashboard"
  element={
    isLoggedIn && userRole === "seller"
      ? <SellerDashboard />
      : <Navigate to="/login" replace />
  }
/>

<Route
  path="/seller-listings"
  element={
    <ProtectedRoute allowedRoles={['seller']}>
      <SellerListings />
    </ProtectedRoute>
  }
/>
<Route
  path="/seller-offers"
  element={
    <ProtectedRoute allowedRoles={['seller']}>
      <SellerOffers />
    </ProtectedRoute>
  }
/>

<Route
  path="/seller-inspections"
  element={
    <ProtectedRoute allowedRoles={['seller']}>
      <SellerInspections />
    </ProtectedRoute>
  }
/>

<Route
  path="/seller-payouts"
  element={
    <ProtectedRoute allowedRoles={['seller']}>
      <SellerPayouts />
    </ProtectedRoute>
  }
/>

 
          {/* Protected – Shared */}
          <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>}/>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAuthPage && !shouldHideFooter && <Footer />}
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
let savedAuth = {};

try {
  savedAuth = JSON.parse(
    localStorage.getItem('autohub_auth') || '{}'
  );
} catch {
  localStorage.removeItem('autohub_auth');
}

const [isLoggedIn, setIsLoggedIn] = useState(
  savedAuth?.isLoggedIn === true
);
const [userRole, setUserRole] = useState(
  ['buyer', 'seller'].includes(savedAuth?.userRole)
    ? savedAuth.userRole
    : 'guest'
);
  const [userData, setUserData] = useState(savedAuth.userData || null);

  const login = (user) => {
     if (!['buyer', 'seller'].includes(user.role)) {
    return;
  }
    const authData = {
      isLoggedIn: true,
      userRole: user.role,
      userData: user,
    };
    localStorage.setItem('autohub_auth', JSON.stringify(authData));
    setIsLoggedIn(true);
    setUserRole(user.role);
    setUserData(user);
  };

const logout = () => {
  sessionStorage.clear();
  localStorage.removeItem('autohub_auth');

  setIsLoggedIn(false);
  setUserRole('guest');
  setUserData(null);

  window.location.replace('/login');
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userData, login, logout }}>
      <AppLayout />
    </AuthContext.Provider>
  );
}
