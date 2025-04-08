import axios from 'axios';
import API_URL from "./env"
import authHeader from './auth-header';
class UserService {

getUser() {
    return axios.get(API_URL + 'user',
    { headers: authHeader() })
    .then(response => {
        return response.data.data;
    });
}

uploadAvatar(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    return axios
        .post(API_URL + 'user/upload_avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            }
        })
        .then(response => {
            if (response.data.success) {
                return response.data.data;
            }
            return null;
        });
}

removeAvatar() {
    return axios.delete(API_URL + 'user/remove_avatar',
    { headers: authHeader() })
    .then(response => {
        return response.data.data;
    });
}

sendVerificationEmail(emailData) {
    return axios.post(API_URL + 'user/send_verification_email',
    emailData,
    { headers: authHeader() })
    .then(response => {
        return response.data;
    });
}

changeEmail(changeEmail) {
    return axios.post(API_URL + 'user/change_email',
    changeEmail,
    { headers: authHeader() })
    .then(response => {
        return response.data.data;
    });
}
}

const userService = new UserService();
export default userService;