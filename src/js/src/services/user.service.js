import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/user/';


const user = AuthService.getCurrentUser();

class UserService {
  
  getUserById(userId) {
    return axios.get(API_URL + userId, { 
        headers: authHeader() })
      .then(response => {
      return response.data;
    });
  }

  deleteUser(userId) {
    return axios.delete(API_URL + 'delete/' + userId, { 
        headers: authHeader() })
      .then(response => {
      return response.data;
    });
  }


  registerPersonalDetails(aboutMe, address, birthDate, city, country, fullName, gender, mobileNumber, postcode) {

    return axios.post(API_URL + user.id, {
      aboutMe,
      address,
      birthDate,
      city,
      country,
      fullName,
      gender,
      mobileNumber,
      postcode
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }

  editPersonalDetails(aboutMe, address, birthDate, city, country, fullName, gender, mobileNumber, postcode) {

    return axios.put(API_URL + user.id, {
      aboutMe,
      address,
      birthDate,
      city,
      country,
      fullName,
      gender,
      mobileNumber,
      postcode
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }
  


  addEducation(educationCity, educationCountry, educationDegree, educationEndDate, educationInstitution, educationStartDate, educationType) {
    
    return axios.post(API_URL + user.id + '/education', {
      educationCity,
      educationCountry,
      educationDegree,
      educationEndDate,
      educationInstitution,
      educationStartDate,
      educationType
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }


  editEducation(userId, educationId, educationCity, educationCountry, educationDegree, educationEndDate, educationInstitution, educationStartDate, educationType) {
    
    return axios.put(API_URL + userId + '/education/' + educationId, {
      educationCity,
      educationCountry,
      educationDegree,
      educationEndDate,
      educationInstitution,
      educationStartDate,
      educationType
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }

  
  getEducationsByUserId(userId) {
    return axios.get(API_URL + userId + '/educations', { 
        headers: authHeader() })
      .then(response => {
      return response.data;
    });
  }

  getSingleEducationByIdAndUserId(userId, educationId) {
    return axios.get(API_URL + userId + '/educations/' + educationId, { 
        headers: authHeader() })
      .then(response => {
      return response.data;
    });
  }

  deleteEducation(educationId) {
    return axios.delete(API_URL + user.id + '/education/' + educationId, { 
        headers: authHeader() })
      .then(response => {
      return response.data;
    });
  }


  addExperience(companyName, experienceCity, experienceCountry, experienceEndDate, experienceStartDate, positionName, summary) {

    
    return axios.post(API_URL + user.id + '/experience', {
      companyName,
      experienceCity,
      experienceCountry,
      experienceEndDate,
      experienceStartDate,
      positionName,
      summary
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }

 

  editExperience(userid, experienceId, companyName, experienceCity, experienceCountry, experienceEndDate, experienceStartDate, positionName, summary) {

    
    return axios.put(API_URL + userid + '/experience/' + experienceId, {
      companyName,
      experienceCity,
      experienceCountry,
      experienceEndDate,
      experienceStartDate,
      positionName,
      summary
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }


  getExperiencesByUserId(userId) {
    return axios.get(API_URL + userId + '/experiences', { 
        headers: authHeader() })
      .then(response => {
      return response.data;
    });
  }


  getSingleExperienceByIdAndUserId(userId, experienceId) {
    return axios.get(API_URL + userId + '/experience/' + experienceId, { 
        headers: authHeader() })
      .then(response => {
      return response.data;
    });
  }

  deleteExperience(experienceId) {
    return axios.delete(API_URL + user.id + '/experience/' + experienceId, { 
        headers: authHeader() })
      .then(response => {
      return response.data;
    });
  }



  submittApplication(jobId) {
    return axios.post(API_URL + user.id + '/application/' + jobId, {}, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(JSON.stringify(response.data))
      return response.data;
    });
  }

  withdrawApplication(userId, applicationId) {
    
    return axios.put(API_URL + userId + '/application/' + applicationId, {
    }, {
      headers: authHeader(),
    })
    .then(response => {
      console.log(response)
      return response.data;
    });
  }


 


  uploadCV(file) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post(API_URL + user.id +'/cv/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization:  'Bearer ' + user.accessToken
        }
    })
    ;
  }

  replaceCV(file) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.put(API_URL + user.id +'/cv/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization:  'Bearer ' + user.accessToken
        }
    })
    ;
  }

  

  downloadCV(userId, cvId) {

    return axios.get(API_URL + userId + "/cv/" + cvId, {
      headers: authHeader(),
      responseType: 'blob'
    })
      .then((file) => {
        
        return file.data;
    });
  }

  


}

export default new UserService();
