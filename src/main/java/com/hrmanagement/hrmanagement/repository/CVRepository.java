package com.hrmanagement.hrmanagement.repository;

import com.hrmanagement.hrmanagement.model.CV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CVRepository extends JpaRepository<CV, String> {

    Optional<CV> findById(String cvId);

    List<CV> findAll();


}
