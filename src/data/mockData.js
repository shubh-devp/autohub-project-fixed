
// ─── Cars Dataset Inventory ────────────────────────
export const cars = [
  {
    id: 1,
    brand: 'Maruti',
    model: 'Swift',
    year: 2020,
    price: 550000,
    mileage: 45000,
    fuel: 'Petrol',
    transmission: 'Manual',
    image: 'https://static.india.com/wp-content/uploads/2016/12/2017-Suzuki-Swift-white-front-three-quarters-1.jpg',
    fallback_image: 'https://placehold.co/400x250?text=Maruti+Swift',
    status: 'Available',
    inspection_score: 4.5,
    owner_count: 1,
    location: 'Mumbai',
  },
  {
    id: 2,
    brand: 'Hyundai',
    model: 'i20',
    year: 2019,
    price: 625000,
    mileage: 62000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: 'https://mda.spinny.com/sp-file-system/public/2025-02-28/b9f51702ac7045cd9c0c87a989ae0fa2/raw/file.jpg',
    fallback_image: 'https://placehold.co/400x250?text=Hyundai+i20',
    status: 'Available',
    inspection_score: 4.2,
    owner_count: 1,
    location: 'Delhi',
  },
  {
    id: 3,
    brand: 'Tata',
    model: 'Nexon',
    year: 2021,
    price: 850000,
    mileage: 28000,
    fuel: 'Diesel',
    transmission: 'Manual',
    image: 'https://i.pinimg.com/736x/1c/95/3b/1c953bec997ca8f5229fb0d64c93a26c.jpg',
    fallback_image: 'https://placehold.co/400x250?text=Tata+Nexon',
    status: 'Available',
    inspection_score: 4.8,
    owner_count: 1,
    location: 'Bangalore',
  },
  {
    id: 4,
    brand: 'Mahindra',
    model: 'XUV500',
    year: 2018,
    price: 750000,
    mileage: 95000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    image: 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/34024/xuv500-exterior-right-front-three-quarter-3.jpeg?q=80',
    fallback_image: 'https://placehold.co/400x250?text=Mahindra+XUV500',
    status: 'Available',
    inspection_score: 4.0,
    owner_count: 2,
    location: 'Pune',
  },
  {
    id: 5,
    brand: 'Renault',
    model: 'Kwid',
    year: 2020,
    price: 420000,
    mileage: 38000,
    fuel: 'Petrol',
    transmission: 'Manual',
    image: 'https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/141149/kwid-right-front-three-quarter.png?q=80',
    fallback_image: 'https://placehold.co/400x250?text=Renault+Kwid',
    status: 'Available',
    inspection_score: 3.8,
    owner_count: 1,
    location: 'Hyderabad',
  },
  {
    id: 6,
    brand: 'Honda',
    model: 'City',
    year: 2022,
    price: 920000,
    mileage: 12000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: 'https://www.hondacarindia.com/web-data/models/2026/hondaCity/BookingImage/Desktop/CITY_EHEV_WHITE_01_desk_01.jpg',
    fallback_image: 'https://placehold.co/400x250?text=Honda+City',
    status: 'Available',
    inspection_score: 4.9,
    owner_count: 1,
    location: 'Ahmedabad',
  },
];

export const mockCars = cars;

// ─── Core User Profiles ──────────────────────
export const mockBuyerProfile = {
  id: 'USER_002',
  name: 'Rahul Kumar',
  email: 'rahul@example.com',
  phone: '+91 9876543210',
  role: 'Buyer',
  avatar: 'https://placehold.co/150?text=Rahul+Kumar',
  kyc_status: 'Verified',
  saved_cars:[1],
};

export const mockSellerProfile = {
  id: 'USER_001',
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 9123456789',
  role: 'Seller',
  avatar: 'https://placehold.co/150?text=Priya+Sharma',
  kyc_status: 'Verified',
  listings_count: 3,
};


// ─── Buyer Dashboard Ledger ────────────────────────
export const buyerDashboardStats = [
  { label: 'Saved Cars', value: 12, trend: '+3', icon: 'heart' },
  { label: 'Active Offers', value: 2, trend: '+1', icon: 'tag' },
  { label: 'Viewed This Month', value: 45, trend: '+12', icon: 'eye' },
];

