import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  Property,
  CustomerUser,
  Inquiry,
  Booking,
  Review,
  NotificationItem,
  FilterParams,
} from '@/lib/types';

interface DBState {
  properties: Property[];
  customers: (CustomerUser & { passwordHash: string })[];
  inquiries: Inquiry[];
  bookings: Booking[];
  reviews: Review[];
  notifications: NotificationItem[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'peflarmo_db.json');

// Initial seed data with high-quality real-estate accommodations in Delhi & NCR
const SEED_PROPERTIES: Property[] = [
  {
    id: 'prop-pg-001',
    title: 'Stanza Living Hudson House - Boys PG',
    slug: 'stanza-living-hudson-house-boys-pg-north-campus',
    category: 'PG',
    city: 'Delhi',
    locality: 'North Campus',
    fullAddress: 'Plot 42, Near Vishwavidyalaya Metro Station, Hudson Lane, GTB Nagar, Delhi 110009',
    landmark: '5 mins from Patel Chest Institute & Delhi University',
    genderSuitability: 'Boys',
    monthlyRent: 13500,
    securityDeposit: 13500,
    furnishing: 'Fully Furnished',
    acAvailable: true,
    foodOption: '3 Meals Included',
    bathroomType: 'Attached',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-10-15',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'High-Speed Wi-Fi',
      '3-Tier Biometric Security',
      'Daily Housekeeping',
      'Power Backup 24/7',
      'RO Drinking Water',
      'Washing Machine & Laundry',
      'Study Desk & Ergonomic Chair',
      'Gym & Recreational Area',
    ],
    rules: [
      'Gate closes at 11:00 PM for safety',
      'Non-smoking and non-drinking premises',
      'Guest entry permitted until 8:00 PM with ID',
      'Quiet study hours after 10:00 PM',
    ],
    description:
      'Premier Boys PG located in the heart of North Campus, GTB Nagar. Specially designed for university students and competitive exam aspirants with nutritious North & South Indian meals, high-speed fiber internet, and dedicated study zones.',
    nearByHubs: [
      'GTB Nagar Metro Station (400m)',
      'Miranda House & Hindu College (1.2km)',
      'Hudson Lane Cafes (200m)',
    ],
    roomBedOptions: [
      {
        id: 'opt-pg-001-1',
        name: 'Single Private AC Room',
        sharingType: 'Single',
        rentPerMonth: 19500,
        securityDeposit: 19500,
        ac: true,
        bathroomType: 'Attached',
        foodOption: '3 Meals Included',
        totalUnits: 6,
        availableUnits: 2,
      },
      {
        id: 'opt-pg-001-2',
        name: 'Double Sharing AC Room',
        sharingType: 'Double',
        rentPerMonth: 13500,
        securityDeposit: 13500,
        ac: true,
        bathroomType: 'Attached',
        foodOption: '3 Meals Included',
        totalUnits: 14,
        availableUnits: 3,
      },
      {
        id: 'opt-pg-001-3',
        name: 'Triple Sharing Economy Room',
        sharingType: 'Triple',
        rentPerMonth: 9800,
        securityDeposit: 9800,
        ac: false,
        bathroomType: 'Attached',
        foodOption: '3 Meals Included',
        totalUnits: 8,
        availableUnits: 1,
      },
    ],
    rating: 4.8,
    reviewCount: 28,
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z',
  },
  {
    id: 'prop-pg-002',
    title: 'Aura Heights Luxury Girls PG - South Campus',
    slug: 'aura-heights-luxury-girls-pg-satya-niketan',
    category: 'PG',
    city: 'Delhi',
    locality: 'South Campus',
    fullAddress: 'Lane 2, Satya Niketan, Near Durgabai Deshmukh South Campus Metro, Delhi 110021',
    landmark: 'Opposite Venkateswara College Gate 2',
    genderSuitability: 'Girls',
    monthlyRent: 14500,
    securityDeposit: 14500,
    furnishing: 'Fully Furnished',
    acAvailable: true,
    foodOption: '3 Meals Included',
    bathroomType: 'Attached',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-10-12',
    availabilityStatus: 'Filling Fast',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '24/7 Female Warden on Premise',
      'CCTV Surveillance in Common Areas',
      'Hygienic Home-cooked Meals (Breakfast, Lunch, Dinner)',
      'Split Air Conditioners',
      'Geyser & High Pressure Water',
      'Lift & Power Backup',
      'Wi-Fi 300 Mbps',
    ],
    rules: [
      'Strict security verification for all visitors',
      'Warden attendance roll call at 10:30 PM',
      'No loud music after 10 PM',
    ],
    description:
      'Safe, modern and comfortable premium girls accommodation in Satya Niketan. Highly rated by university students and working women in South Delhi.',
    nearByHubs: [
      'South Campus Metro Station (350m)',
      'Sri Venkateswara & ARSD College (200m)',
      'Chanakyapuri Embassies (2km)',
    ],
    roomBedOptions: [
      {
        id: 'opt-pg-002-1',
        name: 'Single Premium AC Room',
        sharingType: 'Single',
        rentPerMonth: 21000,
        securityDeposit: 21000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: '3 Meals Included',
        totalUnits: 4,
        availableUnits: 1,
      },
      {
        id: 'opt-pg-002-2',
        name: 'Double Sharing AC Room',
        sharingType: 'Double',
        rentPerMonth: 14500,
        securityDeposit: 14500,
        ac: true,
        bathroomType: 'Attached',
        foodOption: '3 Meals Included',
        totalUnits: 10,
        availableUnits: 2,
      },
    ],
    rating: 4.9,
    reviewCount: 34,
    createdAt: '2026-09-05T10:00:00Z',
    updatedAt: '2026-10-02T12:00:00Z',
  },
  {
    id: 'prop-pg-003',
    title: 'UrbanNest Co-Living PG - Hauz Khas',
    slug: 'urbannest-co-living-pg-hauz-khas',
    category: 'PG',
    city: 'Delhi',
    locality: 'Hauz Khas',
    fullAddress: 'E-Block, Hauz Khas Enclave, New Delhi 110016',
    landmark: 'Behind Hauz Khas Market, 500m from IIT Delhi',
    genderSuitability: 'Co-ed / Coliving',
    monthlyRent: 16000,
    securityDeposit: 16000,
    furnishing: 'Fully Furnished',
    acAvailable: true,
    foodOption: 'Breakfast Included',
    bathroomType: 'Attached',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-10-18',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Co-Working Lounge with High-speed Mesh Wi-Fi',
      'Community Kitchen & Cafe Bar',
      'Weekly Social Events & Networking',
      'Smart TV in Lounge',
      'Professional Housekeeping',
      'Power Backup 100%',
    ],
    rules: [
      'Respectful co-living community atmosphere',
      'Valid Government ID required at registration',
      'Designated smoking terrace area only',
    ],
    description:
      'Vibrant coliving residence tailor-made for startup founders, tech professionals, and researchers in South Delhi. Features stylish private suites and double sharing rooms.',
    nearByHubs: ['IIT Delhi (600m)', 'Hauz Khas Metro (700m)', 'Green Park (1km)'],
    roomBedOptions: [
      {
        id: 'opt-pg-003-1',
        name: 'Private Studio Room with Balcony',
        sharingType: 'Single',
        rentPerMonth: 24000,
        securityDeposit: 24000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Breakfast Included',
        totalUnits: 5,
        availableUnits: 1,
      },
      {
        id: 'opt-pg-003-2',
        name: 'Double Sharing Suite Bed',
        sharingType: 'Double',
        rentPerMonth: 16000,
        securityDeposit: 16000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Breakfast Included',
        totalUnits: 12,
        availableUnits: 4,
      },
    ],
    rating: 4.7,
    reviewCount: 19,
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-10-05T12:00:00Z',
  },
  {
    id: 'prop-flat-001',
    title: 'Modern 2 BHK Designer Apartment - Saket',
    slug: 'modern-2-bhk-designer-apartment-saket',
    category: 'Flat',
    city: 'Delhi',
    locality: 'Saket',
    fullAddress: 'J-Block, Saket, Near Select Citywalk Mall, New Delhi 110017',
    landmark: 'Walking distance to Select Citywalk and Max Hospital',
    genderSuitability: 'Family',
    monthlyRent: 38000,
    securityDeposit: 76000,
    bhk: '2 BHK',
    flatType: 'Rent',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    superAreaSqFt: 1150,
    furnishing: 'Fully Furnished',
    acAvailable: true,
    foodOption: 'Self Cooking / Kitchen Available',
    bathroomType: 'Attached',
    stayDuration: 'Long-Term Only (6m+)',
    availableFrom: '2026-11-01',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Modular Kitchen with Chimney & Piped Gas (IGL)',
      'Dedicated Reserved Car Parking',
      'Dual Balcony with Green View',
      'Inverter Power Backup',
      'Gated Society with 24/7 Security Guard',
      'Near Metro & Shopping Malls',
    ],
    rules: [
      'Family or verified working professionals preferred',
      '11 Months standard registered lease agreement',
      'Society maintenance paid separately (₹1,500/mo)',
    ],
    description:
      'Immaculately maintained 2 BHK builder flat on the 2nd floor with lift. Comes with complete modular Italian kitchen, wardrobes in both bedrooms, split ACs, and expansive balconies overlooking a manicured neighbourhood park.',
    nearByHubs: [
      'Saket Metro Station (800m)',
      'Select Citywalk & DLF South Court (500m)',
      'Max Super Speciality Hospital (1.2km)',
    ],
    roomBedOptions: [
      {
        id: 'opt-flat-001-1',
        name: 'Entire 2 BHK Furnished Flat',
        sharingType: 'Entire Flat',
        rentPerMonth: 38000,
        securityDeposit: 76000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Self Cooking / Kitchen Available',
        totalUnits: 1,
        availableUnits: 1,
      },
    ],
    rating: 4.9,
    reviewCount: 14,
    createdAt: '2026-09-12T10:00:00Z',
    updatedAt: '2026-10-06T12:00:00Z',
  },
  {
    id: 'prop-flat-002',
    title: 'Spacious 3 BHK Luxury Builder Floor - Hauz Khas',
    slug: 'spacious-3-bhk-luxury-builder-floor-hauz-khas',
    category: 'Flat',
    city: 'Delhi',
    locality: 'Hauz Khas',
    fullAddress: 'A-Block, Hauz Khas, New Delhi 110016',
    landmark: 'Adjacent to Deer Park Jogging Track',
    genderSuitability: 'Family',
    monthlyRent: 65000,
    securityDeposit: 130000,
    bhk: '3 BHK',
    flatType: 'Rent',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    superAreaSqFt: 1850,
    furnishing: 'Semi-Furnished',
    acAvailable: true,
    foodOption: 'Self Cooking / Kitchen Available',
    bathroomType: 'Attached',
    stayDuration: 'Long-Term Only (6m+)',
    availableFrom: '2026-10-20',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Stilt Car Parking with EV Charging Point',
      'Private Lift Access to Floor',
      '100% DG Power Backup',
      'Servant Room with Attached Toilet',
      'VRV Centralized Air Conditioning',
    ],
    rules: [
      'Registered lease for minimum 12 months',
      'Police verification mandatory for tenants',
    ],
    description:
      'High-end 3 BHK builder floor facing the lush Deer Park greenery. Features Italian marble flooring, 3 master bedrooms with ensuite bathrooms, and an open concept modular kitchen with quartz countertop.',
    nearByHubs: [
      'Deer Park (100m)',
      'Hauz Khas Village & Lake (400m)',
      'Green Park Market (800m)',
    ],
    roomBedOptions: [
      {
        id: 'opt-flat-002-1',
        name: 'Entire 3 BHK Floor',
        sharingType: 'Entire Flat',
        rentPerMonth: 65000,
        securityDeposit: 130000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Self Cooking / Kitchen Available',
        totalUnits: 1,
        availableUnits: 1,
      },
    ],
    rating: 5.0,
    reviewCount: 9,
    createdAt: '2026-09-14T10:00:00Z',
    updatedAt: '2026-10-07T12:00:00Z',
  },
  {
    id: 'prop-flat-003',
    title: 'Bachelor Friendly 1 BHK Flat - Laxmi Nagar',
    slug: 'bachelor-friendly-1-bhk-flat-laxmi-nagar',
    category: 'Flat',
    city: 'Delhi',
    locality: 'Laxmi Nagar',
    fullAddress: 'Street 4, Guru Ram Dass Nagar, Laxmi Nagar, East Delhi 110092',
    landmark: 'Near Nirman Vihar Metro & V3S Mall',
    genderSuitability: 'Bachelors / Anyone',
    monthlyRent: 14000,
    securityDeposit: 14000,
    bhk: '1 BHK',
    flatType: 'Rent',
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    superAreaSqFt: 550,
    furnishing: 'Semi-Furnished',
    acAvailable: true,
    foodOption: 'Self Cooking / Kitchen Available',
    bathroomType: 'Attached',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-10-15',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee152d829924?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Wardrobe & Double Bed with Mattress',
      'Split Air Conditioner Installed',
      'Sub-meter for Electricity',
      '24/7 Water Supply with RO',
      'Bachelors and CA/UPSC Aspirants Welcomed',
    ],
    rules: [
      'Timely rent payment by 5th of every month',
      'No loud disturbance to neighbours',
    ],
    description:
      'Economical and peaceful 1 BHK apartment situated right in the educational hotspot of Laxmi Nagar. Perfect for chartered accountancy or civil services aspirants looking for private independent accommodation.',
    nearByHubs: [
      'Laxmi Nagar Metro Station (300m)',
      'Nirman Vihar & V3S Mall (800m)',
      'Major CA Coaching Institutes (200m)',
    ],
    roomBedOptions: [
      {
        id: 'opt-flat-003-1',
        name: 'Entire 1 BHK Flat',
        sharingType: 'Entire Flat',
        rentPerMonth: 14000,
        securityDeposit: 14000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Self Cooking / Kitchen Available',
        totalUnits: 2,
        availableUnits: 1,
      },
    ],
    rating: 4.6,
    reviewCount: 16,
    createdAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-10-08T12:00:00Z',
  },
  {
    id: 'prop-room-001',
    title: 'Private AC Room in Independent Villa - Karol Bagh',
    slug: 'private-ac-room-independent-villa-karol-bagh',
    category: 'Room',
    city: 'Delhi',
    locality: 'Karol Bagh',
    fullAddress: '15A/22, WEA, Near Ganga Ram Hospital Road, Karol Bagh, New Delhi 110005',
    landmark: '3 mins from Karol Bagh Metro Station',
    genderSuitability: 'Bachelors / Anyone',
    monthlyRent: 12500,
    securityDeposit: 12500,
    furnishing: 'Fully Furnished',
    acAvailable: true,
    foodOption: 'Self Cooking / Kitchen Available',
    bathroomType: 'Attached',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-10-14',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Private Attached Bathroom with Geyser',
      'Dedicated Work/Study Desk & High Back Chair',
      'Independent Key Access with Smart Lock',
      'Shared Modular Kitchen on Floor',
      'RO Water & Refrigerator',
      'High-Speed Wi-Fi',
    ],
    rules: [
      'UPSC students & working professionals preferred',
      'Quiet environment maintained throughout the day',
      'Electricity as per digital sub-meter units',
    ],
    description:
      'Independent private room located on the 1st floor of a quiet residential villa in Karol Bagh. Ideal for IAS aspirants attending Vajiram, Drishti, or Vision IAS, and doctors at Ganga Ram Hospital.',
    nearByHubs: [
      'Karol Bagh Metro Station (300m)',
      'Sir Ganga Ram Hospital (400m)',
      'Rajendra Place Coaching Hub (700m)',
    ],
    roomBedOptions: [
      {
        id: 'opt-room-001-1',
        name: 'Single Private Room (Attached Bath)',
        sharingType: 'Single',
        rentPerMonth: 12500,
        securityDeposit: 12500,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Self Cooking / Kitchen Available',
        totalUnits: 3,
        availableUnits: 1,
      },
    ],
    rating: 4.8,
    reviewCount: 22,
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-10-08T12:00:00Z',
  },
  {
    id: 'prop-room-002',
    title: 'Twin Sharing Furnished Room - Mukherjee Nagar',
    slug: 'twin-sharing-furnished-room-mukherjee-nagar',
    category: 'Room',
    city: 'Delhi',
    locality: 'Mukherjee Nagar',
    fullAddress: 'B-Block, Commercial Complex Road, Mukherjee Nagar, Delhi 110009',
    landmark: 'Near Batra Cinema & Signature Bridge Approach',
    genderSuitability: 'Boys',
    monthlyRent: 7500,
    securityDeposit: 7500,
    furnishing: 'Fully Furnished',
    acAvailable: true,
    foodOption: 'Food On Demand / Mess',
    bathroomType: 'Attached',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-10-11',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Two Separate Single Wooden Beds with Storage',
      'Individual Study Desks & Book Shelves',
      'Split Air Conditioner with Timer',
      'Geyser in Bathroom',
      'Mess Tie-Up Available on Doorstep',
    ],
    rules: [
      'Ideal for competitive exam aspirants',
      'No loud audio without headphones',
    ],
    description:
      'Dedicated twin sharing room tailored for serious government exam students. Includes independent storage, dual study setups, and reliable water & power backup.',
    nearByHubs: [
      'GTB Nagar Metro (1.2km, E-Rickshaw available)',
      'Batra Cinema Landmark (150m)',
      'Mukherjee Nagar Central Library (300m)',
    ],
    roomBedOptions: [
      {
        id: 'opt-room-002-1',
        name: 'Single Bed in Twin Sharing Room',
        sharingType: 'Double',
        rentPerMonth: 7500,
        securityDeposit: 7500,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Food On Demand / Mess',
        totalUnits: 6,
        availableUnits: 2,
      },
      {
        id: 'opt-room-002-2',
        name: 'Entire Twin Room as Private',
        sharingType: 'Single',
        rentPerMonth: 14000,
        securityDeposit: 14000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Food On Demand / Mess',
        totalUnits: 2,
        availableUnits: 1,
      },
    ],
    rating: 4.7,
    reviewCount: 17,
    createdAt: '2026-09-22T10:00:00Z',
    updatedAt: '2026-10-09T12:00:00Z',
  },
  {
    id: 'prop-hostel-001',
    title: 'The Scholar Hub International Hostel - North Campus',
    slug: 'the-scholar-hub-international-hostel-north-campus',
    category: 'Hostel',
    city: 'Delhi',
    locality: 'North Campus',
    fullAddress: '8/12 Roop Nagar, Near Delhi University Arts Faculty, Delhi 110007',
    landmark: 'Behind Kamla Nagar Market, 500m from St. Stephens College',
    genderSuitability: 'Boys',
    monthlyRent: 11000,
    securityDeposit: 11000,
    furnishing: 'Fully Furnished',
    acAvailable: true,
    foodOption: '3 Meals Included',
    bathroomType: 'Both Available',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-10-15',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Hygienic Central Dining Mess (4 Times a day)',
      '24/7 Security Guards & Digital Turnstile Entry',
      'Full Badminton Court & Table Tennis',
      'Silent Reading Room with 500+ Books',
      'On-site Medical First Aid & Doctor on Call',
      'Laundry Service 2 Days a Week',
    ],
    rules: [
      'Standard University Hostel discipline guidelines',
      'Roll-call at 9:45 PM',
      'Ragging strictly prohibited with zero tolerance',
    ],
    description:
      'Premier student hostel built with international hostel standards. Offering nutritious buffet dining, sports facilities, high-speed Wi-Fi across all floors, and round-the-clock safety.',
    nearByHubs: [
      'Arts Faculty & SRCC (600m)',
      'Kamla Nagar Sparkle Market (250m)',
      'Vishwavidyalaya Metro (900m)',
    ],
    roomBedOptions: [
      {
        id: 'opt-hostel-001-1',
        name: 'Single Bed in Triple Sharing AC Dorm',
        sharingType: 'Triple',
        rentPerMonth: 11000,
        securityDeposit: 11000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: '3 Meals Included',
        totalUnits: 24,
        availableUnits: 5,
      },
      {
        id: 'opt-hostel-001-2',
        name: 'Single Bed in Double Sharing AC Room',
        sharingType: 'Double',
        rentPerMonth: 14000,
        securityDeposit: 14000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: '3 Meals Included',
        totalUnits: 16,
        availableUnits: 3,
      },
      {
        id: 'opt-hostel-001-3',
        name: 'Single Bed in 4-Bed Non-AC Budget Dorm',
        sharingType: 'Four Sharing',
        rentPerMonth: 8200,
        securityDeposit: 8200,
        ac: false,
        bathroomType: 'Common',
        foodOption: '3 Meals Included',
        totalUnits: 20,
        availableUnits: 4,
      },
    ],
    rating: 4.8,
    reviewCount: 42,
    createdAt: '2026-09-08T10:00:00Z',
    updatedAt: '2026-10-04T12:00:00Z',
  },
  {
    id: 'prop-hostel-002',
    title: 'Kasturba Women Residency & Hostel - South Campus',
    slug: 'kasturba-women-residency-hostel-south-campus',
    category: 'Hostel',
    city: 'Delhi',
    locality: 'South Campus',
    fullAddress: 'Plot 71, Anand Niketan, Near Moti Bagh, New Delhi 110021',
    landmark: 'Adjacent to Jesus and Mary College & Maitreyi College',
    genderSuitability: 'Girls',
    monthlyRent: 12500,
    securityDeposit: 12500,
    furnishing: 'Fully Furnished',
    acAvailable: true,
    foodOption: '3 Meals Included',
    bathroomType: 'Both Available',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-10-16',
    availabilityStatus: 'Filling Fast',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Safe Diplomatic Enclave Location with Guard Patrols',
      'Nutritious Pure Vegetarian & Egg Meals',
      'Solar Heated Water Supply',
      'Yoga & Fitness Studio on Terrace',
      'High-Speed Wi-Fi & Power Backup',
    ],
    rules: [
      'Girls student & working women hostel only',
      'Strict sign-in / sign-out registry',
      'Hostel gates close at 10:00 PM',
    ],
    description:
      'Prestigious hostel residence for women situated in the calm, secure Anand Niketan enclave right next to premier South Campus colleges and Chanakyapuri.',
    nearByHubs: [
      'Jesus & Mary College (400m)',
      'Moti Bagh Metro (650m)',
      'Satya Niketan Market (800m)',
    ],
    roomBedOptions: [
      {
        id: 'opt-hostel-002-1',
        name: 'Single Bed in Double Sharing AC Room',
        sharingType: 'Double',
        rentPerMonth: 15500,
        securityDeposit: 15500,
        ac: true,
        bathroomType: 'Attached',
        foodOption: '3 Meals Included',
        totalUnits: 12,
        availableUnits: 2,
      },
      {
        id: 'opt-hostel-002-2',
        name: 'Single Bed in Triple Sharing Economy',
        sharingType: 'Triple',
        rentPerMonth: 12500,
        securityDeposit: 12500,
        ac: true,
        bathroomType: 'Common',
        foodOption: '3 Meals Included',
        totalUnits: 18,
        availableUnits: 3,
      },
    ],
    rating: 4.9,
    reviewCount: 31,
    createdAt: '2026-09-11T10:00:00Z',
    updatedAt: '2026-10-05T12:00:00Z',
  },
  {
    id: 'prop-pg-004',
    title: 'CyberCity Elite Co-Living PG - DLF Phase 3',
    slug: 'cybercity-elite-co-living-pg-dlf-phase-3-gurgaon',
    category: 'PG',
    city: 'Gurgaon',
    locality: 'Cyber City',
    fullAddress: 'U-Block, DLF Phase 3, Near Moulsari Avenue Metro, Gurgaon 122002',
    landmark: '5 mins from Cyber Hub and Ambience Mall',
    genderSuitability: 'Co-ed / Coliving',
    monthlyRent: 15000,
    securityDeposit: 15000,
    furnishing: 'Fully Furnished',
    acAvailable: true,
    foodOption: 'Breakfast Included',
    bathroomType: 'Attached',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-10-14',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Approved',
    isVerifiedByAdmin: true,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Walk to Rapid Metro Station',
      'High Speed Wi-Fi 250 Mbps',
      'Daily Professional Housekeeping',
      'Free Access to Modern Fitness Center',
      'Rooftop Lounge & BBQ Area',
    ],
    rules: [
      'Working professionals preferred',
      'Co-living etiquette in shared spaces',
    ],
    description:
      'Modern co-living space designed for corporate professionals working in DLF Cyber City, Google, Microsoft, and surrounding MNC towers.',
    nearByHubs: [
      'Moulsari Avenue Rapid Metro (300m)',
      'DLF Cyber Hub (900m)',
      'Ambience Mall (1.2km)',
    ],
    roomBedOptions: [
      {
        id: 'opt-pg-004-1',
        name: 'Private Deluxe Studio Suite',
        sharingType: 'Single',
        rentPerMonth: 23000,
        securityDeposit: 23000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Breakfast Included',
        totalUnits: 6,
        availableUnits: 1,
      },
      {
        id: 'opt-pg-004-2',
        name: 'Double Sharing Executive Bed',
        sharingType: 'Double',
        rentPerMonth: 15000,
        securityDeposit: 15000,
        ac: true,
        bathroomType: 'Attached',
        foodOption: 'Breakfast Included',
        totalUnits: 14,
        availableUnits: 3,
      },
    ],
    rating: 4.8,
    reviewCount: 25,
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-10-06T12:00:00Z',
  },
  {
    id: 'prop-draft-001',
    title: 'Pending Verification Test PG Listing',
    slug: 'pending-verification-test-pg-listing',
    category: 'PG',
    city: 'Delhi',
    locality: 'Rohini',
    fullAddress: 'Sector 9, Rohini, Delhi',
    landmark: 'Near DC Chowk',
    genderSuitability: 'Boys',
    monthlyRent: 8000,
    securityDeposit: 8000,
    furnishing: 'Semi-Furnished',
    acAvailable: false,
    foodOption: 'No Food',
    bathroomType: 'Common',
    stayDuration: 'Short-Term & Long-Term',
    availableFrom: '2026-11-01',
    availabilityStatus: 'Available Now',
    adminApprovalStatus: 'Pending Admin Approval', // MUST NOT be returned in public searches
    isVerifiedByAdmin: false,
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80'],
    amenities: ['Wi-Fi'],
    rules: ['Standard rules'],
    description: 'Internal draft listing awaiting physical site verification by Peflarmo verification officer.',
    nearByHubs: ['Rohini West Metro'],
    roomBedOptions: [],
    rating: 0,
    reviewCount: 0,
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-01T10:00:00Z',
  },
];

