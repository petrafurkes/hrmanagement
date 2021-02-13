package com.hrmanagement.hrmanagement.payload.request;

import javax.persistence.Column;
import java.time.LocalDate;

public class ApplicationRequest {

    @Column(length = 50)
    private LocalDate applicationDate;

    @Column(length = 50)
    private String applicationStatus;

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
}
