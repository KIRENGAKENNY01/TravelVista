package com.T_Tour.Tourism.controllers;

import com.T_Tour.Tourism.Dto.ReviewDto;
import com.T_Tour.Tourism.Dto.ReviewResponseDto;
import com.T_Tour.Tourism.Dto.ReviewResponseTouristDto;
import com.T_Tour.Tourism.services.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Tourism/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/createReview/{attraction_id}")
    public ResponseEntity<ReviewResponseDto> addReview(
            @PathVariable int attraction_id,
            @Valid @RequestBody ReviewDto reviewDto) {
        ReviewResponseDto response = reviewService.addReview(reviewDto,attraction_id);

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-info", "review added");

        return new ResponseEntity<>(response, headers, HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponseDto> getReviewById(@PathVariable int id) {
        ReviewResponseDto response = reviewService.getReviewById(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-info", "got review");

        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    @GetMapping("/all-on-Attraction/{id}")
    public ResponseEntity<List<ReviewResponseDto>>  getAllReviewsAttraction(@PathVariable int id ) {
        List<ReviewResponseDto> reviews = reviewService.getAllReviewsOnAttraction(id);

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-info", "All reviews retrieved on an attraction successfully");

        return new ResponseEntity<>(reviews, headers, HttpStatus.OK);
    }

    @GetMapping("/all-on-company")
    public ResponseEntity<List<ReviewResponseDto>>  getAllReviewsForCompany() {
        List<ReviewResponseDto> reviews = reviewService.getAllReviewsForCompanyAttractions();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-info", "All reviews retrieved on a company successfully");
       return new ResponseEntity<>(reviews, headers, HttpStatus.OK);
    }

    @GetMapping("/all-on-tourist")
    public ResponseEntity<List<ReviewResponseTouristDto>>  getAllReviewsForTourist() {
        List<ReviewResponseTouristDto> reviews = reviewService.getAllReviewsForTourist();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-info", "All reviews retrieved on a company successfully");
        return new ResponseEntity<>(reviews, headers, HttpStatus.OK);
    }
}
