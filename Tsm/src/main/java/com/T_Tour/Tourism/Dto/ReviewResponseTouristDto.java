package com.T_Tour.Tourism.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class ReviewResponseTouristDto {




    private int rating;

    @NotNull(message = "User must be provided ")
    private String name;

    private Date date;

    @NotNull(message = "You must provide comment")
    private String comment;

    private String imageUrl;
    private String attractionName;
    private String attractionId;
}
