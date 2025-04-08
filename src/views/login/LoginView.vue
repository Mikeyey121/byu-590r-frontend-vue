<template>
  <div class="login-container">
    <v-card class="login-card">
      <v-card-title class="text-h4 mb-4">Login</v-card-title>
      
      <v-form
        ref="form"
        v-model="isFormValid"
        @submit.prevent="submitLogin"
      >
        <v-text-field
          v-model="username"
          label="Email"
          :rules="usernameRules"
          required
        />
        
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          :rules="passwordRules"
          required
        />

        <div class="button-container">
          <v-btn 
            type="submit"
            color="primary"
            :disabled="!isFormValid"
            :loading="isLoading"
            @click="submitLogin()"
            block
          >
            Login
          </v-btn>

          <v-btn 
            type="submit"
            color="primary"
            @click="showRegisterForm = true"
            block
          >
            Register
          </v-btn>
          
          <v-btn
            variant="text"
            @click="showForgotPassword = true"
            block
          >
            Forgot Password?
          </v-btn>
        </div>

        <v-alert
          v-if="errorMessage"
          :type="alertType"
          :text="errorMessage"
          class="mt-4"
        />
      </v-form>
    </v-card>

    <v-dialog v-model="showForgotPassword" max-width="500px">
      <v-card>
        <v-card-title>Reset Password</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="resetEmail"
            label="Email"
            type="email"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showForgotPassword = false">Cancel</v-btn>
          <v-btn color="primary">Reset Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showRegisterForm" max-width="500px">
      <v-card>
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-form v-model="isRegisterFormValid" @submit.prevent="submitRegister">
            <v-text-field
              v-model="register.name"
              label="Full Name"
              :rules="nameRules"
              required
            />
            <v-text-field
              v-model="register.email"
              label="Email"
              type="email"
              :rules="emailRules"
              required
            />
            <v-text-field
              v-model="register.password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
            />
            <v-text-field
              v-model="register.c_password"
              label="Confirm Password"
              type="password"
              :rules="confirmPasswordRules"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="cancelRegister">Cancel</v-btn>
          <v-btn 
            color="primary" 
            :disabled="!isRegisterFormValid" 
            :loading="registerFormIsLoading" 
            @click="submitRegister"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>




  </div>
</template>

<script src="./LoginView.ts" />

<style src="./LoginView.scss" lang="scss" scoped />
