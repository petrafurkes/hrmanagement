package com.hrmanagement.hrmanagement.service;

import com.hrmanagement.hrmanagement.model.Job;
import com.hrmanagement.hrmanagement.payload.request.JobRequest;
import com.hrmanagement.hrmanagement.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;


    public void createNewJob(Job job, JobRequest jobRequest) {

        getJob(job, jobRequest);

    }

    private void getJob(Job job, JobRequest jobRequest) {
        job.setJobDateCreated(jobRequest.getJobDateCreated());
        job.setJobDateExpiration(jobRequest.getJobDateExpiration());
        job.setJobDescription(jobRequest.getJobDescription());
        job.setJobRequirements(jobRequest.getJobRequirements());
        job.setJobResponsibilities(jobRequest.getJobResponsibilities());
        job.setJobStatus(jobRequest.getJobStatus());
        job.setJobTitle(jobRequest.getJobTitle());
        job.setJobCategory(jobRequest.getJobCategory());
        job.setJobCity(jobRequest.getJobCity());
        job.setSalary(jobRequest.getSalary());
        job.setContractType(jobRequest.getContractType());

        jobRepository.save(job);
    }

    public void updateJob(Job job, JobRequest jobRequest) {

        getJob(job, jobRequest);
    }
}
