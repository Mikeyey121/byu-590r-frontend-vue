<template>
    <v-container>
      <div class="d-flex justify-space-between align-center mb-6">
        <h1 class="text-h4">Projects</h1>
        <v-btn 
          color="primary"
          prepend-icon="mdi-plus"
          @click="showCreateModal = true"
        >
          Create New Project
        </v-btn>
      </div>
      
      <v-table class="elevation-1">
        <tbody>
          <tr v-for="project in projects" :key="project.projectId">
            <td class="pa-4" width="100%">
              <v-card class="h-100" elevation="3">
                <div class="d-flex flex-row">
                  <!-- Image Section -->
                  <v-img
                    :src="project.projectFile"
                    height="200"
                    width="200"
                    cover
                    :alt="project.projectName"
                    class="flex-shrink-0"
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                  
                  <!-- Content Section -->
                  <div class="d-flex flex-column flex-grow-1 pa-4">
                    <v-card-title class="pa-0 mb-4">{{ project.projectName }}</v-card-title>
                    
                    <v-card-text class="pa-0">
                      <v-list-item class="px-0 py-1">
                        <template v-slot:prepend>
                          <v-avatar color="primary" class="mr-3" size="36">
                            <v-icon icon="mdi-account"></v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title>Manager</v-list-item-title>
                        <v-list-item-subtitle>{{ project.project_manager?.managerName }}</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item class="px-0 py-1">
                        <template v-slot:prepend>
                          <v-avatar color="primary" class="mr-3" size="36">
                            <v-icon icon="mdi-account"></v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title>Genre</v-list-item-title>
                        <v-list-item-subtitle>{{ getGenreName(project.genreId) }}</v-list-item-subtitle>
                      </v-list-item>
                      
                      <v-list-item class="px-0 py-1">
                        <template v-slot:prepend>
                          <v-avatar color="secondary" class="mr-3" size="36">
                            <v-icon icon="mdi-calendar"></v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title>Start Date</v-list-item-title>
                        <v-list-item-subtitle>{{ formatDate(project.projectStartDate) }}</v-list-item-subtitle>
                      </v-list-item>
                      
                      <v-list-item class="px-0 py-1">
                        <template v-slot:prepend>
                          <v-avatar color="success" class="mr-3" size="36">
                            <v-icon icon="mdi-currency-usd"></v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title>Budget</v-list-item-title>
                        <v-list-item-subtitle>${{ formatBudget(project.projectBudget) }}</v-list-item-subtitle>
                      </v-list-item>
                    </v-card-text>
                    
                    <v-spacer></v-spacer>
                    
                    <v-card-actions class="pa-0 mt-2">
                      <v-btn color="primary" variant="text">Details</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn 
                        icon="mdi-pencil" 
                        variant="text" 
                        color="info" 
                        title="Edit"
                        @click="openEditModal(project)"
                      ></v-btn>
                      <v-btn 
                        icon="mdi-delete" 
                        variant="text" 
                        color="error" 
                        title="Delete"
                        @click="confirmDelete(project)"
                      ></v-btn>
                    </v-card-actions>
                  </div>
                </div>
              </v-card>
            </td>
          </tr>
        </tbody>
      </v-table>
  
      <v-dialog v-model="showCreateModal" width="500">
        <v-card>
          <v-card-title>Create New Project</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="createProject">
              <v-text-field
                v-model="newProject.projectName"
                label="Project Name"
                :rules="[v => !!v || 'Project name is required']"
                required
              />
  
              <v-text-field
                v-model="newProject.projectStartDate"
                label="Start Date"
                type="date"
                :rules="[v => !!v || 'Start date is required']"
                required
              />
  
              <v-text-field
                v-model="newProject.projectBudget"
                label="Budget"
                type="number"
                prefix="$"
                step="0.01"
                :rules="[v => !!v || 'Budget is required']"
                required
              />
  
              <v-select
                v-model="newProject.managerId"
                :items="projectManagers.map(manager => ({
                  value: manager.managerId,
                  title: manager.managerName
                }))"
                label="Project Manager"
                :rules="[v => !!v || 'Project manager is required']"
                required
              />

              <v-select
                v-model="newProject.genreId"
                :items="genres.map(genre => ({
                  value: genre.genreId,
                  title: genre.genreName
                }))"
                label="Genre"
                :rules="[v => !!v || 'Genre is required']"
                required
              />
  
              <v-file-input
                v-model="newProject.projectFile"
                label="Project Image"
                accept="image/*"
                :rules="[v => !!v || 'Project image is required']"
                show-size
                prepend-icon="mdi-camera"
                required
              />
            </v-form>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="grey-darken-1"
              variant="text"
              @click="showCreateModal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              :loading="isLoading"
              @click="validateAndSubmit"
            >
              Create Project
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Edit Project Modal -->
      <v-dialog v-model="showEditModal" width="500">
        <v-card>
          <v-card-title>Edit Project</v-card-title>
          <v-card-text>
            <v-form ref="editForm" @submit.prevent="updateProject">
              <v-text-field
                v-model="editingProject.projectName"
                label="Project Name"
                :rules="[v => !!v || 'Project name is required']"
                required
              />

              <v-text-field
                v-model="editingProject.projectStartDate"
                label="Start Date"
                type="date"
                :rules="[v => !!v || 'Start date is required']"
                required
              />

              <v-text-field
                v-model="editingProject.projectBudget"
                label="Budget"
                type="number"
                prefix="$"
                step="0.01"
                :rules="[v => !!v || 'Budget is required']"
                required
              />

              <v-select
                v-model="editingProject.managerId"
                :items="projectManagers.map(manager => ({
                  value: manager.managerId,
                  title: manager.managerName
                }))"
                label="Project Manager"
                :rules="[v => !!v || 'Project manager is required']"
                required
              />

              <v-select
                v-model="editingProject.genreId"
                :items="genres.map(genre => ({
                  value: genre.genreId,
                  title: genre.genreName
                }))"
                label="Genre"
                :rules="[v => !!v || 'Genre is required']"
                required
              />

              <div v-if="editingProject.projectFile" class="mb-4">
                <div class="text-subtitle-1 mb-2">Current Image:</div>
                <v-img
                  :src="typeof editingProject.projectFile === 'string' ? editingProject.projectFile : ''"
                  height="120"
                  width="120"
                  cover
                  class="rounded mb-2"
                ></v-img>
                <v-btn 
                  size="small" 
                  color="error" 
                  variant="text" 
                  @click="removeProjectImage"
                  :loading="isRemoving"
                  prepend-icon="mdi-delete"
                >
                  Remove Image
                </v-btn>
              </div>

              <v-file-input
                v-model="newProjectFile"
                label="Replace Project Image"
                accept="image/*"
                show-size
                prepend-icon="mdi-camera"
                :disabled="isRemoving"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="grey-darken-1"
              variant="text"
              @click="showEditModal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              :loading="isLoading"
              @click="validateAndUpdate"
            >
              Update Project
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="showDeleteDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">
            Confirm Delete
          </v-card-title>
          <v-card-text>
            Are you sure you want to delete the project "{{ projectToDelete?.projectName }}"? This action cannot be undone.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="grey-darken-1"
              variant="text"
              @click="showDeleteDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="error"
              variant="text"
              @click="deleteProject"
              :loading="isLoading"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  
  const store = useStore()
  const projects = computed(() => store.state.project.projects)
  const projectManagers = computed(() => store.state.project.projectManagers)
  const genres = computed(() => store.state.project.genres)
  const showCreateModal = ref(false)
  const showEditModal = ref(false)
  const showDeleteDialog = ref(false)
  const isLoading = computed(() => store.state.project.loading)
  const isRemoving = ref(false)
  
  const newProject = ref({
    projectName: '',
    projectStartDate: '',
    projectBudget: '',
    managerId: '',
    genreId: '',
    projectFile: null
  })
  
  const editingProject = ref({
    projectId: null,
    projectName: '',
    projectStartDate: '',
    projectBudget: '',
    managerId: '',
    genreId: '',
    projectFile: null
  })
  
  const projectToDelete = ref(null)
  const newProjectFile = ref(null)
  
  const form = ref(null)
  const editForm = ref(null)
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }
  
  const formatBudget = (budget) => {
    return Number(budget).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
  
  const getGenreName = (genreId) => {
    if (!genreId) return 'N/A';
    const genre = genres.value.find(g => g.genreId === genreId);
    return genre ? genre.genreName : 'Unknown';
  }
  
  const openEditModal = (project) => {
    editingProject.value = {
      projectId: project.projectId,
      projectName: project.projectName,
      projectStartDate: project.projectStartDate,
      projectBudget: project.projectBudget,
      managerId: project.managerId,
      genreId: project.genreId,
      projectFile: project.projectFile
    }
    newProjectFile.value = null
    showEditModal.value = true
  }
  
  const confirmDelete = (project) => {
    projectToDelete.value = project
    showDeleteDialog.value = true
  }
  
  const validateAndSubmit = async () => {
    const { valid } = await form.value.validate()
    
    if (valid) {
      await createProject()
    }
  }
  
  const validateAndUpdate = async () => {
    const { valid } = await editForm.value.validate()
    
    if (valid) {
      await updateProject()
    }
  }
  
  const createProject = async () => {
    try {
      isLoading.value = true
      const response = await store.dispatch('project/createProject', newProject.value)
      console.log('Create project response:', response)
      showCreateModal.value = false
      newProject.value = {
        projectName: '',
        projectStartDate: '',
        projectBudget: '',
        managerId: '',
        genreId: '',
        projectFile: null
      }
    } catch (error) {
      console.error('Error creating project:', error)
      if (error.response) {
        console.error('Server responded with:', error.response.data)
      }
      alert('Failed to create project. Please try again.')
    } finally {
      isLoading.value = false
    }
  }
  
  const updateProject = async () => {
    try {
      isLoading.value = true
      const response = await store.dispatch('project/updateProject', {
        projectId: editingProject.value.projectId,
        projectData: editingProject.value,
        newFile: newProjectFile.value
      })
      console.log('Update project response:', response)
      showEditModal.value = false
    } catch (error) {
      console.error('Error updating project:', error)
      if (error.response) {
        console.error('Full server error message:', error.response.data.message)
        console.error('Server response data:', error.response.data)
      }
      alert('Failed to update project. Please try again.')
    } finally {
      isLoading.value = false
    }
  }
  
  const removeProjectImage = async () => {
    isRemoving.value = true
    try {
      const projectId = editingProject.value.projectId
      const projectIndex = projects.value.findIndex(p => p.projectId === projectId)
      
      const response = await store.dispatch('project/removeProjectImage', {
        projectId,
        projectIndex
      })
      
      console.log('Remove project image response:', response)
      editingProject.value.projectFile = null
    } catch (error) {
      console.error('Error removing project image:', error)
      if (error.response) {
        console.error('Server responded with:', error.response.data)
      }
      alert('Failed to remove project image. Please try again.')
    } finally {
      isRemoving.value = false
    }
  }
  
  const deleteProject = async () => {
    try {
      isLoading.value = true
      const response = await store.dispatch('project/deleteProject', projectToDelete.value.projectId)
      console.log('Delete project response:', response)
      showDeleteDialog.value = false
      projectToDelete.value = null
    } catch (error) {
      console.error('Error deleting project:', error)
      if (error.response) {
        console.error('Server responded with:', error.response.data)
      }
      alert('Failed to delete project. Please try again.')
    } finally {
      isLoading.value = false
    }
  }
  
  onMounted(() => {
    store.dispatch('project/fetchProjects')
    store.dispatch('project/fetchProjectManagers')
    store.dispatch('project/fetchGenres')
  })
  </script>
  
  <style>
  .h-100 {
    height: 100%;
  }
  </style>
  