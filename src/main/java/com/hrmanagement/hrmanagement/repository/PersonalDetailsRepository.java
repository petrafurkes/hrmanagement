package com.hrmanagement.hrmanagement.repository;

import com.hrmanagement.hrmanagement.model.UserPersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonalDetailsRepository extends JpaRepository<UserPersonalDetails, Long> {

    Optional<UserPersonalDetails> findById(Long id);


}



