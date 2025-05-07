
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from './auth-context';

// Types
export interface Attraction {
  id: number;
  attractionName: string;
  attractionDescription: string;
  imageUrl: string;
  entryFee: number;
  location: string;
  openHours: string;
  companyName: string;
  phoneNumber:string; 
  
  // visitors: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ReviewResponse {
  attractionName:string;
  imageUrl:string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  attractionId: string; 
}

export interface Booking {
  id: string;
  attractionId: string;
  userId: string;
  userName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentMethod: string;
  amount: number;
  createdAt: string;
}

export interface BookingResponse {
  attractionName: string; 
  entryFee:number; 
  imageUrl:string; 
  bookingDate: string; 
  status: string; 
  paymentConfirmed: boolean; 
  location:string;
  attractionId:number; 
  username:string;
  paymentMethod: 'CreditCard' | 'BankTransfer' | 'Cash' ;
  email:string;
  phone:string;
  id:number
}

interface DataContextType {
  attractions: Attraction[];
  reviews: Review[];
  bookings: Booking[];
  addAttraction: (attraction: Omit<Attraction, 'id' | 'createdAt' | 'visitors'>) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => void;
  getAttractionById: (id: string) => Attraction | undefined;
  getReviewsByAttractionId: (attractionId: string) => Review[];
  getBookingsByUserId: (userId: string) => Booking[];
  getBookingsByCompanyId: (companyId: string) => Booking[];
}

const DataContext = createContext<DataContextType>({
  attractions: [],
  reviews: [],
  bookings: [],
  addAttraction: () => {},
  addReview: () => {},
  addBooking: () => {},
  updateBookingStatus: () => {},
  getAttractionById: () => undefined,
  getReviewsByAttractionId: () => [],
  getBookingsByUserId: () => [],
  getBookingsByCompanyId: () => [],
});

// Sample data
const sampleAttractions: Attraction[] = [
  {
    id: '1',
    title: 'Mountain Adventure Park',
    description: 'Experience thrilling activities in our mountain adventure park. Hiking, zip-lining, and more!',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    price: 49.99,
    location: 'Alpine Valley',
    companyId: '2',
    companyName: 'Adventure Company',
    createdAt: new Date().toISOString(),
    visitors: 1245
  },
  {
    id: '2',
    title: 'Coastal Paradise Tour',
    description: 'Explore the beautiful coastline with guided tours, swimming, and boat rides.',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    price: 79.99,
    location: 'Seaside Town',
    companyId: '2',
    companyName: 'Adventure Company',
    createdAt: new Date().toISOString(),
    visitors: 892
  },
  {
    id: '3',
    title: 'Historic City Walk',
    description: 'Take a walk through the historic city center with an expert guide explaining the rich history.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    price: 29.99,
    location: 'Old City',
    companyId: '2',
    companyName: 'Adventure Company',
    createdAt: new Date().toISOString(),
    visitors: 576
  },
  {
    id: '4',
    title: 'Wildlife Safari Experience',
    description: 'Get close to nature and see wild animals in their natural habitat with our experienced guides.',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d',
    price: 89.99,
    location: 'Natural Reserve',
    companyId: '2',
    companyName: 'Adventure Company',
    createdAt: new Date().toISOString(),
    visitors: 1024
  },
];

const sampleReviews: Review[] = [
  {
    id: '1',
    attractionId: '1',
    userId: '1',
    userName: 'John Tourist',
    rating: 5,
    comment: 'Amazing experience! Highly recommended.',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    attractionId: '1',
    userId: '3',
    userName: 'Sarah Traveler',
    rating: 4,
    comment: 'Great adventure, though prices at the café were a bit high.',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    attractionId: '2',
    userId: '1',
    userName: 'John Tourist',
    rating: 5,
    comment: 'The coastal views were breathtaking. Our guide was very knowledgeable.',
    createdAt: new Date().toISOString()
  },
];

const sampleBookings: Booking[] = [
  {
    id: '1',
    attractionId: '1',
    userId: '1',
    userName: 'John Tourist',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    amount: 49.99,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    attractionId: '2',
    userId: '1',
    userName: 'John Tourist',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: 'confirmed',
    paymentMethod: 'Credit Card',
    amount: 79.99,
    createdAt: new Date().toISOString()
  },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [attractions, setAttractions] = useState<Attraction[]>(sampleAttractions);
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  
  // Load from localStorage if available
  useEffect(() => {
    const storedAttractions = localStorage.getItem('attractions');
    const storedReviews = localStorage.getItem('reviews');
    const storedBookings = localStorage.getItem('bookings');
    
    if (storedAttractions) setAttractions(JSON.parse(storedAttractions));
    if (storedReviews) setReviews(JSON.parse(storedReviews));
    if (storedBookings) setBookings(JSON.parse(storedBookings));
  }, []);
  
  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('attractions', JSON.stringify(attractions));
    localStorage.setItem('reviews', JSON.stringify(reviews));
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [attractions, reviews, bookings]);

  const addAttraction = (attraction: Omit<Attraction, 'id' | 'createdAt' | 'visitors'>) => {
    const newAttraction: Attraction = {
      ...attraction,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      visitors: 0
    };
    
    setAttractions([...attractions, newAttraction]);
  };

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    };
    
    setReviews([...reviews, newReview]);
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    };
    
    setBookings([...bookings, newBooking]);
    
    // Increment visitors count for the attraction
    setAttractions(
      attractions.map(attr => 
        attr.id === booking.attractionId 
          ? { ...attr, visitors: attr.visitors + 1 } 
          : attr
      )
    );
  };

  const updateBookingStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    setBookings(
      bookings.map(booking => 
        booking.id === id 
          ? { ...booking, status } 
          : booking
      )
    );
  };

  const getAttractionById = (id: string) => {
    return attractions.find(attr => attr.id === id);
  };

  const getReviewsByAttractionId = (attractionId: string) => {
    return reviews.filter(review => review.attractionId === attractionId);
  };

  const getBookingsByUserId = (userId: string) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const getBookingsByCompanyId = (companyId: string) => {
    // First get all attractions by this company
    const companyAttractionIds = attractions
      .filter(attr => attr.companyId === companyId)
      .map(attr => attr.id);
    
    // Then find all bookings for these attractions
    return bookings.filter(booking => 
      companyAttractionIds.includes(booking.attractionId)
    );
  };

  return (
    <DataContext.Provider value={{
      attractions,
      reviews,
      bookings,
      addAttraction,
      addReview,
      addBooking,
      updateBookingStatus,
      getAttractionById,
      getReviewsByAttractionId,
      getBookingsByUserId,
      getBookingsByCompanyId,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
