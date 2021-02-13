package com.hrmanagement.hrmanagement.repository;

import com.hrmanagement.hrmanagement.model.Job;
import com.hrmanagement.hrmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findById(Long jobId);

    List<Job> findAll();

    @Query("SELECT v FROM Job v WHERE v.jobStatus = :active" )
    List<Job> findAllActiveJobs(@Param("active") String jobStatus);

    @Query("SELECT v FROM Job v WHERE v.jobStatus = :expired" )
    List<Job> findAllExpiredJobs(@Param("expired") String jobStatus);
}
