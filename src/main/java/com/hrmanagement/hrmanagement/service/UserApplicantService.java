package com.hrmanagement.hrmanagement.service;

import com.hrmanagement.hrmanagement.model.*;
import com.hrmanagement.hrmanagement.payload.request.*;
import com.hrmanagement.hrmanagement.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


@Service
public class UserApplicantService {


    @Autowired
    PersonalDetailsRepository personalDetailsRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EducationRepository educationRepository;

    @Autowired
    ExperienceRepository experienceRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    CVRepository cvRepository;



    private static final Logger logger = LoggerFactory.getLogger(UserApplicantService.class);


    public UserPersonalDetails createUserPersonalDetails(User user,
                                                         PersonalDetailsRequest personalDetailsRequest,
                                                         UserPersonalDetails userPersonalDetails) {

        return getUserPersonalDetails(user, personalDetailsRequest, userPersonalDetails);
    }




    private UserPersonalDetails getUserPersonalDetails(User user,
                                                       PersonalDetailsRequest personalDetailsRequest,
                                                       UserPersonalDetails userPersonalDetails) {
        userPersonalDetails.setUser(user);
        userPersonalDetails.setAboutMe(personalDetailsRequest.getAboutMe());
        userPersonalDetails.setAddress(personalDetailsRequest.getAddress());
        userPersonalDetails.setBirthDate(personalDetailsRequest.getBirthDate());
        userPersonalDetails.setCity(personalDetailsRequest.getCity());
        userPersonalDetails.setCountry(personalDetailsRequest.getCountry());
        userPersonalDetails.setFullName(personalDetailsRequest.getFullName());
        userPersonalDetails.setGender(personalDetailsRequest.getGender());
        userPersonalDetails.setMobileNumber(personalDetailsRequest.getMobileNumber());
        userPersonalDetails.setPostcode(personalDetailsRequest.getPostcode());
        userPersonalDetails.setHrUserPosition("user-applicant");

        user.setUserPersonalDetails(userPersonalDetails);

        return personalDetailsRepository.save(userPersonalDetails);
    }


    public UserPersonalDetails updateUserPersonalDetails(User user,
                                                         UserPersonalDetails userPersonalDetails,
                                                         PersonalDetailsRequest personalDetailsRequest) {

        return getUserPersonalDetails(user, personalDetailsRequest, userPersonalDetails);
    }


    public Education createEducation(User user,
                                     Education education,
                                     EducationRequest educationRequest) {

        return getEducation(user, education, educationRequest);

    }



    private Education getEducation(User user, Education education, EducationRequest educationRequest) {

        education.setUser(user);
        education.setEducationCity(educationRequest.getEducationCity());
        education.setEducationCountry(educationRequest.getEducationCountry());
        education.setEducationDegree(educationRequest.getEducationDegree());
        education.setEducationEndDate(educationRequest.getEducationEndDate());
        education.setEducationInstitution(educationRequest.getEducationInstitution());
        education.setEducationStartDate(educationRequest.getEducationStartDate());
        education.setEducationType(educationRequest.getEducationType());

        user.getEducations().add(education);

        return educationRepository.save(education);
    }

    public Education updateEducation(User user,
                                Education education,
                                EducationRequest educationRequest) {

        return getEducation(user, education, educationRequest);

    }

    public Experience createExperience(User user,
                                       Experience experience,
                                       ExperienceRequest experienceRequest) {

        return getExperience(user, experience, experienceRequest);
    }

    private Experience getExperience(User user, Experience experience, ExperienceRequest experienceRequest) {
        experience.setUser(user);
        experience.setPositionName(experienceRequest.getPositionName());
        experience.setCompanyName(experienceRequest.getCompanyName());
        experience.setExperienceCity(experienceRequest.getExperienceCity());
        experience.setExperienceCountry(experienceRequest.getExperienceCountry());
        experience.setExperienceStartDate(experienceRequest.getExperienceStartDate());
        experience.setExperienceEndDate(experienceRequest.getExperienceEndDate());
        experience.setSummary(experienceRequest.getSummary());

        user.getExperiences().add(experience);

        return experienceRepository.save(experience);
    }

    public Experience updateExperience(User user,
                                 Experience experience,
                                 ExperienceRequest experienceRequest) {

       return getExperience(user, experience, experienceRequest);
    }


    public Application createApplication(User user,
                                         Job job,
                                         Application application) {

        application.setUser(user);
        application.setJob(job);

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate now = LocalDate.now();
        application.setApplicationDate(now);
        application.setApplicationStatus("active");
        application.setApplicantId(user.getId());
        application.setUserEmail(user.getEmail());
        application.setUserFullName(user.getUserPersonalDetails().getFullName());
        application.setUserMobileNumber(user.getUserPersonalDetails().getMobileNumber());
        application.setJobTitle(job.getJobTitle());
        application.setContractType(job.getContractType());
        application.setJobCity(job.getJobCity());

        user.getApplications().add(application);
        job.getApplications().add(application);

        return applicationRepository.save(application);


    }


    public Application updateApplication(User user,
                                         Application application) {

        application.setUser(user);
        application.setApplicationStatus("withdrawn");

        return applicationRepository.save(application);

    }


    public Application interviewProcess(User user,
                                         Application application,
                                         InterviewRequest interviewRequest) {

        application.setUser(user);
        application.setApplicationStatus(interviewRequest.getApplicationStatus());

        return applicationRepository.save(application);
    }


}


















