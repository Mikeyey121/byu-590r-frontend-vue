import ProjectService from '../services/project.service'

export const project = {
  namespaced: true,
  state: {
    projects: [],
    projectManagers: [],
    loading: false,
    error: null
  },
  actions: {
    fetchProjects({ commit }) {
      commit('setLoading', true)
      return ProjectService.getProjects()
        .then(response => {
          const projects = response.data.success ? response.data.data : [];
          commit('setProjects', projects)
          commit('setLoading', false)
          return Promise.resolve(projects)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          return Promise.reject(error)
        })
    },
    
    fetchProjectManagers({ commit }) {
      return ProjectService.getProjectManagers()
        .then(response => {
          const managers = response.data.success ? response.data.data : [];
          commit('setProjectManagers', managers)
          return Promise.resolve(managers)
        })
        .catch(error => {
          commit('setError', error)
          return Promise.reject(error)
        })
    },
    
    createProject({ commit, dispatch }, projectData) {
      commit('setLoading', true)
      return ProjectService.createProject(projectData)
        .then(response => {
          commit('setLoading', false)
          dispatch('fetchProjects')
          return Promise.resolve(response.data.success ? response.data.data : null)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          return Promise.reject(error)
        })
    },
    
    updateProject({ commit, dispatch }, { projectId, projectData, newFile }) {
      commit('setLoading', true)
      return ProjectService.updateProject(projectId, projectData, newFile)
        .then(response => {
          commit('setLoading', false)
          dispatch('fetchProjects')
          return Promise.resolve(response.data.success ? response.data.data : null)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          return Promise.reject(error)
        })
    },
    
    deleteProject({ commit }, projectId) {
      return ProjectService.deleteProject(projectId)
        .then(response => {
          if (response.data.success) {
            commit('removeProject', projectId)
          }
          return Promise.resolve(response.data)
        })
        .catch(error => {
          commit('setError', error)
          return Promise.reject(error)
        })
    },
    
    removeProjectImage({ commit, dispatch }, { projectId, projectIndex }) {
      return ProjectService.removeProjectImage(projectId)
        .then(response => {
          if (response.data.success) {
            commit('updateProjectImage', { projectId, imageUrl: null })
          }
          return Promise.resolve(response.data.data)
        })
        .catch(error => {
          commit('setError', error)
          return Promise.reject(error)
        })
    }
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects
    },
    
    setProjectManagers(state, managers) {
      state.projectManagers = managers
    },
    
    setLoading(state, isLoading) {
      state.loading = isLoading
    },
    
    setError(state, error) {
      state.error = error
    },
    
    removeProject(state, projectId) {
      state.projects = state.projects.filter(p => p.projectId !== projectId)
    },
    
    updateProjectImage(state, { projectId, imageUrl }) {
      const index = state.projects.findIndex(p => p.projectId === projectId)
      if (index !== -1) {
        state.projects[index].projectFile = imageUrl
      }
    }
  }
} 