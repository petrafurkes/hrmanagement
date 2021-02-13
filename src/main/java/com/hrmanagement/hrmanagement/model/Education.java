package com.hrmanagement.hrmanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
@Entity
@Table(	name = "education")
public class Education {

    @Id
    @GeneratedValue
    private Long educationId;

    @Column(length = 200)
    private String educationDegree;

    @Column(length = 50)
    private String educationType;

    @Column(length = 50)
    private String educationInstitution;

    @Column(length = 50)
    private String educationCity;

    @Column(length = 50)
    private String educationCountry;

    @Column(length = 50)
    private LocalDate educationStartDate;

    @Column(length = 50)
    private LocalDate educationEndDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;


    public Education() {
        this.educationId = educationId;
        this.educationDegree = educationDegree;
        this.educationType = educationType;
        this.educationInstitution = educationInstitution;
        this.educationCity = educationCity;
        this.educationCountry = educationCountry;
        this.educationStartDate = educationStartDate;
        this.educationEndDate = educationEndDate;
    }

    public Long getEducationId() {
        return educationId;
    }

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

    public void setEducationId(Long educationId) {
        this.educationId = educationId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Education{" +
                "educationId=" + educationId +
                ", educationDegree='" + educationDegree + '\'' +
                ", educationType='" + educationType + '\'' +
                ", educationInstitution='" + educationInstitution + '\'' +
                ", educationCity='" + educationCity + '\'' +
                ", educationCountry='" + educationCountry + '\'' +
                ", educationStartDate=" + educationStartDate +
                ", educationEndDate=" + educationEndDate +
                '}';
    }
}