export const buyerOrders = [
  {
    id: 'ORD_001',
    car_id: 1,
    car_name: 'Maruti Swift 2020',
    status: 'In Transit',
    order_date: '2026-06-01',
    expected_delivery: '2026-06-10',
    price: 550000,
  },
  {
    id: 'ORD_002',
    car_id: 6,
    car_name: 'Honda City 2022',
    status: 'Pending Documents',
    order_date: '2026-05-25',
    expected_delivery: '2026-06-05',
    price: 920000,
  },
];

// ─── Seller Dashboard Ledger ────────────────────
export const sellerDashboardStats = [
  { label: 'Active Listings', value: 5, trend: '+1', icon: 'list' },
  { label: 'Offers Received', value: 8, trend: '+2', icon: 'inbox' },
  { label: 'Total Earnings', value: '₹18,50,000', trend: '+₹2,50,000', icon: 'wallet' },
];

export const sellerListings = [
  {
    id: 'LIST_001',
    car_id: 2,
    car_name: 'Hyundai i20 2019',
    status: 'Active',
    price: 625000,
    offers: 3,
    views: 127,
    listed_date: '2026-05-20',
  },
  {
    id: 'LIST_002',
    car_id: 3,
    car_name: 'Tata Nexon 2021',
    status: 'Sold',
    price: 850000,
    offers: 5,
    views: 256,
    listed_date: '2026-04-15',
  },
];

export const sellerOffers = [
  {
    id: 'OFFER_001',
    car_id: 2,
    car_name: 'Hyundai i20 2019',
    buyer_name: 'Amit Singh',
    amount: 600000,
    offer_date: '2026-06-02',
    status: 'Pending',
  },
  {
    id: 'OFFER_002',
    car_id: 2,
    car_name: 'Hyundai i20 2019',
    buyer_name: 'Neha Desai',
    amount: 615000,
    offer_date: '2026-06-01',
    status: 'Accepted',
  },
];

export const sellerInspections = [
  {
    id: 'INSP_001',
    car_id: 2,
    car_name: 'Hyundai i20 2019',
    inspector: 'Rohit Sharma',
    date: '2026-06-10',
    status: 'Scheduled',
  },
  {
    id: 'INSP_002',
    car_id: 3,
    car_name: 'Tata Nexon 2021',
    inspector: 'Ankit Verma',
    date: '2026-05-28',
    status: 'Completed',
  },
  {
    id: 'INSP_003',
    car_id: 6,
    car_name: 'Honda City 2022',
    inspector: 'Suresh Patel',
    date: '2026-06-15',
    status: 'Pending',
  },
];

export const sellerPayouts = [
  {
    id: 'PAY_001',
    car_id: 3,
    car_name: 'Tata Nexon 2021',
    date: '2026-05-20',
    offer_price: 850000,
    status: 'Paid',
  },
  {
    id: 'PAY_002',
    car_id: 6,
    car_name: 'Honda City 2022',
    date: '2026-05-28',
    offer_price: 920000,
    status: 'Processing',
  },
  {
    id: 'PAY_003',
    car_id: 1,
    car_name: 'Maruti Swift 2020',
    date: '2026-06-01',
    offer_price: 550000,
    status: 'Paid',
  },
];

// ─── Administration Dataset Matrix ──────────────────
export const adminPendingListings = [
  {
    id: 'PENDING_001',
    seller_id: 'USER_001',
    seller_name: 'Priya Sharma',
    car_name: 'Maruti Swift 2020',
    submitted_date: '2026-06-02',
    status: 'Pending Inspection',
  },
  {
    id: 'PENDING_002',
    seller_id: 'USER_999',
    seller_name: 'Rajesh Patel',
    car_name: 'Honda Civic 2018',
    submitted_date: '2026-06-01',
    status: 'Pending Documents',
  },
];

export const adminUsers = [
  {
    id: 'USER_001',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'Seller',
    kyc_status: 'Verified',
    listings: 3,
  },
  {
    id: 'USER_002',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    role: 'Buyer',
    kyc_status: 'Verified',
    purchases: 1,
  },
];