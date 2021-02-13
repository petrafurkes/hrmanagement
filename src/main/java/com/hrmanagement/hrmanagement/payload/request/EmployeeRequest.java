package com.hrmanagement.hrmanagement.payload.request;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import java.time.LocalDate;

public class EmployeeRequest {

    private String fullName;

    private String mobileNumber;

    private String personalEmail;

    private LocalDate birthDate;

    private String gender;

    private String homeAddress;

    public EmployeeRequest(String fullName,
                           String mobileNumber,
                           String personalEmail,
                           LocalDate birthDate,
                           String gender,
                           String homeAddress) {
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        this.personalEmail = personalEmail;
        this.birthDate = birthDate;
        this.gender = gender;
        this.homeAddress = homeAddress;
    }

    public EmployeeRequest() {
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
}
