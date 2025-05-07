import { useState } from 'react';
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../pages/lib/utils';

interface StarRatingProps {
    initialRating?: number;
    totalStars?: number;
    onChange?: (rating: number) => void;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const StarRating = ({
                        initialRating = 0,
                        totalStars = 5,
                        onChange,
                        readOnly = false,
                        size = 'md',
                    }: StarRatingProps) => {
    const [rating, setRating] = useState<number>(initialRating);
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    const handleClick = (selectedRating: number) => {
        if (readOnly) return;
        setRating(selectedRating);
        if (onChange) onChange(selectedRating);
    };

    const sizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };

    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = readOnly
                    ? starValue <= rating
                    : starValue <= (hoveredRating || rating);

                return (
                    <Star
                        key={index}
                        className={cn(
                            sizeClasses[size],
                            "cursor-pointer mr-1",
                            isFilled ? "fill-tourism-orange text-tourism-orange" : "fill-none text-gray-300"
                        )}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => !readOnly && setHoveredRating(starValue)}
                        onMouseLeave={() => !readOnly && setHoveredRating(0)}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
