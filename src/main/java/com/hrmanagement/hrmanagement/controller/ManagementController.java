package com.hrmanagement.hrmanagement.controller;
import com.hrmanagement.hrmanagement.exception.ResourceNotFoundException;
import com.hrmanagement.hrmanagement.model.*;
import com.hrmanagement.hrmanagement.payload.request.BlogPostRequest;
import com.hrmanagement.hrmanagement.payload.request.EmployeeRequest;
import com.hrmanagement.hrmanagement.payload.request.InterviewRequest;
import com.hrmanagement.hrmanagement.payload.request.JobRequest;
import com.hrmanagement.hrmanagement.payload.response.MessageResponse;
import com.hrmanagement.hrmanagement.repository.ApplicationRepository;
import com.hrmanagement.hrmanagement.repository.BlogPostRepository;
import com.hrmanagement.hrmanagement.repository.JobRepository;
import com.hrmanagement.hrmanagement.repository.UserRepository;
import com.hrmanagement.hrmanagement.service.BlogPostService;
import com.hrmanagement.hrmanagement.service.EmployeeService;
import com.hrmanagement.hrmanagement.service.JobService;
import com.hrmanagement.hrmanagement.service.UserApplicantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/management")
public class ManagementController {

    @Autowired
    JobService jobService;

    @Autowired
    BlogPostService blogPostService;

    @Autowired
    UserApplicantService userApplicantService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BlogPostRepository blogPostRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    private static final Logger logger = LoggerFactory.getLogger(ManagementController.class);


    @PostMapping("/job")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<?> addJob(@Valid @RequestBody JobRequest jobRequest) {
        Job job = new Job();
        jobService.createNewJob(job, jobRequest);
        return ResponseEntity.ok()
                .body(new MessageResponse("Job advert is created successfully"));
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<Job> getJobByJobId(@PathVariable(value="jobId") Long jobId) {
        Optional<Job> jobData = jobRepository.findById(jobId);
        if (jobData.isPresent()) {

            return new ResponseEntity<>(jobData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/job/{jobId}")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<?> updateJob(@PathVariable(value="jobId") Long jobId,
                                       @Valid @RequestBody JobRequest jobRequest) {
        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job", "id", jobId));

        jobService.updateJob(job, jobRequest);
        return ResponseEntity.ok()
                .body(new MessageResponse("Job advert is updated successfully"));
    }

    @DeleteMapping("/job/{jobId}")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<?> deleteJob(@PathVariable(value="jobId") Long jobId) {

        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job", "id", jobId));

        jobRepository.delete(job);

        return ResponseEntity.ok()
                .body(new MessageResponse("Job is deleted successfully"));
    }



    @PostMapping("/blog")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<?> addBlogPost(@Valid @RequestBody BlogPostRequest blogPostRequest) {
        BlogPost blogPost = new BlogPost();
        blogPostService.createNewBlogPost(blogPost, blogPostRequest);
        return ResponseEntity.ok()
                .body(new MessageResponse("Blog post is created successfully"));
    }

    @PutMapping("/blog/{blogPostId}")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<?> updateBlogPost(@PathVariable(value="blogPostId") Long blogPostId,
                                            @Valid @RequestBody BlogPostRequest blogPostRequest) {
        BlogPost blogPost = blogPostRepository.findById(blogPostId).orElseThrow(
                () -> new ResourceNotFoundException("Blog", "id", blogPostId));

        blogPostService.updateBlogPost(blogPost, blogPostRequest);

        return ResponseEntity.ok()
                .body(new MessageResponse("Blog post is updated successfully"));
    }


    @DeleteMapping("/blog/{blogPostId}")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<?> deleteBlogPost(@PathVariable(value="blogPostId") Long blogPostId) {

        BlogPost blogPost = blogPostRepository.findById(blogPostId).orElseThrow(
                () -> new ResourceNotFoundException("Blog", "id", blogPostId));
        blogPostRepository.delete(blogPost);

        return ResponseEntity.ok()
                .body(new MessageResponse("Blog post is deleted successfully"));
    }

    @GetMapping("/application/{applicationId}")
    @PreAuthorize("hasAnyRole('MANAGEMENT', 'USER')")
    public ResponseEntity<Application> getApplicationByApplicationId(@PathVariable(value = "applicationId") Long applicationId) {
        Optional<Application> applicationData = applicationRepository.findById(applicationId);

        if (applicationData.isPresent()) {
            return new ResponseEntity<>(applicationData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/{jobId}/applications")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<List<Application>> getApplicationsByJobId(@PathVariable(value="jobId") Long jobId) {
        Optional<Job> jobData = jobRepository.findById(jobId);
        if (jobData.isPresent()) {

            return new ResponseEntity<>(jobData.get().getApplications(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userEmail}")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<User> getUserByEmail(@PathVariable(value="userEmail") String userEmail) {
        User userData = userRepository.findByEmail(userEmail).orElseThrow(
                () -> new ResourceNotFoundException("User", "userEmail", userEmail));

        Long userId = userData.getId();
        Optional<User> newUserData = userRepository.findById(userId);

        if (newUserData.isPresent()) {

            return new ResponseEntity<>(newUserData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @PutMapping("/{userId}/application/{applicationId}")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<Application> interviewProcess(@PathVariable(value = "userId") Long userId,
                                                        @PathVariable(value = "applicationId") Long applicationId,
                                                        @Valid @RequestBody InterviewRequest interviewRequest) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new ResourceNotFoundException("Application", "id", applicationId));

        userApplicantService.interviewProcess(user, application, interviewRequest);

        return new ResponseEntity<>(application, HttpStatus.CREATED);

    }


    @DeleteMapping("/job/delete/{jobId}")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<MessageResponse> deleteJobById(@PathVariable(value = "jobId") Long jobId) {
        try {

            Optional<Job> jobData = jobRepository.findById(jobId);

            if (jobData.isPresent()) {
                jobRepository.deleteById(jobId);
                return ResponseEntity.ok()
                        .body(new MessageResponse("Job has been deleted successfully"));
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/employee")
    @PreAuthorize("hasRole('MANAGEMENT')")
    public ResponseEntity<?> registerNewEmployee(@Valid @RequestBody EmployeeRequest employeeRequest) {
        Employee employee = new Employee();
        employeeService.registerNewEmployee(employee, employeeRequest);
        return ResponseEntity.ok()
                .body(new MessageResponse(employee.getFullName() + " was registered successfully"));
    }
}
