package com.hrmanagement.hrmanagement.repository;

import com.hrmanagement.hrmanagement.model.Education;
import com.hrmanagement.hrmanagement.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    Optional<Experience> findById(Long experienceId);

    List<Experience> findAll();

}
