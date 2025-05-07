package com.T_Tour.Tourism.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewDto {



    private int rating;


    @NotNull(message = "You must provide comment")
    private String comment;


}
