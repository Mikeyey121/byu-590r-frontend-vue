<script lang="ts">
import { RouterLink, RouterView } from "vue-router"
import LoginView from "./views/login/LoginView.vue"
import { mapState } from "vuex"
import { ref } from "vue"
export default {
   setup() {
       const theme = ref("dark")
       function changeTheme() {
           theme.value = theme.value === "light" ? "dark" : "light"
       }
       return { theme, changeTheme }
   },
   name: "App",
   components: {
       LoginView,
       RouterLink,
       RouterView
   },

   computed: mapState({
       authUser() {
           return this.$store.state.auth.user
       },
       isAuthenticated() {
           return (
               this.$store.state.auth.status.loggedIn &&
               this.authUser.token !== undefined
           )
       },
       title() {
           return "Welcome " + this.authUser.name + "!"
       }
   }),

   methods: {
       logout() {
           this.$store.dispatch("auth/logout")
           this.$router.push({ 
               name: 'login',
               query: { fromLogout: 'true' }
           })
       },
       checkAuth(auth) {
           console.log("Authenticated!", auth)
       },
       getCurrentUser() {
        this.profile.name = this.authUser.name;

        this.profile.title = this.title;
        this.$store.dispatch("user/getUser").then(
        (response) => {
            if (response.avatar) {
                this.$store.commit("auth/uploadAvatarSuccess", response.avatar);
                this.$store.commit("user/setAvatar", response.avatar);
            }
            if (!response.email_verified_at) {
                this.showEmailNotVerifiedDialog = true;
            }
            }
        )
        },
        removeAvatar() {
            this.profileIsUploading = true;
            this.$store.dispatch("user/removeAvatar").then(
            (response) => {
                this.$store.commit("auth/uploadAvatarSuccess", null);
                this.$store.commit("user/setAvatar", null);
                this.profileIsUploading = false;
            },

            ).catch((error) => {
                console.log(error);
                alert('Error. Try again');
                this.profileIsUploading = false;
            });
        },
        onAvatarChange(e) {
            var image = e.target.files || e.dataTransfer.files;

            if (!image.length)
                return;
            this.profileIsUploading = true;
            this.$store.dispatch("user/uploadAvatar", image[0]).then(
                (response) => {
                    // Update both auth and user modules
                    this.$store.commit("auth/uploadAvatarSuccess", response.avatar);
                    this.$store.commit("user/setAvatar", response.avatar);
                    this.profileIsUploading = false;
                },
            ).catch((error) => {
                console.log(error);
                alert('Error. Try again');
                this.profileIsUploading = false;
            });
        }
    },

   data: function () {
    return {
        profileDialog: false,
        profileIsUploading: false,
        verificationEmailLoading: false,
        showEmailNotVerifiedDialog: false,
        showChangeEmailTextField: false,
        changeEmail: false,
        successVerificationMessage: '',
        changeEmailRules: [
            value => !!value || 'Required.',
            value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        profile:
        {
            avatar: null,
            name: '',
            title: '',
            icon: 'mdi-account-circle',
            color: 'info'
        },
            profilePictureImage: '',
            emailOfVerification: ''
        }
    },
    
    watch: {
        '$store.state.auth.status.loggedIn': {
            handler(newValue) {
                if (newValue === true) {
                    this.getCurrentUser();
                }
            },
            immediate: true
        }
    },
    
    mounted() {
        if (this.$store.state.auth.status.loggedIn) {
            this.getCurrentUser();
        }
    },
    
    created() {
        if (this.authUser) {
            this.getCurrentUser();
        }
    },
    
    updated() {
        if (this.isAuthenticated) {
            this.$router.push({ name: "home" })
        }
    }
}
</script>
<template>
   <v-app :theme="theme">
       <v-app-bar color="grey-darken-4" density="compact">
           <v-app-bar-title><v-chip
               v-if="isAuthenticated"
               color="blue-darken-1"
               class="ml-4 mr-4"
               prepend-icon="mdi-hand-wave"
           >
               Welcome, {{ authUser.name }}!
           </v-chip></v-app-bar-title>
           
           <v-spacer></v-spacer>
           <v-btn v-if="isAuthenticated" to="/" default>Home</v-btn>
           <v-btn v-if="isAuthenticated" to="/projects" default>Projects</v-btn>
           <!-- Avatar Menu -->
           <v-menu v-if="isAuthenticated" offset-y>
             <template v-slot:activator="{ props }">
               <v-btn v-bind="props" icon class="mr-2">
                 <v-avatar v-if="authUser.avatar" size="36">
                   <v-img :src="authUser.avatar" alt="Avatar"></v-img>
                 </v-avatar>
                 <v-avatar v-else size="36" color="blue-darken-1">
                   <span class="text-white text-h6">👤</span>
                 </v-avatar>
               </v-btn>
             </template>
             
             <v-card min-width="300" class="bg-grey-darken-3 text-grey-lighten-2">
               <v-card-title class="d-flex align-center pa-4">
                 <v-avatar size="40" class="mr-3" :color="authUser.avatar ? undefined : 'blue-darken-1'">
                   <v-img v-if="authUser.avatar" :src="authUser.avatar" alt="Avatar"></v-img>
                   <span v-else class="text-white text-h6">👤</span>
                 </v-avatar>
                 <div>
                   <div class="text-h6">{{ authUser.name }}</div>
                   <div class="text-subtitle-2 text-grey-lighten-1">{{ authUser.email }}</div>
                 </div>
               </v-card-title>
               
               <v-divider class="bg-grey-darken-1"></v-divider>
               
               <v-card-text class="pa-4">
                 <v-file-input 
                   label="Upload new avatar" 
                   prepend-icon="mdi-camera"
                   @change="onAvatarChange"
                   accept="image/*"
                   hide-details
                   variant="outlined"
                   density="comfortable"
                   bg-color="grey-darken-2"
                   class="mb-4"
                   color="grey-lighten-2"
                 ></v-file-input>
                 
                 <div class="d-flex gap-2">
                   <v-btn 
                     color="grey-darken-1" 
                     variant="tonal" 
                     block 
                     @click="removeAvatar"
                     :loading="profileIsUploading"
                     prepend-icon="mdi-delete"
                     class="flex-grow-1"
                   >
                     Remove
                   </v-btn>
                   
                   <v-btn 
                     color="grey-lighten-2" 
                     variant="tonal" 
                     block 
                     @click="profileDialog = true"
                     prepend-icon="mdi-account-edit"
                     class="flex-grow-1"
                   >
                     Edit Profile
                   </v-btn>
                 </div>
               </v-card-text>
             </v-card>
           </v-menu>

           
           <v-btn v-if="isAuthenticated" @click="logout()">Logout</v-btn>
       </v-app-bar>

       <v-main class="fill-height">
           <div v-if="isAuthenticated" class="h-100 w-100">
               <RouterView />
           </div>
           <LoginView
               v-else
               class="h-100 w-100"
               :is-authenticated="isAuthenticated"
               @authenticate="checkAuth($event)"
           />
       </v-main>
   </v-app>
</template>

<style>
/* Add your global styles here */
.fill-height {
  height: 100%;
}

.h-100 {
  height: 100%;
}

.w-100 {
  width: 100%;
}
</style>




