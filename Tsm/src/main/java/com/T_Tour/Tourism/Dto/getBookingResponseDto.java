package com.T_Tour.Tourism.Dto;

import com.T_Tour.Tourism.models.PayMethod;
import com.T_Tour.Tourism.models.Status;
import lombok.Data;

@Data
public class getBookingResponseDto {
    private String attractionName;
    private String bookingDate;
    private String username;
    private double entryFee;
    private String phone;
    private String imageUrl;
    private Status status;
    private boolean paymentConfirmed;
    private PayMethod paymentMethod;
    private String email;
    private int id;
}
