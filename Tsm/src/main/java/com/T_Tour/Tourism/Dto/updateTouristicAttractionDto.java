package com.T_Tour.Tourism.Dto;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class updateTouristicAttractionDto {

    @NotBlank(message = "attraction name is required")
    private String AttractionName;


    @NotBlank(message = "attraction description is required")
    private String AttractionDescription;


    private String location;


    @Column(name = "entry_fee",length = 255,nullable = false)
    private Double entryFee;

    @NotBlank(message = "image url  is required")
    private String imageUrl;

    @NotBlank(message = "open hours is required")
    private String openHours;

}
