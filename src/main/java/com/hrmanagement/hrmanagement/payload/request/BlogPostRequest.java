package com.hrmanagement.hrmanagement.payload.request;

import javax.persistence.Column;
import java.time.LocalDate;

public class BlogPostRequest {

    private LocalDate blogPostDate;

    private String blogTitle;

    private String blogBody;

    public LocalDate getBlogPostDate() {
        return blogPostDate;
    }

    public void setBlogPostDate(LocalDate blogPostDate) {
        this.blogPostDate = blogPostDate;
    }

    public String getBlogTitle() {
        return blogTitle;
    }

    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle;
    }

    public String getBlogBody() {
        return blogBody;
    }

    public void setBlogBody(String blogBody) {
        this.blogBody = blogBody;
    }
}
