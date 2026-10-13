export type PropertyCategory = 'PG' | 'Flat' | 'Room' | 'Hostel';

export type ApprovalStatus = 'Approved' | 'Pending Admin Approval' | 'Draft' | 'Rejected' | 'Suspended';

export type AvailabilityStatus = 'Available Now' | 'Filling Fast' | 'Available Next Month' | 'Sold Out';

export type GenderSuitability = 'Boys' | 'Girls' | 'Co-ed / Coliving' | 'Family' | 'Bachelors / Anyone';

export type SharingType = 'Single' | 'Double' | 'Triple' | 'Four Sharing' | 'Dormitory' | 'Entire Flat';

export type FurnishingStatus = 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';

export type FoodType = '3 Meals Included' | 'Breakfast Included' | 'Food On Demand / Mess' | 'Self Cooking / Kitchen Available' | 'No Food';

export type BathroomType = 'Attached' | 'Common' | 'Both Available';

export type StayDurationType = 'Short-Term & Long-Term' | 'Long-Term Only (6m+)' | 'Short-Term Only';

export interface RoomBedOption {
  id: string;
  name: string; // e.g., "Single Private AC Room", "Double Sharing Bed A", "Master Bedroom with Balcony"
  sharingType: SharingType;
  rentPerMonth: number;
  securityDeposit: number;
  ac: boolean;
  bathroomType: BathroomType;
  foodOption: FoodType;
  totalUnits: number;
  availableUnits: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  category: PropertyCategory;
  city: string;
  locality: string;
  fullAddress: string;
  landmark: string;
  genderSuitability: GenderSuitability;
  monthlyRent: number; // Base or starting rent
  securityDeposit: number;
  bhk?: string; // For Flats: '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '5+ BHK'
  flatType?: 'Rent' | 'Sale'; // Flat for rent or sale
  salePrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  superAreaSqFt?: number;
  furnishing: FurnishingStatus;
  acAvailable: boolean;
  foodOption: FoodType;
  bathroomType: BathroomType;
  stayDuration: StayDurationType;
  availableFrom: string;
  availabilityStatus: AvailabilityStatus;
  adminApprovalStatus: ApprovalStatus;
  isVerifiedByAdmin: boolean;
  images: string[];
  amenities: string[];
  rules: string[];
  description: string;
  nearByHubs: string[]; // e.g. "Metro Station 300m", "Delhi University North Campus 1.2km"
  roomBedOptions: RoomBedOption[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: 'customer';
  favorites: string[]; // property IDs
  createdAt: string;
}

export type InquiryStatus = 
  | 'Pending Admin Review'
  | 'Under Review'
  | 'Assigned to Owner/Broker'
  | 'Response Received'
  | 'Closed';

export interface Inquiry {
  id: string; // e.g. INQ-2026-1042
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  propertyId: string;
  propertyTitle: string;
  propertyCategory: PropertyCategory;
  locality: string;
  city: string;
  preferredMoveInDate: string;
  message: string;
  status: InquiryStatus;
  adminNotes?: string;
  assignedOwnerBrokerName?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 
  | 'Pending Admin Review'
  | 'Under Review'
  | 'Awaiting Owner/Broker Confirmation'
  | 'Confirmed'
  | 'Rejected'
  | 'Cancelled'
  | 'Completed';

export type PaymentStatus = 'Pending Verification' | 'Deposit Paid' | 'Fully Paid' | 'Refunded';

export interface Booking {
  id: string; // e.g. BK-2026-4921
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  propertyId: string;
  propertyTitle: string;
  propertyCategory: PropertyCategory;
  locality: string;
  city: string;
  roomBedOptionId?: string;
  roomBedName?: string;
  moveInDate: string;
  durationMonths: number;
  rentPerMonth: number;
  securityDeposit: number;
  oneTimeOnboardingFee: number;
  totalPayableInitial: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  occupantsCount: number;
  specialRequests?: string;
  adminReviewRemarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  customerName: string;
  rating: number;
  comment: string;
  stayPeriod: string;
  date: string;
  verifiedBooking: boolean;
}

export interface NotificationItem {
  id: string;
  customerId: string;
  title: string;
  message: string;
  type: 'inquiry_update' | 'booking_update' | 'system';
  referenceId?: string;
  read: boolean;
  createdAt: string;
}

export interface FilterParams {
  category?: PropertyCategory | 'all';
  city?: string;
  locality?: string;
  minBudget?: number;
  maxBudget?: number;
  genderSuitability?: string;
  sharingType?: string;
  bhk?: string;
  furnishing?: string;
  ac?: boolean | string;
  food?: string;
  bathroom?: string;
  amenities?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
  searchQuery?: string;
}
