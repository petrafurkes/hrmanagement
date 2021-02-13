package com.hrmanagement.hrmanagement.payload.request;

import javax.persistence.Column;

public class CVRequest {

    private String cvLink;

    public String getCvLink() {
        return cvLink;
    }

    public void setCvLink(String cvLink) {
        this.cvLink = cvLink;
    }
}
