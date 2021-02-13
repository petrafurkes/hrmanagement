package com.hrmanagement.hrmanagement.payload.request;

import javax.validation.constraints.Size;
import java.time.LocalDate;

public class ExperienceRequest {

    private String positionName;

    private String companyName;

    private LocalDate experienceStartDate;

    private LocalDate experienceEndDate;

    private String experienceCity;

    private String experienceCountry;

    private String summary;

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public LocalDate getExperienceStartDate() {
        return experienceStartDate;
    }

    public void setExperienceStartDate(LocalDate experienceStartDate) {
        this.experienceStartDate = experienceStartDate;
    }

    public LocalDate getExperienceEndDate() {
        return experienceEndDate;
    }

    public void setExperienceEndDate(LocalDate experienceEndDate) {
        this.experienceEndDate = experienceEndDate;
    }

    public String getExperienceCity() {
        return experienceCity;
    }

    public void setExperienceCity(String experienceCity) {
        this.experienceCity = experienceCity;
    }

    public String getExperienceCountry() {
        return experienceCountry;
    }

    public void setExperienceCountry(String experienceCountry) {
        this.experienceCountry = experienceCountry;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
