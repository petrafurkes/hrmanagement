package com.hrmanagement.hrmanagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(	name = "blog")
public class BlogPost {

    @Id
    @GeneratedValue
    private Long blogPostId;

    @Column(length = 50)
    private LocalDate blogPostDate;

    @Column(length = 200)
    private String blogTitle;

    @Column(length = 2000)
    private String blogBody;

    public BlogPost() {
        this.blogPostId = blogPostId;
        this.blogPostDate = blogPostDate;
        this.blogTitle = blogTitle;
        this.blogBody = blogBody;
    }

    public Long getBlogPostId() {
        return blogPostId;
    }

    public void setBlogPostId(Long blogPostId) {
        this.blogPostId = blogPostId;
    }

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