const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    propertyId: 'prop-pg-001',
    customerName: 'Aman Sharma',
    rating: 5,
    comment:
      'Stayed here for my final year at Hindu College. The food quality is genuinely like home, the WiFi is super dependable during exam season, and the warden is very cooperative.',
    stayPeriod: 'July 2025 - Present',
    date: '2026-08-14',
    verifiedBooking: true,
  },
  {
    id: 'rev-002',
    propertyId: 'prop-pg-001',
    customerName: 'Rohan Verma',
    rating: 4.8,
    comment:
      'Best boys PG in Hudson Lane. Walking distance to the metro, AC cooling is great, and daily housekeeping keeps the room spotless.',
    stayPeriod: 'Jan 2026 - Present',
    date: '2026-09-02',
    verifiedBooking: true,
  },
  {
    id: 'rev-003',
    propertyId: 'prop-pg-002',
    customerName: 'Priya Mukherjee',
    rating: 5,
    comment:
      'Very safe and secure PG for girls in Satya Niketan. CCTV on all corridors, biometric entry, and healthy meals. Parents felt totally relaxed after visiting.',
    stayPeriod: 'August 2025 - Present',
    date: '2026-08-28',
    verifiedBooking: true,
  },
  {
    id: 'rev-004',
    propertyId: 'prop-flat-001',
    customerName: 'Sanjay & Meera Gupta',
    rating: 5,
    comment:
      'Excellent 2 BHK flat in Saket. The owner is very polite, modular kitchen is high quality, and parking is seamless. Peflarmo verified all paperwork in advance.',
    stayPeriod: 'April 2025 - Present',
    date: '2026-07-20',
    verifiedBooking: true,
  },
];

