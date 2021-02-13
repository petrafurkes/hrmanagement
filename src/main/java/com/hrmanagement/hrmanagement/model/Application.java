package com.hrmanagement.hrmanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(	name = "applications")
public class Application {

    @Id
    @GeneratedValue
    private Long applicationId;

    @Column(length = 50)
    private LocalDate applicationDate;

    @Column(length = 50)
    private String applicationStatus;

    @Column(length = 50)
    private Long applicantId;

    @Column(length = 50)
    @Email
    private String userEmail;

    @Column(length = 50)
    private String userFullName;

    @Column(length = 50)
    private String userMobileNumber;

    @Column(length = 50)
    private String jobTitle;

    @Column(length = 100)
    private String contractType;

    @Column(length = 100)
    private String jobCity;



    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "job_id", nullable = false)
    @JsonIgnore
    private Job job;

    public Application() {
        this.applicationId = applicationId;
        this.applicationDate = applicationDate;
        this.applicationStatus = applicationStatus;
        this.applicantId = applicantId;
        this.userEmail = userEmail;
        this.userFullName = userFullName;
        this.userMobileNumber = userMobileNumber;
        this.jobTitle = jobTitle;
        this.contractType = contractType;
        this.jobCity = jobCity;
        this.user = user;
        this.job = job;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public Long getApplicantId() {
        return applicantId;
    }

    public void setApplicantId(Long applicantId) {
        this.applicantId = applicantId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserFullName() {
        return userFullName;
    }

    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }

    public String getUserMobileNumber() {
        return userMobileNumber;
    }

    public void setUserMobileNumber(String userMobileNumber) {
        this.userMobileNumber = userMobileNumber;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getJobCity() {
        return jobCity;
    }

    public void setJobCity(String jobCity) {
        this.jobCity = jobCity;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }
}
