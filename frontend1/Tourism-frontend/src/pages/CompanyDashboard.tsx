
import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './lib/auth-context';
import { Attraction, ReviewResponse,BookingResponse, useData } from './lib/data-context';
import Layout from '../components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useUser } from './lib/user-context';
import ErrorPage from "../pages/NotFound"
import PageSkeleton from '../pages/Skeleton'
import axios from 'axios'
import {
  Building,
  MapPin,
  Plus,
  Star,
  Calendar,
  Check,
  Users,
  Image,
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useToast } from '../components/ui/use-toast';
import StarRating from '../components/StarRating';
import AttractionCard from '../components/AttractionCard';

const CompanyDashboard = () => {
   const { user, setUser } = useUser();
  const {  updateBookingStatus } = useData();
  const { toast } = useToast();
    const [error, setError] = useState(); 
    const [loading, setLoading] = useState<boolean>(false);
  
  
  const [companyAttractions, setCompanyAttractions] = useState<Attraction[]>([])
  const [companyBookings, setCompanyBookings] = useState<BookingResponse[]>([]);
  const [companyReviews, setCompanyReviews] = useState<ReviewResponse[]>([]);
  const [isNewAttractionDialogOpen, setIsNewAttractionDialogOpen] = useState(false);
  
  // New attraction form state
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [price, setPrice] = useState<number>();
  const [location, setLocation] = useState<string>('');
  const [openHours , setOpenHours] = useState<string>('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   useEffect(() => {
   
       const token = localStorage.getItem('token')
   
       const fetchedData = async () => {
         setLoading(true);
   
         try {
           const getData = await fetch(`http://localhost:8200/Tourism/v1/attraction/company`,{
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
           console.log("Fetched attractions for this company :", realData);
           setCompanyAttractions(realData);
         } catch (err: any) {
           console.log("Err during fetching attractions", err);
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
          const getData = await fetch(`http://localhost:8200/Tourism/v1/booking/getAllBookingForCompany`,{
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
          console.log("Fetched bookings for this company :", realData);
          setCompanyBookings(realData);
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
          const getData = await fetch(`http://localhost:8200/Tourism/v1/reviews/all-on-company`,{
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
          console.log("Fetched reviews for this company :", realData);
          setCompanyReviews(realData);
        } catch (err: any) {
          console.log("Err during fetching reviews", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchedData();
    }, [])





    const handleAddAttraction = (e: React.FormEvent<HTMLFormElement>) => {
      if (!title || !description || !image || !price || !location) {
        toast({
          title: "Missing fields",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }


      e.preventDefault();
      
      const token = localStorage.getItem('token')
    
      const payload = {
        attractionName:title,
        attractionDescription:description,
        imageUrl:image,
        entryFee:price,
        location:location,
        openHours:openHours
      };
    
      axios
        .post(`http://localhost:8200/Tourism/v1/attraction/createAttraction`, payload,
          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(() => {
          console.log("Creating an attraction was successful");
            // Optionally reset the form
        setTitle('');
        setDescription('');
        setImage('');
        setPrice(0);
        setLocation('')
        })
        .catch((err:any) => {
          if (err.response) {
            console.error("Error response:", err.response.data);
          } else if (err.request) {
            console.error("Error request:", err.request);
          } else {
            console.error("Error message:", err.message);
          }
        })

        setIsNewAttractionDialogOpen(false);



        toast({
          title: "Attraction added!",
          description: "Your new attraction has been added successfully",
        });
        
    };


    



  const handleConfirmBooking = (bookingId: number) => {

    const payload = {
      status:"Success",
      paymentConfirmed:true
    }

    
    const token = localStorage.getItem('token')
   
    axios
    .put(`http://localhost:8200/Tourism/v1/booking/confirm/${bookingId}`, payload,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => {
      console.log("Creating an attraction was successful");
        // Optionally reset the form
        toast({
          title: "Booking confirmed",
          description: "The booking has been confirmed successfully",
        });
    })
    .catch((err:any) => {
      if (err.response) {
        console.error("Error response:", err.response.data);
      } else if (err.request) {
        console.error("Error request:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
    })


    



    
   
  };

  const handleCancelBooking = (bookingId: number) => {
    


    const payload = {
      status:"Cancelled",
      paymentConfirmed:false
    }
    
    const token = localStorage.getItem('token')
   
    axios
    .put(`http://localhost:8200/Tourism/v1/booking/confirm/${bookingId}`, payload,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => {
      console.log("Creating an attraction was successful");
        // Optionally reset the form
        toast({
          title: "Booking cancelled",
          description: "The booking has been cancelled",
        });
    })
    .catch((err:any) => {
      if (err.response) {
        console.error("Error response:", err.response.data);
      } else if (err.request) {
        console.error("Error request:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
    })


    
 
  };

  // Calculate total visitors
  const totalVisitors = companyAttractions.reduce((sum, attr) => sum + attr.visitors, 0);



  
  if (loading) {
    return <PageSkeleton/>
  }
  if(error){
    return <ErrorPage />
  }


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
        {/* Company Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="h-16 w-16 bg-tourism-blue rounded-full flex items-center justify-center text-white">
              <Building className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-500">Company Account</p>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-tourism-soft-purple rounded-md">
                  <Image className="h-6 w-6 text-tourism-purple" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Attractions</p>
                  <p className="text-2xl font-bold">{companyAttractions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-tourism-soft-peach rounded-md">
                  <Users className="h-6 w-6 text-tourism-orange" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Visitors</p>
                  <p className="text-2xl font-bold">{totalVisitors}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-tourism-soft-blue rounded-md">
                  <Star className="h-6 w-6 text-tourism-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reviews</p>
                  <p className="text-2xl font-bold">{companyReviews.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="attractions">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="attractions" className="text-sm md:text-base">
                <Image className="h-4 w-4 mr-2" /> Attractions
              </TabsTrigger>
              <TabsTrigger value="bookings" className="text-sm md:text-base">
                <Calendar className="h-4 w-4 mr-2" /> Bookings
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm md:text-base">
                <Star className="h-4 w-4 mr-2" /> Reviews
              </TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={() => setIsNewAttractionDialogOpen(true)} 
              className="bg-tourism-blue hover:bg-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Attraction
            </Button>
          </div>
          
          <TabsContent value="attractions">
            <Card>
              <CardHeader>
                <CardTitle>Your Attractions</CardTitle>
                <CardDescription>
                  Manage your posted attractions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {companyAttractions.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companyAttractions.map(attraction => (
                      <AttractionCard 
                        key={attraction.id} 
                        attraction={attraction} 
                        showBookButton={false} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Image className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No attractions yet</h3>
                    <p className="text-gray-500 mb-6">You haven't added any attractions yet.</p>
                    <Button 
                      onClick={() => setIsNewAttractionDialogOpen(true)} 
                      className="bg-tourism-blue hover:bg-blue-600"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Your First Attraction
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
                <CardDescription>
                  Manage bookings for your attractions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {companyBookings.length > 0 ? (
                  <div className="space-y-6">
                    {companyBookings.map(booking => (
                      <div key={booking.id} className="flex flex-col md:flex-row gap-4 border rounded-lg overflow-hidden">
                        <div className="w-full md:w-48 h-48 md:h-auto">
                          <img 
                            src={booking.imageUrl} 
                            alt={booking.imageUrl} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        
                    

                        <div className="flex-grow p-4">
                        
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-lg">
                                {booking.attractionName}
                              </h3>
                              <p className="text-sm text-gray-500 mb-3 flex flex-col ">
                                Booked by: 
                                <div className='text-md text-[#000] font-semibold'>{booking.username}</div>
                              </p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
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
                            </div>
                          

                            
                                <div className='flex flex-col items-center justify-center'>
                                  <h1 className='font-semibold'>Customer's details</h1>
                                  <div className='flex justify-center gap-2 items-center'>
                                    <p className="text-sm text-gray-500">Name:</p>
                                    <p className="font-medium">{booking.username}</p>
                                  </div>
                                  <div className='flex justify-center gap-2 items-center'>
                                    <p className="text-sm text-gray-500">Email:</p>
                                    <p className="font-medium">{booking.email}</p>
                                  </div>
                                  <div className='flex justify-center gap-2 items-center'>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium">{booking.phone}</p>
                                  </div>
                                </div>

                                <div className="mt-2  self-start   md:mt-0 ">
                                {getStatusBadge(booking.status)}
                              </div>
                            
                            <div className="   flex-shrink-0 flex flex-col  items-center justify-center gap-1">
                              {booking.status === 'Pending' && (
                                <>
                                  <Button
                                    onClick={() => handleConfirmBooking(booking.id)}
                                    className="bg-green-600 text-sm  hover:bg-green-700 "
                                  >
                                    <Check className="h-4 w-4 " /> Confirm Booking
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => handleCancelBooking(booking.id)}
                                    className="border-red-500 text-red-500 hover:bg-red-50"
                                  >
                                    Cancel
                                  </Button>
                                </>
                              )}
                              
                              {booking.status === 'confirmed' && (
                                <div className="px-3 py-2 bg-green-100 text-green-800 rounded-md text-center">
                                  Confirmed
                                </div>
                              )}
                              
                              {booking.status === 'cancelled' && (
                                <div className="px-3 py-2 bg-red-100 text-red-800 rounded-md text-center">
                                  Cancelled
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                    <p className="text-gray-500">You haven't received any bookings yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  See what tourists are saying about your attractions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {companyReviews.length > 0 ? (
                  <div className="space-y-6">
                    {companyReviews.map(review => (
                      <div key={review.id} className="flex flex-col md:flex-row gap-4 border rounded-lg overflow-hidden">
                        <div className="w-full md:w-48 h-48 md:h-auto">
                       
                          <img 
                            src={review.imageUrl} 
                         
                            alt={review.attractionName} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        
                        <div className="flex-grow p-4">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-bold text-lg">
                              {review.attractionName}
                            </h3>
                            <div className="flex items-center">
                              <StarRating initialRating={review.rating} readOnly />
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            By: {review.name} on {new Date(review.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                    <p className="text-gray-500">Your attractions haven't received any reviews yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Add Attraction Dialog */}
        <Dialog open={isNewAttractionDialogOpen} onOpenChange={setIsNewAttractionDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Attraction</DialogTitle>
              <DialogDescription>
                Create a new attraction for tourists to discover and book.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Mountain Adventure Park"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your attraction in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="49.99"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Tip: Use high-quality images of at least 800x600 pixels for best results.
                </p>
              </div>

          

              <div className="grid gap-2">
                <Label htmlFor="title">Opening hours</Label>
                <Input
                  id="openHours"
                  placeholder="Monday - Sunday: 9:00 AM - 7:00 PM"
                  value={openHours}
                  onChange={(e) => setOpenHours(e.target.value)}
                />
              </div>
              

            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsNewAttractionDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddAttraction}
                className="bg-tourism-blue hover:bg-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Attraction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CompanyDashboard;