// Helper to hash password using scrypt
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

export function verifyPassword(password: string, combinedHash: string): boolean {
  try {
    const [salt, key] = combinedHash.split(':');
    if (!salt || !key) return false;
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    return crypto.timingSafeEqual(derivedKey, keyBuffer);
  } catch {
    return false;
  }
}

class DatabaseStore {
  private state: DBState | null = null;

  private ensureLoaded(): DBState {
    if (this.state) return this.state;

    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.state = JSON.parse(raw);
        return this.state!;
      }
    } catch (err) {
      console.error('Error loading db file, falling back to seed:', err);
    }

    // Initialize with seed
    const defaultPasswordHash = hashPassword('Peflarmo@123');
    this.state = {
      properties: SEED_PROPERTIES,
      customers: [
        {
          id: 'cust-demo-001',
          fullName: 'Demo Customer',
          email: 'customer@peflarmo.com',
          mobile: '+91 98765 43210',
          role: 'customer',
          favorites: ['prop-pg-001', 'prop-flat-001'],
          passwordHash: defaultPasswordHash,
          createdAt: new Date().toISOString(),
        },
      ],
      inquiries: [
        {
          id: 'INQ-2026-1001',
          customerId: 'cust-demo-001',
          customerName: 'Demo Customer',
          customerEmail: 'customer@peflarmo.com',
          customerMobile: '+91 98765 43210',
          propertyId: 'prop-pg-001',
          propertyTitle: 'Stanza Living Hudson House - Boys PG',
          propertyCategory: 'PG',
          locality: 'North Campus',
          city: 'Delhi',
          preferredMoveInDate: '2026-10-25',
          message: 'Interested in Single Private AC room. Can I visit this Saturday at 3 PM?',
          status: 'Pending Admin Review',
          createdAt: '2026-10-09T14:30:00Z',
          updatedAt: '2026-10-09T14:30:00Z',
        },
      ],
      bookings: [
        {
          id: 'BK-2026-2001',
          customerId: 'cust-demo-001',
          customerName: 'Demo Customer',
          customerEmail: 'customer@peflarmo.com',
          customerMobile: '+91 98765 43210',
          propertyId: 'prop-pg-001',
          propertyTitle: 'Stanza Living Hudson House - Boys PG',
          propertyCategory: 'PG',
          locality: 'North Campus',
          city: 'Delhi',
          roomBedOptionId: 'opt-pg-001-2',
          roomBedName: 'Double Sharing AC Room',
          moveInDate: '2026-11-01',
          durationMonths: 6,
          rentPerMonth: 13500,
          securityDeposit: 13500,
          oneTimeOnboardingFee: 999,
          totalPayableInitial: 27999,
          status: 'Pending Admin Review',
          paymentStatus: 'Pending Verification',
          occupantsCount: 1,
          specialRequests: 'Upper floor room preferred, quiet corner.',
          createdAt: '2026-10-10T11:00:00Z',
          updatedAt: '2026-10-10T11:00:00Z',
        },
      ],
      reviews: SEED_REVIEWS,
      notifications: [
        {
          id: 'notif-001',
          customerId: 'cust-demo-001',
          title: 'Booking Request Submitted',
          message: 'Your booking request #BK-2026-2001 for Stanza Living Hudson House is under Admin Review.',
          type: 'booking_update',
          referenceId: 'BK-2026-2001',
          read: false,
          createdAt: '2026-10-10T11:00:00Z',
        },
      ],
    };

    this.persist();
    return this.state;
  }

  private persist() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      const tmpPath = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tmpPath, JSON.stringify(this.state, null, 2), 'utf-8');
      fs.renameSync(tmpPath, DB_FILE);
    } catch (err) {
      console.error('Failed to persist database state:', err);
    }
  }

  // --- Properties (Strictly backend-enforced admin approval filter & exclude For Sale listings) ---
  public getApprovedProperties(filters: FilterParams = {}): Property[] {
    const db = this.ensureLoaded();
    let result = db.properties.filter(
      (p) => p.adminApprovalStatus === 'Approved' && p.flatType !== 'Sale'
    );

    if (filters.category && filters.category !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.city) {
      const q = filters.city.trim().toLowerCase();
      result = result.filter((p) => p.city.toLowerCase().includes(q));
    }

    if (filters.locality) {
      const q = filters.locality.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.locality.toLowerCase().includes(q) ||
          p.fullAddress.toLowerCase().includes(q) ||
          p.landmark.toLowerCase().includes(q)
      );
    }

    if (filters.minBudget !== undefined && !isNaN(filters.minBudget)) {
      result = result.filter((p) => p.monthlyRent >= filters.minBudget!);
    }

    if (filters.maxBudget !== undefined && !isNaN(filters.maxBudget) && filters.maxBudget > 0) {
      result = result.filter((p) => p.monthlyRent <= filters.maxBudget!);
    }

    if (filters.genderSuitability && filters.genderSuitability !== 'All') {
      result = result.filter(
        (p) => p.genderSuitability.toLowerCase() === filters.genderSuitability!.toLowerCase()
      );
    }

    if (filters.sharingType && filters.sharingType !== 'All') {
      result = result.filter((p) =>
        p.roomBedOptions.some((r) => r.sharingType === filters.sharingType)
      );
    }

    if (filters.bhk && filters.bhk !== 'All') {
      result = result.filter((p) => p.bhk === filters.bhk);
    }

    if (filters.furnishing && filters.furnishing !== 'All') {
      result = result.filter((p) => p.furnishing === filters.furnishing);
    }

    if (filters.ac !== undefined && filters.ac !== 'All') {
      const wantAc = filters.ac === true || filters.ac === 'true';
      result = result.filter((p) => p.acAvailable === wantAc);
    }

    if (filters.food && filters.food !== 'All') {
      result = result.filter((p) => p.foodOption.toLowerCase().includes(filters.food!.toLowerCase()));
    }

    if (filters.bathroom && filters.bathroom !== 'All') {
      result = result.filter((p) => p.bathroomType === filters.bathroom || p.bathroomType === 'Both Available');
    }

    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter((p) =>
        filters.amenities!.every((am) =>
          p.amenities.some((pa) => pa.toLowerCase().includes(am.toLowerCase()))
        )
      );
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (filters.sortBy === 'price_asc') {
      result.sort((a, b) => a.monthlyRent - b.monthlyRent);
    } else if (filters.sortBy === 'price_desc') {
      result.sort((a, b) => b.monthlyRent - a.monthlyRent);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Newest
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }

  public getPropertyById(id: string): Property | null {
    const db = this.ensureLoaded();
    const prop = db.properties.find((p) => p.id === id);
    if (!prop || prop.adminApprovalStatus !== 'Approved' || prop.flatType === 'Sale') {
      return null;
    }
    return prop;
  }

  // --- Customers & Auth ---
  public findCustomerByEmail(email: string) {
    const db = this.ensureLoaded();
    return db.customers.find((c) => c.email.toLowerCase() === email.trim().toLowerCase());
  }

  public findCustomerById(id: string) {
    const db = this.ensureLoaded();
    return db.customers.find((c) => c.id === id);
  }

  public createCustomer(data: { fullName: string; email: string; mobile: string; password: string }): CustomerUser {
    const db = this.ensureLoaded();
    const existing = this.findCustomerByEmail(data.email);
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser: CustomerUser & { passwordHash: string } = {
      id: `cust-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      mobile: data.mobile.trim(),
      role: 'customer',
      favorites: [],
      passwordHash: hashPassword(data.password),
      createdAt: new Date().toISOString(),
    };

    db.customers.push(newUser);
    this.persist();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = newUser;
    return safeUser;
  }

  public updateCustomerProfile(id: string, data: { fullName?: string; mobile?: string; newPassword?: string }): CustomerUser {
    const db = this.ensureLoaded();
    const idx = db.customers.findIndex((c) => c.id === id);
    if (idx === -1) {
      throw new Error('Customer account not found.');
    }

    if (data.fullName) db.customers[idx].fullName = data.fullName.trim();
    if (data.mobile) db.customers[idx].mobile = data.mobile.trim();
    if (data.newPassword) {
      db.customers[idx].passwordHash = hashPassword(data.newPassword);
    }

    this.persist();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = db.customers[idx];
    return safeUser;
  }

  public toggleFavorite(customerId: string, propertyId: string): string[] {
    const db = this.ensureLoaded();
    const customer = db.customers.find((c) => c.id === customerId);
    if (!customer) throw new Error('Customer not found');

    const index = customer.favorites.indexOf(propertyId);
    if (index === -1) {
      customer.favorites.push(propertyId);
    } else {
      customer.favorites.splice(index, 1);
    }

    this.persist();
    return customer.favorites;
  }

  // --- Inquiries ---
  public createInquiry(data: {
    customerId?: string;
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    propertyId: string;
    preferredMoveInDate: string;
    message: string;
  }): Inquiry {
    const db = this.ensureLoaded();
    const property = this.getPropertyById(data.propertyId);
    if (!property) {
      throw new Error('Property not found or is currently not active.');
    }

    const uniqueId = `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: Inquiry = {
      id: uniqueId,
      customerId: data.customerId,
      customerName: data.customerName.trim(),
      customerEmail: data.customerEmail.trim(),
      customerMobile: data.customerMobile.trim(),
      propertyId: property.id,
      propertyTitle: property.title,
      propertyCategory: property.category,
      locality: property.locality,
      city: property.city,
      preferredMoveInDate: data.preferredMoveInDate,
      message: data.message.trim(),
      status: 'Pending Admin Review', // Admin review first
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.inquiries.unshift(newInquiry);

    if (data.customerId) {
      db.notifications.unshift({
        id: `notif-${Date.now()}`,
        customerId: data.customerId,
        title: 'Inquiry Submitted',
        message: `Your inquiry #${uniqueId} for "${property.title}" was submitted and is pending Admin review.`,
        type: 'inquiry_update',
        referenceId: uniqueId,
        read: false,
        createdAt: new Date().toISOString(),
      });
    }

    this.persist();
    return newInquiry;
  }

  public getInquiriesByCustomer(customerId: string, email?: string): Inquiry[] {
    const db = this.ensureLoaded();
    return db.inquiries.filter((inq) => {
      if (inq.customerId === customerId) return true;
      if (email && inq.customerEmail.toLowerCase() === email.toLowerCase()) return true;
      return false;
    });
  }

  // --- Bookings ---
  public createBooking(data: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    propertyId: string;
    roomBedOptionId?: string;
    moveInDate: string;
    durationMonths: number;
    occupantsCount: number;
    specialRequests?: string;
  }): Booking {
    const db = this.ensureLoaded();
    const property = this.getPropertyById(data.propertyId);
    if (!property) {
      throw new Error('Property not found or is currently not available for booking.');
    }

    let selectedOption = property.roomBedOptions[0];
    if (data.roomBedOptionId) {
      const found = property.roomBedOptions.find((o) => o.id === data.roomBedOptionId);
      if (found) selectedOption = found;
    }

    // Availability validation & Double-booking prevention
    if (selectedOption && selectedOption.availableUnits <= 0) {
      throw new Error('Selected room or bed option is currently sold out. Please choose another option.');
    }

    const rentPerMonth = selectedOption ? selectedOption.rentPerMonth : property.monthlyRent;
    const securityDeposit = selectedOption ? selectedOption.securityDeposit : property.securityDeposit;
    const oneTimeOnboardingFee = 999;
    const totalPayableInitial = rentPerMonth + securityDeposit + oneTimeOnboardingFee;

    const uniqueBookingId = `BK-2026-${Math.floor(2000 + Math.random() * 8000)}`;

    const newBooking: Booking = {
      id: uniqueBookingId,
      customerId: data.customerId,
      customerName: data.customerName.trim(),
      customerEmail: data.customerEmail.trim(),
      customerMobile: data.customerMobile.trim(),
      propertyId: property.id,
      propertyTitle: property.title,
      propertyCategory: property.category,
      locality: property.locality,
      city: property.city,
      roomBedOptionId: selectedOption?.id,
      roomBedName: selectedOption?.name || 'Standard Unit',
      moveInDate: data.moveInDate,
      durationMonths: data.durationMonths || 6,
      rentPerMonth,
      securityDeposit,
      oneTimeOnboardingFee,
      totalPayableInitial,
      status: 'Pending Admin Review', // Admin review first
      paymentStatus: 'Pending Verification',
      occupantsCount: data.occupantsCount || 1,
      specialRequests: data.specialRequests?.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Decrement available units safely
    if (selectedOption && selectedOption.availableUnits > 0) {
      selectedOption.availableUnits -= 1;
    }

    db.bookings.unshift(newBooking);

    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      customerId: data.customerId,
      title: 'Booking Request Received',
      message: `Booking #${uniqueBookingId} for "${property.title}" received. Status: Pending Admin Review.`,
      type: 'booking_update',
      referenceId: uniqueBookingId,
      read: false,
      createdAt: new Date().toISOString(),
    });

    this.persist();
    return newBooking;
  }

  public getBookingsByCustomer(customerId: string): Booking[] {
    const db = this.ensureLoaded();
    return db.bookings.filter((b) => b.customerId === customerId);
  }

  public cancelBooking(customerId: string, bookingId: string, reason?: string): Booking {
    const db = this.ensureLoaded();
    const booking = db.bookings.find((b) => b.id === bookingId && b.customerId === customerId);
    if (!booking) {
      throw new Error('Booking not found or unauthorized to cancel.');
    }

    if (booking.status === 'Cancelled' || booking.status === 'Completed') {
      throw new Error(`Booking cannot be cancelled because it is already ${booking.status.toLowerCase()}.`);
    }

    booking.status = 'Cancelled';
    booking.specialRequests = (booking.specialRequests || '') + (reason ? ` [Cancellation reason: ${reason}]` : '');
    booking.updatedAt = new Date().toISOString();

    // Restore unit availability
    const prop = db.properties.find((p) => p.id === booking.propertyId);
    if (prop && booking.roomBedOptionId) {
      const opt = prop.roomBedOptions.find((o) => o.id === booking.roomBedOptionId);
      if (opt) {
        opt.availableUnits = Math.min(opt.totalUnits, opt.availableUnits + 1);
      }
    }

    this.persist();
    return booking;
  }

  // --- Reviews ---
  public getReviewsByProperty(propertyId: string): Review[] {
    const db = this.ensureLoaded();
    return db.reviews.filter((r) => r.propertyId === propertyId);
  }

  // --- Notifications ---
  public getNotificationsByCustomer(customerId: string): NotificationItem[] {
    const db = this.ensureLoaded();
    return db.notifications.filter((n) => n.customerId === customerId);
  }
}

export const dbStore = new DatabaseStore();
