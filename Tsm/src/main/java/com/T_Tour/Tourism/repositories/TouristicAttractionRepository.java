package com.T_Tour.Tourism.repositories;

import com.T_Tour.Tourism.models.TouristicAttraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TouristicAttractionRepository extends JpaRepository<TouristicAttraction, Integer> {

    List<TouristicAttraction> findByUserId(Integer userId);

}
