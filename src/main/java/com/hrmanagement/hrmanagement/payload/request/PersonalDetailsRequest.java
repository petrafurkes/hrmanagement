package com.hrmanagement.hrmanagement.payload.request;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;


public class PersonalDetailsRequest {

    @NotBlank
    private String fullName;

    @NotBlank
    private String mobileNumber;

    @NotBlank
    private LocalDate birthDate;

    @NotBlank
    private String gender;

    @NotBlank
    private String address;

    @NotBlank
    private String postcode;

    @NotBlank
    private String city;

    @NotBlank
    private String country;

    private String aboutMe;

    private String hrUserPosition;

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

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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
}
