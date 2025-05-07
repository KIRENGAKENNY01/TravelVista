package com.T_Tour.Tourism.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TouristicAttractionDto {

    private int Id;

    @NotBlank(message = "Attraction name is required")
    private String AttractionName;

    @NotBlank(message = "Attraction description is required")
    private String AttractionDescription;

    private String location;

    private String username;

    private Double entryFee;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    @NotBlank(message = "open hours is required")
    private String openHours;

    private String phoneNumber;

}
