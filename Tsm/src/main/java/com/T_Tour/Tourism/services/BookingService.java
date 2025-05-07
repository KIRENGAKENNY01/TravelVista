package com.T_Tour.Tourism.services;



import com.T_Tour.Tourism.Dto.BookingDto;
import com.T_Tour.Tourism.Dto.BookingResponseDto;
import com.T_Tour.Tourism.Dto.ConfirmBookingDto;
import com.T_Tour.Tourism.Dto.getBookingResponseDto;


import java.util.List;

public interface BookingService {
    BookingResponseDto bookAttraction(BookingDto dto, int attractionId);
    BookingResponseDto confirmPayment(ConfirmBookingDto dto, Integer bookingId);
    List<BookingResponseDto> getAllBookingsForTourist();
    List<getBookingResponseDto> getAllBookingsForCompanies();
}
