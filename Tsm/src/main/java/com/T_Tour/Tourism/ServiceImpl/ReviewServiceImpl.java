package com.T_Tour.Tourism.ServiceImpl;

import com.T_Tour.Tourism.Dto.ReviewDto;
import com.T_Tour.Tourism.Dto.ReviewResponseDto;
import com.T_Tour.Tourism.Dto.ReviewResponseTouristDto;
import com.T_Tour.Tourism.models.Review;
import com.T_Tour.Tourism.models.Role;
import com.T_Tour.Tourism.models.TouristicAttraction;
import com.T_Tour.Tourism.models.User;
import com.T_Tour.Tourism.repositories.ReviewRepository;
import com.T_Tour.Tourism.repositories.TouristicAttractionRepository;
import com.T_Tour.Tourism.repositories.UserRepository;
import com.T_Tour.Tourism.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final TouristicAttractionRepository attractionRepository;
    private final ModelMapper modelMapper;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated.");
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomUserDetails) {
            return ((CustomUserDetails) principal).getUser();
        }

        throw new IllegalStateException("Unexpected principal type: " + principal.getClass().getName());
    }


    @Override
    public ReviewResponseDto addReview(ReviewDto reviewDto,int attractionId) {
        User user = getCurrentUser();

        if (!user.getRole().equals(Role.TOURIST)) {
            throw new SecurityException("Only Tourist role is allowed to create reviews");
        }

        TouristicAttraction attraction = attractionRepository.findById(attractionId)
                .orElseThrow(() -> new RuntimeException("Attraction not found with ID: " +  attractionId));

        Review review = new Review();
        review.setUser(user);
        review.setAttraction(attraction);
        review.setName(user.getName());
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());

        Review savedReview = reviewRepository.save(review);
        return modelMapper.map(savedReview, ReviewResponseDto.class);
    }

    @Override
    public ReviewResponseDto getReviewById(int id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isPresent()) {
            ReviewResponseDto response = modelMapper.map(review.get(), ReviewResponseDto.class);
            response.setName(review.get().getUser().getName()); // Ensure username is set
            return response;
        } else {
            throw new RuntimeException("Review not found with ID: " + id);
        }
    }


    // when we click on the touristic attraction and they will fetch its  reviews
    @Override
    public List<ReviewResponseDto> getAllReviewsOnAttraction(int attractionId) {
        TouristicAttraction attraction = attractionRepository.findById(attractionId)
                .orElseThrow(() -> new RuntimeException("Attraction not found with ID: " + attractionId));

        List<Review> reviews = reviewRepository.findByAttractionAttractionId(attractionId);

        return reviews.stream()
                .map(review -> {
                    ReviewResponseDto dto = modelMapper.map(review, ReviewResponseDto.class);
                    dto.setName(review.getUser().getName()); // If you're not saving the name in the Review entity
                    dto.setImageUrl(review.getAttraction().getImageUrl());
                    return dto;
                })
                .toList();
    }



    @Override
    public List<ReviewResponseDto> getAllReviewsForCompanyAttractions() {
        User user = getCurrentUser();

        if (!user.getRole().equals(Role.COMPANY)) {
            throw new SecurityException("Only company users can own attractions.");
        }

        List<Review> reviews = reviewRepository.findByAttraction_User_Id(user.getId());

        return reviews.stream()
                .map(review -> {
                    ReviewResponseDto dto = modelMapper.map(review, ReviewResponseDto.class);
                    dto.setName(review.getUser().getName()); // Author of the review
                   dto.setAttractionName(review.getAttraction().getAttractionName());
                   dto.setImageUrl(review.getAttraction().getImageUrl());
                    return dto;
                })
                .toList();
    }



    @Override
    public List<ReviewResponseTouristDto>getAllReviewsForTourist() {
        User user = getCurrentUser();

        if (!user.getRole().equals(Role.TOURIST)) {
            throw new SecurityException("Only company users can own attractions.");
        }

        List<Review> reviews = reviewRepository.findByUser_Id(user.getId());

        return reviews.stream()
                .map(review -> {
                    ReviewResponseTouristDto dto = modelMapper.map(review, ReviewResponseTouristDto.class);
                    dto.setName(review.getUser().getName()); // Author of the review
                    dto.setImageUrl(review.getAttraction().getImageUrl());
                    return dto;
                })
                .toList();
    }






}
