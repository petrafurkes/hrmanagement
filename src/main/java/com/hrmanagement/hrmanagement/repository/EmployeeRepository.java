package com.hrmanagement.hrmanagement.repository;

import com.hrmanagement.hrmanagement.model.Education;
import com.hrmanagement.hrmanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {


}
