package com.hrmanagement.hrmanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.UUID;
@Entity
@Table(	name = "experience")
public class Experience {

    @Id
    @GeneratedValue
    private Long experienceId;

    @Column(length = 50)
    private String positionName;

    @Column(length = 50)
    private String companyName;

    @Column(length = 50)
    private LocalDate experienceStartDate;

    @Column(length = 50)
    private LocalDate experienceEndDate;

    @Column(length = 50)
    private String experienceCity;

    @Column(length = 50)
    private String experienceCountry;

    @Column(length = 1000)
    private String summary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;


    public Experience() {
        this.experienceId = experienceId;
        this.positionName = positionName;
        this.companyName = companyName;
        this.experienceStartDate = experienceStartDate;
        this.experienceEndDate = experienceEndDate;
        this.experienceCity = experienceCity;
        this.experienceCountry = experienceCountry;
        this.summary = summary;
    }

    public Long getExperienceId() {
        return experienceId;
    }

    public void setExperienceId(Long experienceId) {
        this.experienceId = experienceId;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
