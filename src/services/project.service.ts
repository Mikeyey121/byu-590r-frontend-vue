import api from '@/api'

class ProjectService {
  getProjects() {
    return api.get('/api/projects')
  }

  getProjectManagers() {
    return api.get('/api/project-managers')
  }

  createProject(projectData) {
    const formData = new FormData()
    formData.append('projectName', projectData.projectName.trim())
    formData.append('projectStartDate', projectData.projectStartDate)
    formData.append('projectBudget', projectData.projectBudget)
    formData.append('managerId', projectData.managerId)
    
    if (projectData.projectFile) {
      const fileInput = Array.isArray(projectData.projectFile) 
        ? projectData.projectFile[0]
        : projectData.projectFile
        
      if (fileInput) {
        formData.append('projectFile', fileInput)
      }
    }

    return api.post('/api/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  updateProject(projectId, projectData, newFile = null) {
    const formData = new FormData()
    formData.append('projectName', projectData.projectName.trim())
    formData.append('projectStartDate', projectData.projectStartDate)
    formData.append('projectBudget', Number(projectData.projectBudget).toString())
    formData.append('managerId', projectData.managerId)
    
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
    return api.post('/api/projects/' + projectId, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  deleteProject(projectId) {
    return api.delete('/api/projects/' + projectId)
  }

  removeProjectImage(projectId) {
    return api.delete('/api/projects/' + projectId + '/image')
      .then(response => {
        return response.data.success ? response.data.data : null;
      });
  }
}

export default new ProjectService() 