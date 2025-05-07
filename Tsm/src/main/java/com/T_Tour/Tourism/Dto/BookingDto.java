package com.T_Tour.Tourism.Dto;

import com.T_Tour.Tourism.models.PayMethod;
import jakarta.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class BookingDto {

    @NotBlank(message = "email is required")
    private String bookingDate;

    private PayMethod paymentMethod;

    }


