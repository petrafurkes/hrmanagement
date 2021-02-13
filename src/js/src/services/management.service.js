import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/management';


class ManagementService {


  addNewJob(contractType, jobCategory, jobCity, jobDateCreated, jobDateExpiration, jobDescription, jobRequirements, jobResponsibilities, jobStatus, jobTitle, salary) {
    
    return axios.post(API_URL + '/job', {
        contractType,
        jobCategory,
        jobCity,
        jobDateCreated,
        jobDateExpiration,
        jobDescription,
        jobRequirements,
        jobResponsibilities,
        jobStatus,
        jobTitle,
        salary
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }

  editJob(jobId, contractType, jobCategory, jobCity, jobDateCreated, jobDateExpiration, jobDescription, jobRequirements, jobResponsibilities, jobStatus, jobTitle, salary) {
    
    return axios.put(API_URL + '/job/' + jobId, {
        contractType,
        jobCategory,
        jobCity,
        jobDateCreated,
        jobDateExpiration,
        jobDescription,
        jobRequirements,
        jobResponsibilities,
        jobStatus,
        jobTitle,
        salary
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }




  getApplicationByApplicationId(applicationId) {
    return axios.get(API_URL + '/application/' + applicationId, { 
        headers: authHeader() })
      .then(response => {
        console.log(response)
      return response.data;

    });
  }


  updateApplicationStatus(applicantId, applicationId, applicationStatus) {
    
    return axios.put(API_URL + '/' + applicantId + '/application/' + applicationId, {
        applicationStatus
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(response)
      return response.data;
    });
  }

 

  deleteJob(jobId) {
    return axios.delete(API_URL + '/job/delete/' + jobId, { 
        headers: authHeader() })
      .then(response => {
      return response.data;
    });
  }


  registerNewEmployee(fullName, mobileNumber, personalEmail, birthDate, gender, homeAddress) {
    
    return axios.post(API_URL + '/employee', {
      fullName,
      mobileNumber,
      personalEmail,
      birthDate,
      gender,
      homeAddress
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }



}

export default new ManagementService();
