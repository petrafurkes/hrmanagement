package com.hrmanagement.hrmanagement.payload.request;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public class JobRequest {

    @NotBlank
    private String jobTitle;

    @NotBlank
    private String jobDescription;

    @NotBlank
    private String jobResponsibilities;

    @NotBlank
    private String jobRequirements;

    @NotBlank
    private LocalDate jobDateCreated;

    @NotBlank
    private LocalDate jobDateExpiration;

    @NotBlank
    private String jobStatus;

    @NotBlank
    private String contractType;

    @NotBlank
    private String jobCategory;

    @NotBlank
    private String jobCity;

    @NotBlank
    private String salary;


    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getJobResponsibilities() {
        return jobResponsibilities;
    }

    public void setJobResponsibilities(String jobResponsibilities) {
        this.jobResponsibilities = jobResponsibilities;
    }

    public String getJobRequirements() {
        return jobRequirements;
    }

    public void setJobRequirements(String jobRequirements) {
        this.jobRequirements = jobRequirements;
    }

    public LocalDate getJobDateCreated() {
        return jobDateCreated;
    }

    public void setJobDateCreated(LocalDate jobDateCreated) {
        this.jobDateCreated = jobDateCreated;
    }

    public LocalDate getJobDateExpiration() {
        return jobDateExpiration;
    }

    public void setJobDateExpiration(LocalDate jobDateExpiration) {
        this.jobDateExpiration = jobDateExpiration;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getJobCategory() {
        return jobCategory;
    }

    public void setJobCategory(String jobCategory) {
        this.jobCategory = jobCategory;
    }

    public String getJobCity() {
        return jobCity;
    }

    public void setJobCity(String jobCity) {
        this.jobCity = jobCity;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }
}
