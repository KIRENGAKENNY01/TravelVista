package com.T_Tour.Tourism.ServiceImpl;

import com.T_Tour.Tourism.Dto.TouristicAttractionDto;
import com.T_Tour.Tourism.Dto.updateTouristicAttractionDto;
import com.T_Tour.Tourism.models.Role;
import com.T_Tour.Tourism.models.TouristicAttraction;
import com.T_Tour.Tourism.models.User;
import com.T_Tour.Tourism.repositories.TouristicAttractionRepository;
import com.T_Tour.Tourism.repositories.UserRepository;
import com.T_Tour.Tourism.services.TouristicAttractionDetailsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TouristicAttractionServiceImpl implements TouristicAttractionDetailsService {

   @Autowired
    private UserRepository userRepository;

  private final TouristicAttractionRepository touristicAttractionRepository;
    private final ModelMapper modelMapper;


    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated.");
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomUserDetails) {
            return ((CustomUserDetails) principal).getUser();
        }

        throw new IllegalStateException("Unexpected principal type: " + principal.getClass().getName());
    }

    @Override
    public TouristicAttractionDto createTouristicAttraction(TouristicAttractionDto Dto) {

        // check if the user creating the touristic attraction has role company
     User user = getCurrentUser();

        if (!user.getRole().equals(Role.COMPANY)) {
            throw new SecurityException("Only Company role are allowed to creat TouristicAttraction");
        }


    TouristicAttraction touristicAttraction = new TouristicAttraction();
    touristicAttraction.setAttractionName(Dto.getAttractionName());
    touristicAttraction.setAttractionDescription(Dto.getAttractionDescription());
    touristicAttraction.setLocation(Dto.getLocation());
    touristicAttraction.setEntryFee(Dto.getEntryFee());
    touristicAttraction.setImageUrl(Dto.getImageUrl());
    touristicAttraction.setOpenHours(Dto.getOpenHours());
    touristicAttraction.setUser(user);

   TouristicAttraction savedTouristicAttraction = touristicAttractionRepository.save(touristicAttraction);
   return modelMapper.map(touristicAttraction, TouristicAttractionDto.class);

    }


    // used when the user click on a touristic attraction so we need to fetch it using this method
    @Override
    public TouristicAttractionDto getTouristicAttractionById(int id) {

        Optional<TouristicAttraction> touristicAttraction = touristicAttractionRepository.findById(id);
        if(touristicAttraction.isPresent()) {
            TouristicAttractionDto touristicAttractionDto = new TouristicAttractionDto();
            touristicAttractionDto.setAttractionName(touristicAttraction.get().getAttractionName());
            touristicAttractionDto.setId(touristicAttraction.get().getAttractionId());
            touristicAttractionDto.setAttractionDescription(touristicAttraction.get().getAttractionDescription());
            touristicAttractionDto.setLocation(touristicAttraction.get().getLocation());
            touristicAttractionDto.setImageUrl(touristicAttraction.get().getImageUrl());
            touristicAttractionDto.setOpenHours(touristicAttraction.get().getOpenHours());
            touristicAttractionDto.setUsername(touristicAttraction.get().getUser().getName());
            touristicAttractionDto.setEntryFee(touristicAttraction.get().getEntryFee());
            touristicAttractionDto.setPhoneNumber(touristicAttraction.get().getUser().getPhone());
            return touristicAttractionDto;
        }
        else{
            throw new RuntimeException("User not found with ID: " + id);
        }
    }


    //used during   on the attractions page on the frontend to show all available attractions
    @Override
    public List<TouristicAttractionDto> getAllTouristicAttractions() {
        return touristicAttractionRepository.findAll()
                .stream()
                .map(attraction -> {
                    TouristicAttractionDto dto = new TouristicAttractionDto();
                    dto.setId(attraction.getAttractionId());
                    dto.setAttractionName(attraction.getAttractionName());
                    dto.setAttractionDescription(attraction.getAttractionDescription());
                    dto.setLocation(attraction.getLocation());
                    dto.setImageUrl(attraction.getImageUrl());
                    dto.setOpenHours(attraction.getOpenHours());
                    dto.setUsername(attraction.getUser().getName());
                    dto.setEntryFee(attraction.getEntryFee());
                    return dto;
                })
                .collect(Collectors.toList());
    }


    //get attractions for the  certain company
    public List<TouristicAttractionDto> getCompanyAttractions() {
        User user = getCurrentUser();

        if (!user.getRole().equals(Role.COMPANY)) {
            throw new SecurityException("Only Company role are allowed to creat TouristicAttraction");
        }



        List<TouristicAttraction> attractions = touristicAttractionRepository.findByUserId(user.getId());

        return attractions.stream()
                .map(attraction -> {
                    TouristicAttractionDto dto = modelMapper.map(attraction, TouristicAttractionDto.class);
                    dto.setUsername(attraction.getUser().getName());
                    dto.setAttractionName(attraction.getAttractionName());
                    dto.setImageUrl(attraction.getImageUrl());
                    return dto;
                })
                .collect(Collectors.toList());
    }



    @Override
    public updateTouristicAttractionDto updateTouristicAttraction(int id, updateTouristicAttractionDto Dto) {


        User user = getCurrentUser();
        if (!user.getRole().equals(Role.COMPANY)) {
            throw new SecurityException("Only Company role are allowed to update TouristicAttraction");
        }


        TouristicAttraction attraction = touristicAttractionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Attraction not found with ID: " + id));
       ;


       attraction.setAttractionName(Dto.getAttractionName());
       attraction.setAttractionDescription(Dto.getAttractionDescription());
       attraction.setLocation(Dto.getLocation());
       attraction.setEntryFee(Dto.getEntryFee());
       attraction.setImageUrl(Dto.getImageUrl());
       attraction.setOpenHours(Dto.getOpenHours());

       TouristicAttraction  updatedAttraction = touristicAttractionRepository.save(attraction);

        return modelMapper.map(updatedAttraction, updateTouristicAttractionDto.class);

   }
    @Override
    public void deleteTouristicAttraction(int id) {
        User user = getCurrentUser();

        TouristicAttraction attraction = touristicAttractionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Attraction not found with ID: " + id));

        // Ensure only the owning company can delete the attraction
        if (!user.getRole().equals(Role.COMPANY) || !attraction.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Only the owning COMPANY can delete this attraction.");
        }

        touristicAttractionRepository.delete(attraction);
    }


}

