package com.hrmanagement.hrmanagement.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity(name = "EmploymentDetails")
@Table(name = "employment_details")
public class EmploymentDetails {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @Column(length = 50)
    @Email
    private String officeEmail;

    @Column(length = 50)
    private String officePhoneNumber;

    @Column(length = 50)
    private String officeMobileNumber;

    @Column(length = 200)
    private String position;

    @Column(length = 200)
    private String department;

    @Column
    private BigDecimal salary;
    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column(length = 200)
    private String officeLocation;

    @ManyToOne
    @JoinColumn(name = "employee_id",
                nullable = false,
                referencedColumnName = "id",
                foreignKey = @ForeignKey(name = "employee_employment_details_fk"))
    private Employee employee;

    public EmploymentDetails(Long id,
                             String officeEmail,
                             String officePhoneNumber,
                             String officeMobileNumber,
                             String position,
                             String department,
                             BigDecimal salary,
                             LocalDate startDate,
                             LocalDate endDate,
                             String officeLocation) {
        this.id = id;
        this.officeEmail = officeEmail;
        this.officePhoneNumber = officePhoneNumber;
        this.officeMobileNumber = officeMobileNumber;
        this.position = position;
        this.department = department;
        this.salary = salary;
        this.startDate = startDate;
        this.endDate = endDate;
        this.officeLocation = officeLocation;
    }

    public EmploymentDetails() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOfficeEmail() {
        return officeEmail;
    }

    public void setOfficeEmail(String officeEmail) {
        this.officeEmail = officeEmail;
    }

    public String getOfficePhoneNumber() {
        return officePhoneNumber;
    }

    public void setOfficePhoneNumber(String officePhoneNumber) {
        this.officePhoneNumber = officePhoneNumber;
    }

    public String getOfficeMobileNumber() {
        return officeMobileNumber;
    }

    public void setOfficeMobileNumber(String officeMobileNumber) {
        this.officeMobileNumber = officeMobileNumber;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getOfficeLocation() {
        return officeLocation;
    }

    public void setOfficeLocation(String officeLocation) {
        this.officeLocation = officeLocation;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
