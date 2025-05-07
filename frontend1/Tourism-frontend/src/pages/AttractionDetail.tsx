
import { useState, useEffect } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout';
import StarRating from '../components/StarRating';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Attraction,Review } from './lib/data-context';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  User, 
  Building, 
  Star, 
  Clock, 
  DollarSign,
  CreditCard,
  Wallet 
} from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import ErrorPage from "../pages/NotFound"
import PageSkeleton from '../pages/Skeleton'



const AttractionDetail = () => {
  const { id } = useParams<{id:string}>();

  const navigate = useNavigate();
  const { toast } = useToast();
  
  
  const [attraction, setAttraction] = useState<Attraction>();
  const [attractionReviews, setAttractionReviews] = useState<Review[]>([]);
  const [bookingDate, setBookingDate] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [reviewRating, setReviewRating] = useState<number>();
  const [reviewComment, setReviewComment] = useState<string>("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  
  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);





  useEffect(() => {

  const token = localStorage.getItem('token')

    const fetchedData = async () => {
      setLoading(true);

      try {
        const getData = await fetch(`http://localhost:8200/Tourism/v1/attraction/${id}`,{
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
        console.log("Fetched  attractions :", realData);
        setAttraction(realData);
      } catch (err: any) {
        console.log("Err during fetching attractions", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchedData();
  }, []);



  useEffect(() => {

    const token = localStorage.getItem('token')

    const fetchedData = async () => {
      setLoading(true);

      try {
        const getData = await fetch(`http://localhost:8200/Tourism/v1/reviews/all-on-Attraction/${id}`,{
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
        console.log("Fetched reviews on this attraction:", realData);
        setAttractionReviews(realData);
      } catch (err: any) {
        console.log("Err during fetching reviews", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchedData();
  }, [])


  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token')
  
    const payload = {
      rating:reviewRating,
      comment:reviewComment
    };
  
    axios
      .post(`http://localhost:8200/Tourism/v1/reviews/createReview/${id}`, payload,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() => {
        console.log("Creating a review was successful");
          // Optionally reset the form
      setReviewRating(0);
      setReviewComment("");

      toast({
        title:"Success",
        description:"Review Submitted Successfully"
      })

      })
      .catch((err:any) => {
        if (err.response) {
          console.error("Error response:", err.response.data);
        } else if (err.request) {
          console.error("Error request:", err.request);
        } else {
          console.error("Error message:", err.message);
        }

        toast({
          title:"Error",
          description:"Failed to submit review"
        })

      })
      
  };


  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!paymentMethod ){
      toast({
      title: "Missing fields", 
      description:"lease fill in all fields",
      variant: "destructive",
      })

      setShowBookingModal(false)
      return;
    }

    const token = localStorage.getItem('token')


  
    const payload = {
      bookingDate:bookingDate,
      paymentMethod:paymentMethod
    };
  
    axios
      .post(`http://localhost:8200/Tourism/v1/booking/createBooking/${id}`, payload,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      .then(() => {
        console.log("creating a booking was successful");
          // Optionally reset the form
      setShowBookingModal(false);
     setBookingDate("");
     navigate("/tourist-dashboard")

     toast({
      title: "Booking Created",
      description: "You have Booked your attraction Successfully",
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

        toast({
          title: "Failed to Book",
          description: "Error during Booking Attraction",
        });
      })


   
      
  };
 


  const avgRating =
  attractionReviews.length > 0
    ? attractionReviews.reduce((acc, review) => acc + review.rating, 0) / attractionReviews.length
    : 0;

  




   
     if (loading) {
       return <PageSkeleton/>
     }
     if(error){
       return <ErrorPage />
     }


  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 lg:h-[30rem]">
        <img 
          src={attraction?.imageUrl} 
          alt={attraction?.attractionName} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-8 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {attraction?.attractionName}
            </h1>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5" />
              <span>{attraction?.location}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <StarRating initialRating={Math.round(avgRating)} readOnly />
                <span className="ml-2">{avgRating.toFixed(1)} ({attractionReviews.length})</span>
              </div>
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-1" />
                <span>{attraction?.companyName}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Details */}
            <div className="flex-grow">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews ({attractionReviews.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>About this attraction</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-gray-700 leading-relaxed">
                        {attraction?.attractionDescription}
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mt-8">
                        <div className="flex items-start">
                          <div className="mr-4 p-3 bg-tourism-soft-purple rounded-md text-tourism-purple">
                            <Clock className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">Opening Hours</h3>
                            <p className="text-sm text-gray-500">Monday - Sunday: 9:00 AM - 7:00 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-4 p-3 bg-tourism-soft-purple rounded-md text-tourism-purple">
                            <DollarSign className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">Price</h3>
                            <p className="text-sm text-gray-500">${attraction?.entryFee.toFixed(2)} per person</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Write a Review</CardTitle>
                      <CardDescription>
                        Share your experience with other tourists
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Your Rating
                          </label>
                          <StarRating 
                            initialRating={reviewRating} 
                            onChange={setReviewRating} 
                            size="lg" 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="comment" className="block text-sm font-medium mb-2">
                            Your Review
                          </label>
                          <Textarea 
                            id="comment" 
                            placeholder="Tell us about your experience..." 
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            rows={4}
                          />
                        </div>
                        
                        <Button type="submit" className="bg-tourism-purple hover:bg-tourism-dark-purple">
                          Submit Review
                        </Button>
                        



                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Reviews</CardTitle>
                      {attractionReviews.length > 0 ? (
                        <CardDescription>
                          {attractionReviews.length} reviews for this attraction
                        </CardDescription>
                      ) : (
                        <CardDescription>
                          No reviews yet. Be the first to review!
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {attractionReviews.map((review) => (
                          <div key={review.id} className="border-b pb-6 last:border-b-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-3 h-10 w-10 rounded-full bg-tourism-soft-purple flex items-center justify-center">
                                  <User className="h-6 w-6 text-tourism-purple" />
                                </div>
                                <div>
                                  <p className="font-medium">{review.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(review.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <StarRating initialRating={review.rating} readOnly />
                            </div>
                            <p className="mt-3 text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Card */}
        
              <div className="lg:w-96">
              
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Book this attraction</CardTitle>
                      <CardDescription>
                        Secure your spot and avoid disappointment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold mb-4">
                        ${attraction?.entryFee.toFixed(2)}
                        <span className="text-base text-gray-500 font-normal">/ person</span>
                      </p>
                       <div className='flex flex-col justify-center items-center'>
                         <p className='text-sm  text-gray-500'>After Booking Call this number</p>
                         <p className='text-lg  text-gray-700 font-semibold'>{attraction?.phoneNumber}</p>
                       </div>
              
                      <div className="space-y-4 mt-6">
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium mb-2">
                            Select Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              id="date"
                              type="date"
                              min={today}
                              className="pl-10"
                              onChange={(e) => setBookingDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className='flex flex-col items-center justify-center'>
                      <Button
                        className="w-full bg-tourism-orange hover:bg-orange-600"
                        onClick={()=>{
                          if(!bookingDate){
                            toast({
                              title:"Missing date",
                              description:"First put the date you want to visit the attraction",
                              variant:"destructive"
                            })
              
                          }
                          else{
                            setShowBookingModal(true)
                          }
              
                        }}
                      >
                        <Calendar className="mr-2 h-5 w-5" /> Book Now
                      </Button>
                    </CardFooter>
                  </Card>
                              </div>
                              </div>
                        </div>
                      </section>
              
              
                        {/* Booking Dialog */}
                        <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
                          <DialogContent className="max-w-md">
                            <form onSubmit={handleBookingSubmit}>
                              <DialogHeader>
                                <DialogTitle>Complete Your Booking</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="flex items-center justify-between">
                                                <span className="text-gray-500">Attraction:</span>
                                                <span className="font-medium">{attraction?.attractionName}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                                <span className="text-gray-500">Date:</span>
                                                <span className="font-medium">{bookingDate}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                                <span className="text-gray-500">Price:</span>
                                                <span className="font-medium">${attraction?.entryFee.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4">
                                                <label className="block text-sm font-medium mb-3">
                                                  Payment Method
                                                </label>
                                            
                                                <div className="space-y-2">
                                                  <div
                                                    className={`flex items-center p-3 border rounded-md cursor-pointer ${
                                                      paymentMethod === 'CreditCard' ? 'border-tourism-purple bg-tourism-soft-purple' : 'border-gray-200'
                                                    }`}
                                                    onClick={() => setPaymentMethod('CreditCard')}
                                                  >
                                                    <div className="h-5 w-5 rounded-full border mr-3 flex items-center justify-center">
                                                      {paymentMethod === 'CreditCard' && (
                                                        <div className="h-3 w-3 rounded-full bg-tourism-purple"></div>
                                                      )}
                                                    </div>
                                                    <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                                                    <span>Credit Card</span>
                                                  </div>
                                            
                                                  <div
                                                    className={`flex items-center p-3 border rounded-md cursor-pointer ${
                                                      paymentMethod === 'BankTransfer' ? 'border-tourism-purple bg-tourism-soft-purple' : 'border-gray-200'
                                                    }`}
                                                    onClick={() => setPaymentMethod('BankTransfer')}
                                                  >
                                                    <div className="h-5 w-5 rounded-full border mr-3 flex items-center justify-center">
                                                      {paymentMethod === 'BankTransfer' && (
                                                        <div className="h-3 w-3 rounded-full bg-tourism-purple"></div>
                                                      )}
                                                    </div>
                                                    <Wallet className="h-5 w-5 text-gray-500 mr-2" />
                                                    <span>Bank Transfer</span>
                                                  </div>
                                            
                                                  <div
                                                    className={`flex items-center p-3 border rounded-md cursor-pointer ${
                                                      paymentMethod === 'Cash' ? 'border-tourism-purple bg-tourism-soft-purple' : 'border-gray-200'
                                                    }`}
                                                    onClick={() => setPaymentMethod('Cash')}
                                                  >
                                                    <div className="h-5 w-5 rounded-full border mr-3 flex items-center justify-center">
                                                      {paymentMethod === 'Cash' && (
                                                        <div className="h-3 w-3 rounded-full bg-tourism-purple"></div>
                                                      )}
                                                    </div>
                                                    <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                                                    <span>Cash on Arrival</span>
                                                  </div>
                                                </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                                variant="outline"
                                                onClick={() => setShowBookingModal(false)}
                                >
                                                Cancel
                                </Button>
                                <Button
                                                className="bg-tourism-purple hover:bg-tourism-dark-purple"
                                                type='submit'
                                >
                                                Confirm Booking
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
            
              
                     
    </Layout>

 
  );
};

export default AttractionDetail;
