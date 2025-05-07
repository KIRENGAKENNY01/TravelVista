import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Attraction } from '../pages/lib/data-context';

interface AttractionCardProps {
    attraction: Attraction;
    showBookButton?: boolean;
}



const AttractionCard = ({ attraction, showBookButton = true }: AttractionCardProps) => {

   const navigate = useNavigate(); 


    const handleBookNow = () => {
        const token = localStorage.getItem("token");
    
      
        if (token) {
          navigate(`/attractions/${attraction.id}`);
        } else {
          navigate(`/authenticate`, {
            state: { from: `/attractions/${attraction.id}` }
          });
        }
      };

      

    return (
        <Card className="attraction-card overflow-hidden h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={attraction.imageUrl}
                    alt={attraction.attractionName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              {typeof attraction.entryFee === "number" ? (
  <div className="absolute top-2 right-2 bg-tourism-orange text-white px-2 py-1 rounded text-sm font-medium">
    ${attraction.entryFee.toFixed(2)}
  </div>
) : null}

            </div>

            <CardHeader className="pb-2">
                <h3 className="font-bold text-lg line-clamp-1">{attraction.attractionName}</h3>
                <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{attraction.location}</span>
                </div>
            </CardHeader>

            <CardContent className="pb-2 flex-grow">
                <p className="text-gray-600 text-sm line-clamp-3">{attraction.attractionDescription}</p>
            </CardContent>

            <CardFooter className="border-t pt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="h-4 w-4 fill-tourism-orange text-tourism-orange" />
                    <span>4.8 (24)</span>
                </div>

                {showBookButton && (
                    <Button
                    
                        size="sm"
                        className="bg-tourism-purple hover:bg-tourism-dark-purple text-white"
                        onClick={handleBookNow}
                    >
                         <Calendar className="h-4 w-4 mr-1" /> Book Now
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default AttractionCard;