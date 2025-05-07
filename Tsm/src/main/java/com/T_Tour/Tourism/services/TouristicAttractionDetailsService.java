package com.T_Tour.Tourism.services;


import com.T_Tour.Tourism.Dto.TouristicAttractionDto;
import com.T_Tour.Tourism.Dto.updateTouristicAttractionDto;
import com.T_Tour.Tourism.models.TouristicAttraction;

import java.util.List;


public interface TouristicAttractionDetailsService {
    TouristicAttractionDto createTouristicAttraction(TouristicAttractionDto touristicAttractionDto);
    TouristicAttractionDto getTouristicAttractionById(int id);
    List<TouristicAttractionDto> getAllTouristicAttractions();
    updateTouristicAttractionDto updateTouristicAttraction(int id, updateTouristicAttractionDto touristicAttractionDto);
    void deleteTouristicAttraction(int id);
   List<TouristicAttractionDto> getCompanyAttractions();

}
