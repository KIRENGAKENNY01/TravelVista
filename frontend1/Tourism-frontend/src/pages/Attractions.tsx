
import { useState, useEffect } from 'react';
import React from 'react';
import Layout from '../components/layout';
import AttractionCard from '../components/AttractionCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import ErrorPage from "../pages/NotFound"
import PageSkeleton from '../pages/Skeleton'
import { Attraction } from './lib/data-context';




const Attractions = () => {
 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [attractions,setAttractions] = useState<Attraction[]>([])
  const [error, setError] = useState();


  

  useEffect(() => {
    const fetchedData = async () => {
      setLoading(true);

      try {
        const getData = await fetch("http://localhost:8200/Tourism/v1/attraction/get-all-attraction");
        console.log(getData);
        if (!getData) {
          throw new Error(`HTTP error `);
        }
        const realData = await getData.json();
        console.log("Fetched Data:", realData);
        setAttractions(realData);
      } catch (err: any) {
        console.log("Err during fetching data", err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchedData();
  }, []);


 

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const filtered = attractions.filter(attraction => 
      (attraction.attractionName.toLowerCase().includes(searchTerm.toLowerCase()) || 
       attraction.attractionDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
       attraction.location.toLowerCase().includes(searchTerm.toLowerCase()) ||   
       (typeof attraction.entryFee === 'number' && attraction.entryFee.toString().includes(searchTerm)) ||
       attraction.imageUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
       attraction.openHours.toLowerCase().includes(searchTerm.toLowerCase()) ||
       attraction.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (typeof attraction.id === 'number' && attraction.id.toString().includes(searchTerm))
      )

       &&
      attraction.entryFee >= priceRange.min &&
      attraction.entryFee <= priceRange.max
    );
    setFilteredAttractions(filtered);
  }, [searchTerm, attractions, priceRange]);

  const uniqueLocations = [...new Set(attractions.map(a => a.location))];

  if (loading) {
    return <PageSkeleton/>
  }
  if(error){
    return <ErrorPage />
  }


  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gray-900 bg-opacity-80 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027')] bg-blend-overlay bg-cover bg-center py-16 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-6">Discover Amazing Attractions</h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Find and book the best experiences for your next adventure.
          </p>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 flex items-stretch">
            <div className="flex-grow flex items-center pl-3 text-gray-400">
              <Search className="h-5 w-5 mr-2" />
              <Input
                type="search"
                placeholder="Search attractions, locations..."
                onChange={e => setSearchTerm(e.target.value)}
                className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
            </div>
            <Button className="bg-tourism-purple hover:bg-tourism-dark-purple">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar with filters */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-20">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className={`space-y-6 ${showFilters || 'hidden md:block'}`}>
                  {/* Price Range */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Price Range</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>${priceRange.min}</span>
                        <span>${priceRange.max}+</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Input 
                            type="number" 
                            min="0" 
                            placeholder="Min" 
                            value={priceRange.min}
                            onChange={e => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Input 
                            type="number" 
                            min="0" 
                            placeholder="Max" 
                            value={priceRange.max}
                            onChange={e => setPriceRange({...priceRange, max: parseInt(e.target.value) || 0})}
                            className="h-8"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Locations */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Locations</h3>
                    <div className="space-y-2">
                      {uniqueLocations.map(location => (
                        <div key={location} className="flex items-center">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full justify-start p-2 h-auto text-gray-600 hover:text-tourism-purple"
                            onClick={() => setSearchTerm(location)}
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            {location}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Attractions Grid */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500">
                  {filteredAttractions.length} attractions found
                </p>
                <div className="flex items-center space-x-2">
                  {/* Add sorting options here if needed */}
                </div>
              </div>
              
              {filteredAttractions.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAttractions.map(attraction => (
                    <AttractionCard key={attraction.id} attraction={attraction} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No attractions found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Attractions;
