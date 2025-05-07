package com.T_Tour.Tourism.repositories;

import com.T_Tour.Tourism.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByAttractionAttractionId(int attractionId);
    List<Review> findByAttraction_User_Id(Integer companyId);
    List<Review> findByUser_Id(Integer userId);

}
