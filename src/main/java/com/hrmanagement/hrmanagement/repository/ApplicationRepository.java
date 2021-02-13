package com.hrmanagement.hrmanagement.repository;

import com.hrmanagement.hrmanagement.model.Application;
import com.hrmanagement.hrmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Optional<Application> findById(Long applicationId);

    List<Application> findAll();

    @Query("SELECT a.user.id FROM Application a WHERE a.applicationId = :applicationId" )
    Optional<Long> findUserId(@Param("applicationId") Long applicationId);


}
