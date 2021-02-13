package com.hrmanagement.hrmanagement.service;

import com.hrmanagement.hrmanagement.model.Employee;
import com.hrmanagement.hrmanagement.payload.request.EmployeeRequest;
import com.hrmanagement.hrmanagement.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);


    public void registerNewEmployee(Employee employee, EmployeeRequest employeeRequest) {

        employee.setFullName(employeeRequest.getFullName());
        employee.setMobileNumber(employeeRequest.getMobileNumber());
        employee.setPersonalEmail(employeeRequest.getPersonalEmail());
        employee.setBirthDate(employeeRequest.getBirthDate());
        employee.setGender(employeeRequest.getGender());
        employee.setHomeAddress(employeeRequest.getHomeAddress());

        employeeRepository.save(employee);

    }
}
