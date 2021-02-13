package com.hrmanagement.hrmanagement.payload.request;

import java.time.LocalDate;

public class EducationRequest {

    private String educationDegree;

    private String educationType;

    private String educationInstitution;

    private String educationCity;

    private String educationCountry;

    private LocalDate educationStartDate;

    private LocalDate educationEndDate;


    public String getEducationDegree() {
        return educationDegree;
    }

    public void setEducationDegree(String educationDegree) {
        this.educationDegree = educationDegree;
    }

    public String getEducationType() {
        return educationType;
    }

    public void setEducationType(String educationType) {
        this.educationType = educationType;
    }

    public String getEducationInstitution() {
        return educationInstitution;
    }

    public void setEducationInstitution(String educationInstitution) {
        this.educationInstitution = educationInstitution;
    }

    public String getEducationCity() {
        return educationCity;
    }

    public void setEducationCity(String educationCity) {
        this.educationCity = educationCity;
    }

    public String getEducationCountry() {
        return educationCountry;
    }

    public void setEducationCountry(String educationCountry) {
        this.educationCountry = educationCountry;
    }

    public LocalDate getEducationStartDate() {
        return educationStartDate;
    }

    public void setEducationStartDate(LocalDate educationStartDate) {
        this.educationStartDate = educationStartDate;
    }

    public LocalDate getEducationEndDate() {
        return educationEndDate;
    }

    public void setEducationEndDate(LocalDate educationEndDate) {
        this.educationEndDate = educationEndDate;
    }
}
