import api from '@/api'
import axios from 'axios';
import API_URL from './env';
import authHeader from './auth-header';
class ProjectService {
  getProjects() {
    return axios.get(API_URL + 'projects',
      { headers: authHeader() })
      .then(response => {
          return response.data.data;
      });
  }

  getProjectManagers() {
    return axios.get(API_URL + 'project-managers',
      { headers: authHeader() })
      .then(response => {
          return response.data.data;
      });
  }

  getGenres() {
    return axios.get(API_URL + 'genres',
      { headers: authHeader() })
      .then(response => {
          return response.data.data;
      });
  }

  createProject(projectData) {
    const formData = new FormData()
    formData.append('projectName', projectData.projectName.trim())
    formData.append('projectStartDate', projectData.projectStartDate)
    formData.append('projectBudget', projectData.projectBudget)
    formData.append('managerId', projectData.managerId)
    formData.append('genreId', projectData.genreId)
    
    if (projectData.projectFile) {
      const fileInput = Array.isArray(projectData.projectFile) 
        ? projectData.projectFile[0]
        : projectData.projectFile
        
      if (fileInput) {
        formData.append('projectFile', fileInput)
      }
    }

    return axios.post(API_URL + 'projects', formData,
      { headers: authHeader('multipart') })
  }

  updateProject(projectId, projectData, newFile = null) {
    const formData = new FormData()
    formData.append('projectName', projectData.projectName.trim())
    formData.append('projectStartDate', projectData.projectStartDate)
    formData.append('projectBudget', Number(projectData.projectBudget).toString())
    formData.append('managerId', projectData.managerId)
    formData.append('genreId', projectData.genreId)
    // Only append file if a new one was selected
    if (newFile) {
      const fileInput = Array.isArray(newFile) 
        ? newFile[0]
        : newFile
        
      if (fileInput) {
        formData.append('projectFile', fileInput)
      }
    }
    
    formData.append('_method', 'PUT')
    return axios.post(API_URL + 'projects/' + projectId, formData,
      { headers: authHeader('multipart') })
  }

  deleteProject(projectId) {
    return axios.delete(API_URL + 'projects/' + projectId,
      { headers: authHeader() })
  }

  removeProjectImage(projectId) {
    return axios.delete(API_URL + 'projects/' + projectId + '/image',
      { headers: authHeader() })
      .then(response => {
        return response.data.success ? response.data.data : null;
      });
  }
}

export default new ProjectService() 