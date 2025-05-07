package com.T_Tour.Tourism.controllers;


import com.T_Tour.Tourism.Dto.TouristicAttractionDto;
import com.T_Tour.Tourism.Dto.updateTouristicAttractionDto;
import com.T_Tour.Tourism.ServiceImpl.TouristicAttractionServiceImpl;
import com.T_Tour.Tourism.models.TouristicAttraction;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Tourism/v1/attraction")
@RequiredArgsConstructor
public class TouristicAttractionController {

    private final TouristicAttractionServiceImpl attractionService;


   @PostMapping("/createAttraction")
    public ResponseEntity<TouristicAttractionDto> createAttraction(@RequestBody TouristicAttractionDto  Dto){
     TouristicAttractionDto createdAttraction= attractionService.createTouristicAttraction(Dto);

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-info", "Attraction Created Successfully");

    return new ResponseEntity<>(createdAttraction,headers, HttpStatus.CREATED);
    }


    @GetMapping("/{attraction_id}")
    public ResponseEntity<TouristicAttractionDto> getAttractionByID(@PathVariable Integer attraction_id) {
        try {
           TouristicAttractionDto retrievedAttraction = attractionService.getTouristicAttractionById(attraction_id);


            HttpHeaders headers = new HttpHeaders();
            headers.add("X-info", "Attraction Retrieved Successfully");

            return new ResponseEntity<>(retrievedAttraction, headers, HttpStatus.OK);
        } catch (RuntimeException e) {

            HttpHeaders headers = new HttpHeaders();
            headers.add("Error-Header", "Attraction Not Found");

            return new ResponseEntity<>(null, headers, HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/get-all-attraction")
    public ResponseEntity<List<TouristicAttractionDto>> getAllAttractions() {
        List<TouristicAttractionDto> attractions = attractionService.getAllTouristicAttractions();

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-info", "All attractions retrieved successfully");

        return new ResponseEntity<>(attractions, headers, HttpStatus.OK);
    }


    // to retrieve items based on a certain company
    @GetMapping("/company")
    public ResponseEntity<List<TouristicAttractionDto>> getAttractionsByCompany() {
        List<TouristicAttractionDto> attractions = attractionService.getCompanyAttractions();
        return ResponseEntity.ok(attractions);
    }





    @PutMapping("/update/{attraction_id}")
    public ResponseEntity<updateTouristicAttractionDto> updateAttraction(@PathVariable Integer attraction_id,  @RequestBody updateTouristicAttractionDto  Dto){
       try{
         updateTouristicAttractionDto updatedAttraction = attractionService.updateTouristicAttraction(attraction_id,Dto);

           HttpHeaders headers = new HttpHeaders();
           headers.add("X-info", "Attraction updated Successfully");
      return new ResponseEntity<>(updatedAttraction,headers,HttpStatus.OK);


       }
       catch (RuntimeException e) {

           HttpHeaders headers = new HttpHeaders();
           headers.add("Error-Header", "Attraction Not Found");

           return new ResponseEntity<>(null, headers, HttpStatus.NOT_FOUND);
       }

    }

    @DeleteMapping("/delete/{attraction_id}")
    public ResponseEntity<String> deleteAttraction(@PathVariable int attraction_id) {
        try {
           attractionService.deleteTouristicAttraction(attraction_id);


            HttpHeaders headers = new HttpHeaders();
            headers.add("X-info", "Attraction Deleted Successfully");

            return new ResponseEntity<>("Attraction deleted successfully", headers, HttpStatus.OK);
        } catch (RuntimeException e) {

            HttpHeaders headers = new HttpHeaders();
            headers.add("Error-Header", "Attraction Not Found");

            return new ResponseEntity<>("Attraction not found", headers, HttpStatus.NOT_FOUND);
        }
    }


}
