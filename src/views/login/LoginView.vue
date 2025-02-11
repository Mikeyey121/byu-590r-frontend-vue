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
          label="Username"
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
            block
          >
            Login
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
  </div>
</template>

<script src="./LoginView.ts" />

<style src="./LoginView.scss" lang="scss" scoped />
