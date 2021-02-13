package com.hrmanagement.hrmanagement.controller;

import com.hrmanagement.hrmanagement.exception.ResourceNotFoundException;
import com.hrmanagement.hrmanagement.model.BlogPost;
import com.hrmanagement.hrmanagement.model.Job;
import com.hrmanagement.hrmanagement.model.User;
import com.hrmanagement.hrmanagement.repository.BlogPostRepository;
import com.hrmanagement.hrmanagement.repository.JobRepository;
import com.hrmanagement.hrmanagement.repository.PersonalDetailsRepository;
import com.hrmanagement.hrmanagement.repository.UserRepository;
import com.hrmanagement.hrmanagement.service.BlogPostService;
import com.hrmanagement.hrmanagement.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    JobService jobService;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    BlogPostService blogPostService;

    @Autowired
    BlogPostRepository blogPostRepository;


    private static final Logger logger = LoggerFactory.getLogger(PublicController.class);

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        try {
            List<Job> jobs = new ArrayList<>();

            jobRepository.findAll().forEach(jobs::add);

            if (jobs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else{
                return new ResponseEntity<>(jobs, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/jobs/active")
    public ResponseEntity<List<Job>> getAllActiveJobs() {
        try {
            List<Job> jobs = new ArrayList<>();

            jobRepository.findAllActiveJobs("active").forEach(jobs::add);

            if (jobs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else{
                return new ResponseEntity<>(jobs, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/jobs/expired")
    public ResponseEntity<List<Job>> getAllExpiredJobs() {
        try {
            List<Job> jobs = new ArrayList<>();

            jobRepository.findAllExpiredJobs("expired").forEach(jobs::add);

            if (jobs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else{
                return new ResponseEntity<>(jobs, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<Job> getJobById(@PathVariable(value = "jobId") Long jobId) {
        try {

            Optional<Job> jobData = jobRepository.findById(jobId);

            if (jobData.isPresent()) {
                return new ResponseEntity<>(jobData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/blogs")
    public ResponseEntity<List<BlogPost>> getAllBlogs() {
        try {
            List<BlogPost> blogPosts = new ArrayList<>();

            blogPostRepository.findAll().forEach(blogPosts::add);

            if (blogPosts.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else{
                return new ResponseEntity<>(blogPosts, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
