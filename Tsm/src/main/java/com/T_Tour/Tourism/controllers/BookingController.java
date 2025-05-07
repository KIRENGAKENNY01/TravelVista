package com.T_Tour.Tourism.controllers;



import com.T_Tour.Tourism.Dto.BookingDto;
import com.T_Tour.Tourism.Dto.BookingResponseDto;
import com.T_Tour.Tourism.Dto.ConfirmBookingDto;
import com.T_Tour.Tourism.Dto.getBookingResponseDto;
import com.T_Tour.Tourism.ServiceImpl.BookingServiceImpl;
import com.T_Tour.Tourism.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Tourism/v1/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingServiceImpl bookingService;

    @PostMapping("/createBooking/{Id}")
    public ResponseEntity<BookingResponseDto> bookAttraction(@RequestBody BookingDto dto,
                                                             Authentication authentication,
                                                             @PathVariable int Id) {
        String username = authentication.getName();
        BookingResponseDto response = bookingService.bookAttraction(dto,Id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/confirm/{bookingId}")
    public ResponseEntity<BookingResponseDto> confirmPayment(@PathVariable Integer bookingId
                                                             , Authentication authentication,
                                                             @RequestBody ConfirmBookingDto dto) {
        String username = authentication.getName();
        BookingResponseDto response = bookingService.confirmPayment(dto,bookingId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getAllBookingForTourist")
    public ResponseEntity<List<BookingResponseDto>> getTouristBookings() {
        return ResponseEntity.ok(bookingService.getAllBookingsForTourist());
    }

    @GetMapping("/getAllBookingForCompany")
    public ResponseEntity<List<getBookingResponseDto>> getCompanyBookings() {
        return ResponseEntity.ok(bookingService.getAllBookingsForCompanies());
    }



}
