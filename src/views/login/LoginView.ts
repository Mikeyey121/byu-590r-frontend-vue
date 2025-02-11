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
            errorMessage: '',
            alertType: '',
            usernameRules: [
                (v: string) => !!v || 'Username is required'
            ],
            passwordRules: [
                (v: string) => !!v || 'Password is required',
                (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
                (v: string) => /\d/.test(v) || 'Password must contain at least one number',
                (v: string) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter'
            ]
        }
    },
    methods: {
        async submitLogin() {
            const { valid } = await this.$refs.form.validate();
            
            if (!valid) return;

            if (this.username === this.password) {
                this.errorMessage = 'Your username and password cannot be the same';
                this.alertType = 'warning';
                return;
            }

            if (this.password === 'Password123') {
                this.alertType = 'success';
                this.errorMessage = 'Success!';
                this.isLoading = true;
                
                setTimeout(() => {
                    this.isAuthenticated = true;
                    this.$emit('authenticate', this.isAuthenticated);
                }, 3000);
            } else {
                this.errorMessage = 'Login Failed';
                this.alertType = 'error';
            }
        }
    }
}