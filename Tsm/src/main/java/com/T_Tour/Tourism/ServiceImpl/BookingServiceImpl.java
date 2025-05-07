package com.T_Tour.Tourism.ServiceImpl;

import com.T_Tour.Tourism.Dto.BookingDto;
import com.T_Tour.Tourism.Dto.BookingResponseDto;
import com.T_Tour.Tourism.Dto.ConfirmBookingDto;
import com.T_Tour.Tourism.Dto.getBookingResponseDto;
import com.T_Tour.Tourism.models.*;
import com.T_Tour.Tourism.repositories.*;
import com.T_Tour.Tourism.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final UserRepository userRepository;
    private final TouristicAttractionRepository attractionRepository;
    private final BookingRepository bookingRepository;
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
    public BookingResponseDto bookAttraction(BookingDto dto, int attractionId  ) {
        User user = getCurrentUser();

        if (!user.getRole().equals(Role.TOURIST)) {
            throw new SecurityException("Only tourists can book attractions.");
        }

        TouristicAttraction attraction = attractionRepository.findById(attractionId)
                .orElseThrow(() -> new RuntimeException("Attraction not found"));

        Booking booking = Booking.builder()
                .user(user)
                .touristicAttraction(attraction)
                .bookingDate(dto.getBookingDate())
                .paymentMethod(dto.getPaymentMethod())
                .status(Status.Pending)
                .paymentConfirmed(false)
                .build();

        Booking savedBooking = bookingRepository.save(booking);
      BookingResponseDto response = new BookingResponseDto();
      response.setAttractionName(attraction.getAttractionName());
      response.setEntryFee(attraction.getEntryFee());
      response.setImageUrl(attraction.getImageUrl());
      response.setBookingDate(savedBooking.getBookingDate());
      response.setStatus(savedBooking.getStatus());
      response.setPaymentConfirmed(savedBooking.isPaymentConfirmed());
      response.setPaymentMethod(savedBooking.getPaymentMethod());
      response.setLocation(attraction.getLocation());
      response.setId(savedBooking.getBookingId());
      return response;
    }



    @Override
    public BookingResponseDto confirmPayment(ConfirmBookingDto Dto, Integer bookingId) {
        User user = getCurrentUser();

        if (!user.getRole().equals(Role.COMPANY)) {
            throw new SecurityException("Only company users can confirm payments.");
        }



        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        TouristicAttraction attraction = booking.getTouristicAttraction();

        // Optional: check if the booking belongs to a touristic attraction owned by this company
        if (!booking.getTouristicAttraction().getUser().getId().equals(user.getId())) {
            throw new SecurityException("You can only confirm payments for your own attractions.");
        }

        booking.setPaymentConfirmed(Dto.isPaymentConfirmed());
        booking.setStatus(Dto.getStatus());

        Booking saved = bookingRepository.save(booking);
        BookingResponseDto response = new BookingResponseDto();
        response.setAttractionName(attraction.getAttractionName());
        response.setEntryFee(attraction.getEntryFee());
        response.setImageUrl(attraction.getImageUrl());
        response.setBookingDate(booking.getBookingDate());
        response.setStatus(saved.getStatus());
        response.setPaymentConfirmed(saved.isPaymentConfirmed());
        response.setPaymentMethod(booking.getPaymentMethod());
        response.setLocation(attraction.getLocation());
        response.setId(booking.getBookingId());
        return response;
    }

    @Override
    public List<BookingResponseDto> getAllBookingsForTourist() {
        User user = getCurrentUser();
        List<Booking> bookings;

        if (!user.getRole().equals(Role.TOURIST)) {
            throw new SecurityException("Unauthorized role to view bookings.");
        }


        bookings = bookingRepository.findByUser(user);

        return bookings.stream()
                .map(booking -> {
                    TouristicAttraction attraction = booking.getTouristicAttraction();


                    BookingResponseDto res = new BookingResponseDto();
                    res.setAttractionName(attraction.getAttractionName());
                    res.setEntryFee(attraction.getEntryFee());
                    res.setImageUrl(attraction.getImageUrl());
                    res.setBookingDate(booking.getBookingDate());
                    res.setStatus(booking.getStatus());
                    res.setPaymentConfirmed(booking.isPaymentConfirmed());
                    res.setPaymentMethod(booking.getPaymentMethod());
                    res.setLocation(attraction.getLocation());
                    res.setAttractionId(attraction.getAttractionId());
                    res.setId(booking.getBookingId());


                    return res;
                })
                .collect(Collectors.toList());
        }

 @Override
    public List<getBookingResponseDto> getAllBookingsForCompanies() {
        User user = getCurrentUser();
        List<Booking> bookings;



         if (!user.getRole().equals(Role.COMPANY)) {
            throw new SecurityException("Unauthorized role to view bookings.");
        }


        bookings = bookingRepository.findByTouristicAttractionUser(user);
        return bookings.stream()
                .map(booking -> {
                    TouristicAttraction attraction = booking.getTouristicAttraction();
                    User tourist = booking.getUser();

                    getBookingResponseDto res = new getBookingResponseDto();
                    res.setAttractionName(attraction.getAttractionName());
                    res.setEntryFee(attraction.getEntryFee());
                    res.setUsername(tourist.getName());
                    res.setPhone(tourist.getPhone());
                    res.setImageUrl(attraction.getImageUrl());
                    res.setBookingDate(booking.getBookingDate());
                    res.setStatus(booking.getStatus());
                    res.setPaymentConfirmed(booking.isPaymentConfirmed());
                    res.setPaymentMethod(booking.getPaymentMethod());
                    res.setEmail(tourist.getEmail());
                    res.setId(booking.getBookingId());

                    return res;
                })
                .collect(Collectors.toList());
    }






}
