package com.hrmanagement.hrmanagement.controller;


import com.hrmanagement.hrmanagement.exception.ResourceNotFoundException;
import com.hrmanagement.hrmanagement.model.*;
import com.hrmanagement.hrmanagement.payload.request.*;
import com.hrmanagement.hrmanagement.payload.response.MessageResponse;
import com.hrmanagement.hrmanagement.repository.*;
import com.hrmanagement.hrmanagement.service.CVService;
import com.hrmanagement.hrmanagement.service.UserApplicantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {


    @Autowired
    UserRepository userRepository;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    EducationRepository educationRepository;

    @Autowired
    ExperienceRepository experienceRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    CVRepository cvRepository;

    @Autowired
    UserApplicantService userApplicantService;

    @Autowired
    private CVService cvService;


    private static final Logger logger = LoggerFactory.getLogger(UserController.class);



    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "userId") Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        userRepository.delete(user);

        return ResponseEntity.ok()
                .body(new MessageResponse("User was deleted successfully"));
    }


    @PostMapping("/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserPersonalDetails> createUserPersonalDetails(@PathVariable(value = "userId") Long userId,
                                                                         @Valid @RequestBody PersonalDetailsRequest personalDetailsRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        UserPersonalDetails userPersonalDetails = new UserPersonalDetails();

        userApplicantService.createUserPersonalDetails(user, personalDetailsRequest, userPersonalDetails);

        return new ResponseEntity<>(userPersonalDetails, HttpStatus.OK);
    }



    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserPersonalDetails> updateUserPersonalDetails(@PathVariable(value = "userId") Long userId,
                                                                         @RequestBody PersonalDetailsRequest personalDetailsRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

            UserPersonalDetails userPersonalDetails = user.getUserPersonalDetails();

            userApplicantService.updateUserPersonalDetails(user, userPersonalDetails, personalDetailsRequest);

            return new ResponseEntity<>(userPersonalDetails, HttpStatus.OK);

    }



    @PostMapping("/{userId}/education")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Education> createUserEducation(@PathVariable(value = "userId") Long userId,
                                        @Valid @RequestBody EducationRequest educationRequest) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));


        Education education = new Education();

        userApplicantService.createEducation(user, education, educationRequest);

        return new ResponseEntity<>(education, HttpStatus.CREATED);

    }


    @PutMapping("/{userId}/education/{educationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Education> updateUserEducation(@PathVariable(value = "userId") Long userId,
                                                         @PathVariable(value = "educationId") Long educationId,
                                                         @Valid @RequestBody EducationRequest educationRequest) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        Education education = educationRepository.findById(educationId).orElseThrow(
                () -> new ResourceNotFoundException("Education", "id", educationId));

        userApplicantService.updateEducation(user, education, educationRequest);

        return new ResponseEntity<>(education, HttpStatus.CREATED);

    }

    @DeleteMapping("/{userId}/education/{educationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteUserEducationById(@PathVariable(value = "userId") Long userId,
                                                      @PathVariable(value = "educationId") Long educationId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        Education education = educationRepository.findById(educationId).orElseThrow(
                () -> new ResourceNotFoundException("Experience", "id", educationId));

        educationRepository.deleteById(educationId);

        return ResponseEntity.ok()
                .body(new MessageResponse("User education was deleted successfully"));
    }




    @PostMapping("/{userId}/experience")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Experience> createUserExperience(@PathVariable(value = "userId") Long userId,
                                                 @Valid @RequestBody ExperienceRequest experienceRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));


        Experience experience = new Experience();

        userApplicantService.createExperience(user, experience, experienceRequest);

        return new ResponseEntity<>(experience, HttpStatus.CREATED);
    }


    @PutMapping("/{userId}/experience/{experienceId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Experience> updateUserExperience(@PathVariable(value = "userId") Long userId,
                                                         @PathVariable(value = "experienceId") Long experienceId,
                                                         @Valid @RequestBody ExperienceRequest experienceRequest) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        Experience experience = experienceRepository.findById(experienceId).orElseThrow(
                () -> new ResourceNotFoundException("Education", "id", experienceId));

        userApplicantService.updateExperience(user, experience, experienceRequest);

        return new ResponseEntity<>(experience, HttpStatus.CREATED);

    }

    @DeleteMapping("/{userId}/experience/{experienceId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteUserExperienceById(@PathVariable(value = "userId") Long userId,
                                                  @PathVariable(value = "experienceId") Long experienceId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        Experience experience = experienceRepository.findById(experienceId).orElseThrow(
                () -> new ResourceNotFoundException("Experience", "id", experienceId));

        experienceRepository.deleteById(experienceId);

        return ResponseEntity.ok()
                .body(new MessageResponse("User experience was deleted successfully"));
    }


    @PostMapping("/{userId}/application/{jobId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Application> createUserApplication(@PathVariable(value = "userId") Long userId,
                                                             @PathVariable(value = "jobId") Long jobId) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job", "id", jobId));
        Application application = new Application();
        userApplicantService.createApplication(user, job, application);

        return new ResponseEntity<>(application, HttpStatus.CREATED);

    }

    @PutMapping("/{userId}/application/{applicationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Application> withdrawApplicationUserApplicant(@PathVariable(value = "userId") Long userId,
                                                                        @PathVariable(value = "applicationId") Long applicationId) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new ResourceNotFoundException("Application", "id", applicationId));

        userApplicantService.updateApplication(user, application);

        return new ResponseEntity<>(application, HttpStatus.CREATED);

    }



    @DeleteMapping("/{userId}/application/{applicationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteUserApplication(@PathVariable(value = "userId") Long userId,
                                                   @PathVariable(value = "applicationId") Long applicationId) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new ResourceNotFoundException("Application", "id", applicationId));

        applicationRepository.delete(application);

        return ResponseEntity.ok()
                .body(new MessageResponse("Application was deleted successfully"));

    }




    @GetMapping("/{userId}")
    @PreAuthorize("hasAnyRole('USER', 'MANAGEMENT')")
    public ResponseEntity<User> getUserById(@PathVariable(value = "userId") Long userId) {
        Optional<User> userData = userRepository.findById(userId);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{userId}/pd")
    @PreAuthorize("hasAnyRole('USER', 'MANAGEMENT')")
    public ResponseEntity<UserPersonalDetails> getUserDetailsByUserId(@PathVariable(value = "userId") Long userId) {
        Optional<User> userData = userRepository.findById(userId);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get().getUserPersonalDetails(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{userId}/educations")
    @PreAuthorize("hasAnyRole('USER', 'MANAGEMENT')")
    public ResponseEntity<Set<Education>> getEducationsByUserId(@PathVariable(value = "userId") Long userId) {
        Optional<User> userData = userRepository.findById(userId);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get().getEducations(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{userId}/educations/{educationId}")
    @PreAuthorize("hasAnyRole('USER', 'MANAGEMENT')")
    public ResponseEntity<Education> getEducationByIdAndUserId(@PathVariable(value = "userId") Long userId,
                                                               @PathVariable(value = "educationId") Long educationId) {
        Optional<User> userData = userRepository.findById(userId);
        if (userData.isPresent()) {
            Optional<Education>education = educationRepository.findById(educationId);
            if(education.isPresent()){
                return new ResponseEntity<>(education.get(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            }
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);}
    }

    @GetMapping("/{userId}/experiences")
    @PreAuthorize("hasAnyRole('USER', 'MANAGEMENT')")
    public ResponseEntity<Set<Experience>> getExperiencesByUserId(@PathVariable(value = "userId") Long userId) {
        Optional<User> userData = userRepository.findById(userId);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get().getExperiences(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/{userId}/experience/{experienceId}")
    @PreAuthorize("hasAnyRole('USER', 'MANAGEMENT')")
    public ResponseEntity<Experience> getExperienceByIdAndUserId(@PathVariable(value = "userId") Long userId,
                                                               @PathVariable(value = "experienceId") Long experienceId) {
        Optional<User> userData = userRepository.findById(userId);
        if (userData.isPresent()) {
            Optional<Experience>experience = experienceRepository.findById(experienceId);
            if(experience.isPresent()){
                return new ResponseEntity<>(experience.get(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            }
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);}
    }



    @GetMapping("/{userId}/applications")
    @PreAuthorize("hasAnyRole('USER', 'MANAGEMENT')")
    public ResponseEntity<Set<Application>> getApplicationsByUserId(@PathVariable(value = "userId") Long userId) {
        Optional<User> userData = userRepository.findById(userId);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get().getApplications(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/{userId}/cv/upload")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MessageResponse> uploadCV(@PathVariable(value = "userId") Long userId,
                                                    @RequestParam("file") MultipartFile file) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));
        String message = "";
        try {
            cvService.store(user, file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }


    @PutMapping("/{userId}/cv/upload")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MessageResponse> replaceCV(@PathVariable(value = "userId") Long userId,
                                                    @RequestParam("file") MultipartFile file) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));
        String oldCvId = user.getCv().getId();


        String message = "";
        try {
            CV oldCv = cvRepository.findById(oldCvId).orElseThrow(
                    () -> new ResourceNotFoundException("CV", "id", oldCvId));

            cvRepository.deleteById(oldCvId);
            user.setCv(null);

            cvService.store(user, file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }



    @GetMapping("/{userId}/cv/{cvId}")
    public ResponseEntity<byte[]> downloadCVByUserIDAndCVID(@PathVariable(value = "userId") Long userId,
                                                       @PathVariable (value = "cvId") String cvId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));

        if(user.getCv().getId().equalsIgnoreCase(cvId)){
            CV cvFile = cvService.getFile(cvId);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + cvFile.getName() + "\"")
                    .body(cvFile.getData());
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




}
