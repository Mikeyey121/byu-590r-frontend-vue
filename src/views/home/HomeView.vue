<template>
  <div class="home">
    <!-- Hero Section - Simplified, Darker -->
    <v-container fluid class="hero-section py-16">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-h2 font-weight-light mb-6">Construction Management</h1>
          <p class="text-subtitle-1 mb-12 mx-auto" style="max-width: 800px; line-height: 1.7;">
            A streamlined platform for managing construction projects, teams, and tasks.
            Built for professionals who value efficiency and clarity.
          </p>
          <v-btn 
            to="/projects" 
            color="primary"
            variant="elevated"
            size="large"
            class="text-none px-8"
          >
            View Projects
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Features - Clean, Minimal -->
    <v-container class="py-16">
      <v-row justify="center" class="mb-12">
        <v-col cols="12" md="8" class="text-center">
          <h2 class="text-h4 font-weight-light mb-3">Simplified Project Management</h2>
          <p class="text-subtitle-1">Every tool you need, nothing you don't.</p>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="feature-card" flat>
            <v-card-text class="py-6">
              <v-icon icon="mdi-office-building" size="x-large" color="primary" class="mb-4"></v-icon>
              <h3 class="text-h6 mb-3">Project Tracking</h3>
              <p class="text-body-1 text-medium-emphasis">
                Monitor construction projects from initial planning to completion. Track budgets, 
                timelines, and resources with a clean, distraction-free interface.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="feature-card" flat>
            <v-card-text class="py-6">
              <v-icon icon="mdi-account-group" size="x-large" color="primary" class="mb-4"></v-icon>
              <h3 class="text-h6 mb-3">Team Coordination</h3>
              <p class="text-body-1 text-medium-emphasis">
                Assign project managers and team members to specific projects. Maintain clear lines of 
                communication and responsibility throughout your organization.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="feature-card" flat>
            <v-card-text class="py-6">
              <v-icon icon="mdi-checkbox-marked-outline" size="x-large" color="primary" class="mb-4"></v-icon>
              <h3 class="text-h6 mb-3">Task Management</h3>
              <p class="text-body-1 text-medium-emphasis">
                Break down complex projects into manageable subtasks. Monitor progress 
                and ensure nothing falls through the cracks.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Workflow - Minimalistic -->
    <v-container fluid class="workflow-section py-16">
      <v-container>
        <v-row justify="center" class="mb-12">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h4 font-weight-light mb-3">Simple Workflow</h2>
            <p class="text-subtitle-1">From project creation to successful delivery</p>
          </v-col>
        </v-row>
        
        <v-row justify="center">
          <v-col cols="12" md="10">
            <v-card flat class="workflow-card pa-6">
              <v-row>
                <v-col cols="12" md="3" class="text-center py-4">
                  <div class="workflow-step">
                    <div class="step-number mb-4">1</div>
                    <h3 class="text-h6 mb-2">Create</h3>
                    <p class="text-body-2 text-medium-emphasis">Set up projects with budgets, timelines and managers</p>
                  </div>
                </v-col>
                
                <v-col cols="12" md="3" class="text-center py-4">
                  <div class="workflow-step">
                    <div class="step-number mb-4">2</div>
                    <h3 class="text-h6 mb-2">Assign</h3>
                    <p class="text-body-2 text-medium-emphasis">Delegate tasks to team members with clear responsibilities</p>
                  </div>
                </v-col>
                
                <v-col cols="12" md="3" class="text-center py-4">
                  <div class="workflow-step">
                    <div class="step-number mb-4">3</div>
                    <h3 class="text-h6 mb-2">Track</h3>
                    <p class="text-body-2 text-medium-emphasis">Monitor progress with real-time updates and reporting</p>
                  </div>
                </v-col>
                
                <v-col cols="12" md="3" class="text-center py-4">
                  <div class="workflow-step">
                    <div class="step-number success mb-4">✓</div>
                    <h3 class="text-h6 mb-2">Deliver</h3>
                    <p class="text-body-2 text-medium-emphasis">Complete projects on time and within budget</p>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    
    <!-- Call to Action - Subtle -->
    <v-container class="py-16 text-center">
      <h2 class="text-h3 font-weight-light mb-6">Ready to start?</h2>
      <p class="text-subtitle-1 mb-12 mx-auto" style="max-width: 600px;">
        Streamline your construction management process with our intuitive platform.
      </p>
      <v-btn 
        to="/projects" 
        color="primary"
        variant="elevated"
        size="large"
        class="text-none px-8"
      >
        View Projects
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.hero-section {
  background-color: rgba(30, 30, 30, 0.7);
}

.workflow-section {
  background-color: rgba(30, 30, 30, 0.4);
}

.feature-card {
  height: 100%;
  border-left: 2px solid transparent;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-left: 2px solid var(--v-primary-base);
  background-color: rgba(30, 30, 30, 0.4);
}

.workflow-card {
  background-color: rgba(40, 40, 40, 0.6);
  border-radius: 8px;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-primary));
  font-size: 1.5rem;
  font-weight: bold;
}

.step-number.success {
  background-color: rgba(var(--v-theme-success), 0.15);
  color: rgb(var(--v-theme-success));
}

.workflow-step {
  padding: 1rem;
  transition: all 0.3s ease;
}

.workflow-step:hover {
  transform: translateY(-5px);
}
</style>