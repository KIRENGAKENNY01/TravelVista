package com.T_Tour.Tourism.services;


import com.T_Tour.Tourism.Dto.ReviewDto;
import com.T_Tour.Tourism.Dto.ReviewResponseDto;
import com.T_Tour.Tourism.Dto.ReviewResponseTouristDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReviewService {
    ReviewResponseDto addReview(ReviewDto reviewDto,int attractionId);
    ReviewResponseDto getReviewById(int id);
    List<ReviewResponseDto> getAllReviewsOnAttraction(int attractionId);
    List<ReviewResponseDto> getAllReviewsForCompanyAttractions();
    List<ReviewResponseTouristDto> getAllReviewsForTourist();


}
