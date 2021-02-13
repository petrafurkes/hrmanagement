package com.hrmanagement.hrmanagement.repository;

import com.hrmanagement.hrmanagement.model.Application;
import com.hrmanagement.hrmanagement.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EducationRepository extends JpaRepository<Education, Long> {

    Optional<Education> findById(Long educationId);

    List<Education> findAll();

}
