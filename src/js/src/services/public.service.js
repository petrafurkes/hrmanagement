import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/public';



class PublicService {


    getAllJobs() {
        return axios.get(API_URL + '/jobs', { 
                headers: authHeader() })
            .then(response => {
            return response.data;
        });
    }

    getAllActiveJobs() {
        return axios.get(API_URL + '/jobs/active', { 
                headers: authHeader() })
            .then(response => {
            return response.data;
        });
    }

    getAllExpiredJobs() {
        return axios.get(API_URL + '/jobs/expired', { 
                headers: authHeader() })
            .then(response => {
            return response.data;
        });
    }

    

    getJobById(jobId) {
        return axios.get(API_URL + '/job/' + jobId, { 
                headers: authHeader() })
            .then(response => {
            return response.data;
        });
    }


}

export default new PublicService();
