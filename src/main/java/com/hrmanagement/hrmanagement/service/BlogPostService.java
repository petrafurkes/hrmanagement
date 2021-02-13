package com.hrmanagement.hrmanagement.service;

import com.hrmanagement.hrmanagement.model.BlogPost;
import com.hrmanagement.hrmanagement.payload.request.BlogPostRequest;
import com.hrmanagement.hrmanagement.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;


    public void createNewBlogPost(BlogPost blogPost, BlogPostRequest blogPostRequest) {

        blogPost.setBlogTitle(blogPostRequest.getBlogTitle());
        blogPost.setBlogBody(blogPostRequest.getBlogBody());
        blogPost.setBlogPostDate(blogPostRequest.getBlogPostDate());

        blogPostRepository.save(blogPost);

    }

    public void updateBlogPost(BlogPost blogPost, BlogPostRequest blogPostRequest) {

        blogPost.setBlogTitle(blogPostRequest.getBlogTitle());
        blogPost.setBlogBody(blogPostRequest.getBlogBody());
        blogPost.setBlogPostDate(blogPostRequest.getBlogPostDate());

        blogPostRepository.save(blogPost);
    }
}
