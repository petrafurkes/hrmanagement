package com.hrmanagement.hrmanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import java.time.LocalDate;

@Entity
@Table(	name = "user_personal_details")

public class UserPersonalDetails {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @Column(length = 50)
    private String fullName;

    @NotBlank
    @Column(length = 50)
    private String mobileNumber;

    @NotBlank
    @Column(length = 25)
    private LocalDate birthDate;

    @NotBlank
    @Column(length = 20)
    private String gender;

    @NotBlank
    @Column(length = 50)
    private String address;

    @NotBlank
    @Column(length = 10)
    private String postcode;

    @NotBlank
    @Column(length = 50)
    private String city;

    @NotBlank
    @Column(length = 50)
    private String country;

    @Column(length = 1000)
    private String aboutMe;

    @Column(length = 50)
    private String hrUserPosition;

    @OneToOne (fetch = FetchType.EAGER, optional = false)
    @JsonIgnore
    private User user;


    public UserPersonalDetails() {
        this.id = id;
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        this.birthDate = birthDate;
        this.gender = gender;
        this.address = address;
        this.postcode = postcode;
        this.city = city;
        this.country = country;
        this.aboutMe = aboutMe;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
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

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public String getHrUserPosition() {
        return hrUserPosition;
    }

    public void setHrUserPosition(String hrUserPosition) {
        this.hrUserPosition = hrUserPosition;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}