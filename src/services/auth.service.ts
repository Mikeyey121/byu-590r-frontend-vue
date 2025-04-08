import axios from 'axios';
import API_URL from "./env"


class AuthService {
   login(user) {
       console.log('inside service -- ', user)
       return axios
           .post(API_URL + 'login', {
               email: user.email,
               password: user.password
           })
           .then(response => {
               if (response.data.success) {
                   const userData = response.data.data;
                   localStorage.setItem('user', JSON.stringify(userData));
                   return userData;
               }
               return null;
           });
   }

   logout() {
       localStorage.removeItem('user');
   }

   register(user) {
       return axios.post(API_URL + 'register', {
           name: user.name,
           email: user.email,
           password: user.password,
           c_password: user.c_password
       });
   }

   forgotPassword(forgotEmail) {
       console.log('inside service -- ', forgotEmail)
       let formData = new FormData();
       formData.append('email', forgotEmail);
       return axios.post(API_URL + 'forgot_password', formData)
           .then(response => {
               return response.data;
           });

   }
}

const authService = new AuthService();
export default authService;
