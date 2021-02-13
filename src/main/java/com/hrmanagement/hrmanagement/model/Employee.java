package com.hrmanagement.hrmanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "Employee")
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String fullName;

    @Column(length = 50)
    private String mobileNumber;

    @Column(length = 50)
    @Email
    private String personalEmail;

    @Column(length = 25)
    private LocalDate birthDate;

    @Column(length = 20)
    private String gender;

    @Column(length = 500)
    private String homeAddress;

    @OneToMany(mappedBy = "employee",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<EmploymentDetails> employmentDetails = new ArrayList<>();

    public Employee(Long id,
                    String fullName,
                    String mobileNumber,
                    String personalEmail,
                    LocalDate birthDate,
                    String gender,
                    String homeAddress) {
        this.id = id;
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        this.personalEmail = personalEmail;
        this.birthDate = birthDate;
        this.gender = gender;
        this.homeAddress = homeAddress;
    }

    public Employee() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getPersonalEmail() {
        return personalEmail;
    }

    public void setPersonalEmail(String personalEmail) {
        this.personalEmail = personalEmail;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }

    public List<EmploymentDetails> getEmploymentDetails() {
        return employmentDetails;
    }

    public void setEmploymentDetails(List<EmploymentDetails> employmentDetails) {
        this.employmentDetails = employmentDetails;
    }
}
