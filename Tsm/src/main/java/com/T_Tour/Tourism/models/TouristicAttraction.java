package com.T_Tour.Tourism.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "touristic_attraction")
public class TouristicAttraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attraction_id")
    private Integer attractionId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @NotBlank(message = "attraction name is required")
    @Column(name = "attraction_name",length = 255,nullable = false)
    private String attractionName;


    @NotBlank(message = "attraction description is required")
    @Column(name = "attraction_description",length = 255,nullable = false)
    private String attractionDescription;



    private String location;


    @Column(name = "entry_fee",length = 255,nullable = false)
    private Double entryFee;

    @NotBlank(message = "image url  is required")
    @Column(name = "image_url",length = 255,nullable = false)
    private String imageUrl;

    @NotBlank(message = "open hours is required")
    @Column(name = "open_hours",length = 255,nullable = false)
    private String openHours;



}
