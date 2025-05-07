package com.T_Tour.Tourism.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.T_Tour.Tourism.models.User;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String Email);
}
