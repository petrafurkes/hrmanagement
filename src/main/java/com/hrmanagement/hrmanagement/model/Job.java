package com.hrmanagement.hrmanagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(	name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    @NotBlank
    @Column(length = 50)
    private String jobTitle;

    @NotBlank
    @Column(length = 1000)
    private String jobDescription;

    @NotBlank
    @Column(length = 1000)
    private String jobResponsibilities;

    @NotBlank
    @Column(length = 1000)
    private String jobRequirements;

    @NotBlank
    @Column(length = 50)
    private LocalDate jobDateCreated;

    @NotBlank
    @Column(length = 50)
    private LocalDate jobDateExpiration;

    @NotBlank
    @Column(length = 50)
    private String jobStatus;

    @NotBlank
    @Column(length = 100)
    private String contractType;

    @NotBlank
    @Column(length = 100)
    private String jobCategory;

    @NotBlank
    @Column(length = 100)
    private String jobCity;

    @NotBlank
    @Column(length = 50)
    private String salary;

    @OneToMany(mappedBy = "job",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private List<Application> applications = new ArrayList<>();


    public Job() {
        this.jobId = jobId;
        this.contractType = contractType;
        this.jobCategory = jobCategory;
        this.jobCity = jobCity;
        this.jobDateCreated = jobDateCreated;
        this.jobDateExpiration = jobDateExpiration;
        this.jobDescription = jobDescription;
        this.jobRequirements = jobRequirements;
        this.jobResponsibilities = jobResponsibilities;
        this.jobStatus = jobStatus;
        this.jobTitle = jobTitle;
        this.salary = salary;


    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

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

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
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



