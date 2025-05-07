package com.T_Tour.Tourism.repositories;

import com.T_Tour.Tourism.models.Booking;
import com.T_Tour.Tourism.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer> {

    List<Booking> findByUser(User user);

    List<Booking> findByTouristicAttractionUser(User user);

}