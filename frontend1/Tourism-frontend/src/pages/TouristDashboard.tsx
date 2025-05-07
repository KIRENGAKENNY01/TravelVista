
import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './lib/auth-context';
import { BookingResponse, useData,ReviewResponse  } from './lib/data-context';
import Layout from '../components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import StarRating from '../components/StarRating';
import { useUser } from './lib/user-context';

import ErrorPage from "../pages/NotFound"
import PageSkeleton from '../pages/Skeleton'

import {
  Calendar,
  Clock,
  MapPin,
  Star,
  User,
  Book,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

const TouristDashboard = () => {
    const { user, setUser } = useUser();
  const [userBookings, setUserBookings] = useState<BookingResponse[]>([]);
  const [userReviews, setUserReviews] = useState<ReviewResponse[] >([]);
  const [error, setError] = useState(); 
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  useEffect(() => {
  
      const token = localStorage.getItem('token')
  
      const fetchedData = async () => {
        setLoading(true);
  
        try {
          const getData = await fetch(`http://localhost:8200/Tourism/v1/booking/getAllBookingForTourist`,{
            method: 'GET',
            headers:{
              'Authorization':`Bearer ${token}`,
              'Content-Type':'application/json'
            } 
          });
          console.log(getData);
          if (!getData) {
            throw new Error(`HTTP error `);
          }
          const realData = await getData.json();
          console.log("Fetched Bookings for the user :", realData);
          setUserBookings(realData);
          
        } catch (err: any) {
          console.log("Err during fetching bookings", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchedData();
    }, [])
  

    useEffect(() => {
  
      const token = localStorage.getItem('token')
  
      const fetchedData = async () => {
        setLoading(true);
  
        try {
          const getData = await fetch(`http://localhost:8200/Tourism/v1/reviews/all-on-tourist`,{
            method: 'GET',
            headers:{
              'Authorization':`Bearer ${token}`,
              'Content-Type':'application/json'
            } 
          });
          console.log(getData);
          if (!getData) {
            throw new Error(`HTTP error `);
          }
          const realData = await getData.json();
          console.log("Fetched Reviews for the user :", realData);
          setUserReviews(realData);
        } catch (err: any) {
          console.log("Err during fetching reviews", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchedData();
    }, [])
  
  


    if (loading) {
      return <PageSkeleton/>
    }
    if(error){
      return <ErrorPage />
    }




  // Helper for status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Success':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Unknown
          </span>
        );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* User Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="h-16 w-16 bg-tourism-purple rounded-full flex items-center justify-center text-white">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-500">Tourist Account</p>
            </div>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="bookings">
          <TabsList className="mb-8">
            <TabsTrigger value="bookings" className="text-sm md:text-base">
              <Calendar className="h-4 w-4 mr-2" /> My Bookings
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-sm md:text-base">
              <Star className="h-4 w-4 mr-2" /> My Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>
                  Manage your bookings and check their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userBookings.length > 0 ? (
                  <div className="space-y-6">
                    {userBookings.map(booking => {
                      
                      return (
                        <div key={booking.id} className="flex flex-col md:flex-row gap-4 border rounded-lg overflow-hidden">
                          {booking && (
                            <div className="w-full md:w-48 h-48 md:h-auto">
                              <img 
                                src={booking.imageUrl} 
                                alt={booking.attractionName} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}
                          
                          <div className="flex-grow p-4">
                            <div className="flex flex-col md:flex-row justify-between mb-4">
                              <div>
                                <h3 className="font-bold text-lg">
                                  {booking?.attractionName || 'Unknown Attraction'}
                                </h3>
                                
                                {booking && (
                                  <div className="flex items-center text-gray-500 text-sm mt-1">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{booking.location}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="mt-2 md:mt-0">
                                {getStatusBadge(booking.status)}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1  sm:grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-medium">{booking.bookingDate}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="font-medium">
                                 ${booking.entryFee.toFixed(2)}
                                  </p>

                              </div>
                              
                              <div>
                                <p className="text-sm text-gray-500">Payment Method</p>
                                <p className="font-medium">{booking.paymentMethod}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              <Button 
                                asChild
                                variant="outline" 
                                size="sm" 
                                className="border-tourism-purple text-tourism-purple hover:bg-tourism-soft-purple"
                              >
                                <Link to={`/attractions/${booking.attractionId}`}>
                                  <Book className="h-4 w-4 mr-1" /> View Attraction
                                </Link>
                              </Button>
                              
                              {booking.status === 'confirmed' && (
                                <Button 
                                  asChild
                                  variant="outline" 
                                  size="sm"
                                  className="border-tourism-orange text-tourism-orange hover:bg-tourism-soft-peach"
                                >
                                  <Link to={`/attractions/${booking.attractionId}`}>
                                    <Star className="h-4 w-4 mr-1" /> Leave Review
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Book className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                    <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
                    <Button 
                      asChild 
                      className="bg-tourism-purple hover:bg-tourism-dark-purple"
                    >
                      <Link to="/attractions">
                        Explore Attractions
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
                <CardDescription>
                  See all the reviews you've left for attractions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userReviews.length > 0 ? (
                  <div className="space-y-6">
                    {userReviews.map(review => (
                      <div key={review.id} className="flex flex-col md:flex-row gap-4 border rounded-lg overflow-hidden">
                        <div className="w-full md:w-48 h-48 md:h-auto">
                          <img 
                            src={review.imageUrl} 
                            alt={review.attractionName} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        
                        <div className="flex-grow p-4">
                          <div className="flex justify-between mb-4">
                            <h3 className="font-bold text-lg">
                              {review.attractionName}
                            </h3>
                            <div className="flex items-center">
                              <StarRating initialRating={review.rating} readOnly />
                              <span className="ml-2 text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4">{review.comment}</p>
                          
                          <Button 
                            asChild
                            variant="outline" 
                            size="sm" 
                            className="border-tourism-purple text-tourism-purple hover:bg-tourism-soft-purple"
                          >
                            <Link to={`/attractions/${review.attractionId}`}>
                              <Book className="h-4 w-4 mr-1" /> View Attraction
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                    <p className="text-gray-500 mb-6">You haven't left any reviews yet.</p>
                    <Button 
                      asChild 
                      className="bg-tourism-purple hover:bg-tourism-dark-purple"
                    >
                      <Link to="/attractions">
                        Explore Attractions
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TouristDashboard;
