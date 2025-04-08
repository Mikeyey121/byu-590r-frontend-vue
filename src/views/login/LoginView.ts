export default {
    name: 'LoginView',
    emits: ['authenticate'],
    data: function () {
        return {
            isAuthenticated: false,
            username: '',
            password: '',
            resetEmail: '',
            isFormValid: false,
            isLoading: false,
            showForgotPassword: false,
            showRegisterForm: false,
            errorMessage: '',
            alertType: '',
            register: {
                name: '',
                email: '',
                password: '',
                c_password: ''
            },
            isRegisterFormValid: false,
            registerFormIsLoading: false,
            usernameRules: [
                (v: string) => !!v || 'Username is required'
            ],
            passwordRules: [
                (v: string) => !!v || 'Password is required',
                (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
                (v: string) => /\d/.test(v) || 'Password must contain at least one number',
                (v: string) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter'
            ],
            nameRules: [
                (v: string) => !!v || 'Full name is required'
            ],
            emailRules: [
                (v: string) => !!v || 'Email is required',
                (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
            ],
            confirmPasswordRules: [
                (v: string) => !!v || 'Please confirm your password',
                (v: string) => v === this.register.password || 'Passwords must match'
            ]
        }
    },
    methods: {


        submitLogin() {
            if (!this.isFormValid) {
                return;
            }
            
            const user = {
                email: this.username,
                password: this.password
            }
            
            console.log('Sending login data:', user);
            
            this.errorMessage = '';
            this.alertType = '';
            this.isLoading = true;
            
            this.$store.dispatch("auth/login", user).then(
                (response) => {
                    console.log('Login successful:', response);
                    this.alertType = 'success';
                    this.errorMessage = 'Login successful!';
                    
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                },
                (error) => {
                    this.isLoading = false;
                    console.error('Login error:', error);
                    
                    this.alertType = 'error';
                    this.errorMessage = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },

        submitRegister() {
            if (!this.isRegisterFormValid) {
                return;
            }
         
            const register = {
                name: this.register.name,
                email: this.register.email,
                password: this.register.password,
                c_password: this.register.c_password
            }
            
            console.log('Sending registration data:', register);
         
            this.registerFormIsLoading = true;
            this.$store.dispatch("auth/register", register).then(
                () => {
                    alert('Registration successful!');
                    this.registerFormIsLoading = false;
                    this.showRegisterForm = false;
                },
                (error) => {
                    this.registerFormIsLoading = false;
                    console.error('Full error object:', error);
                    
                    if (error.response) {
                        console.error('Response status:', error.response.status);
                        console.error('Response data:', error.response.data);
                        
                        // Handle validation errors specifically
                        if (error.response.data && error.response.data.data) {
                            const validationErrors = error.response.data.data;
                            let errorMessage = 'Validation errors:\n';
                            
                            // Loop through all validation errors
                            Object.keys(validationErrors).forEach(field => {
                                errorMessage += `- ${validationErrors[field].join('\n- ')}\n`;
                            });
                            
                            alert(errorMessage);
                        } else {
                            alert('Registration error: ' + (error.response.data.message || 'Server error'));
                        }
                    } else {
                        alert('Registration error: ' + error.message);
                    }
                }
            );
        },
        
        cancelRegister() {
            this.showRegisterForm = false;
            this.register = {
                name: '',
                email: '',
                password: '',
                c_password: ''
            };
        }
    }
}