import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/admin';



class AdminService {


getAllUsers() {
    return axios.get(API_URL + '/users', { 
            headers: authHeader() })
        .then(response => {
            console.log(response.data)
        return response.data;
    });
    }

}

export default new AdminService();
