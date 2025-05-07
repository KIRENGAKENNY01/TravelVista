package com.T_Tour.Tourism.Dto;

import com.T_Tour.Tourism.models.Status;
import lombok.Data;

@Data
public class ConfirmBookingDto {
    private Status status;
    private boolean paymentConfirmed;
}
