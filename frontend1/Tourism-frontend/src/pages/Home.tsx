
import { useEffect } from 'react';
import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useData } from './lib/data-context';
import Layout from '../components/layout';
import AttractionCard from '../components/AttractionCard';
import { MapPin, User, Building, Search } from 'lucide-react';

const Home = () => {
  const { attractions } = useData();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section text-white py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Incredible Destinations
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore unique attractions, book with ease, and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-tourism-orange hover:bg-orange-600 text-white"
            >
              <Link to="/attractions">
                <Search className="h-5 w-5 mr-2" />
                Explore Attractions
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/signup">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tourist Card */}
            <div className="bg-tourism-soft-purple rounded-lg p-8 text-center transition-transform hover:scale-105">
              <div className="bg-tourism-purple rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Tourists</h3>
              <p className="mb-6 text-gray-600">
                Discover and book amazing experiences. Leave reviews and keep track of your bookings in one place.
              </p>
              <ul className="text-left space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="bg-tourism-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
                  <span>Browse attractions from around the world</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-tourism-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
                  <span>Book tickets with flexible payment options</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-tourism-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
                  <span>Share your experiences through reviews</span>
                </li>
              </ul>
              <Button 
                asChild
                className="bg-tourism-purple hover:bg-tourism-dark-purple text-white"
              >
                <Link to="/signup?role=tourist">
                  Register as Tourist
                </Link>
              </Button>
            </div>
            
            {/* Company Card */}
            <div className="bg-tourism-soft-blue rounded-lg p-8 text-center transition-transform hover:scale-105">
              <div className="bg-tourism-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Attraction Companies</h3>
              <p className="mb-6 text-gray-600">
                List your attractions, manage bookings, and grow your business with our powerful tools.
              </p>
              <ul className="text-left space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="bg-tourism-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
                  <span>Create listings for your attractions</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-tourism-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
                  <span>Manage bookings and confirm payments</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-tourism-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
                  <span>Track visitor statistics and reviews</span>
                </li>
              </ul>
              <Button 
                asChild
                className="bg-tourism-blue hover:bg-blue-600 text-white"
              >
                <Link to="/signup?role=company">
                  Register as Company
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Attractions */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Attractions</h2>
            <Button 
              asChild
              variant="outline" 
              className="border-tourism-purple text-tourism-purple hover:bg-tourism-soft-purple"
            >
              <Link to="/attractions">
                View All
              </Link>
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.slice(0, 3).map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-tourism-purple text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering new experiences every day. Sign up now and start exploring!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-tourism-purple hover:bg-gray-100"
            >
              <Link to="/signup">
                Sign Up Now
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/attractions">
                Browse Attractions
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
