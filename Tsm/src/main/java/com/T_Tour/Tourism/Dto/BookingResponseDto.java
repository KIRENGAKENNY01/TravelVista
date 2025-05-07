package com.T_Tour.Tourism.Dto;

import com.T_Tour.Tourism.models.PayMethod;
import com.T_Tour.Tourism.models.Status;
import lombok.Data;

@Data
public class BookingResponseDto {
    private String attractionName;
    private double  entryFee;
    private String imageUrl;
    private String bookingDate;
    private Status status;
    private boolean paymentConfirmed;
    private String location;
    private int attractionId;
    private PayMethod paymentMethod;
    private int id;
}
