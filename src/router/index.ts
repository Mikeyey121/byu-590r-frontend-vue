import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import ProjectsView from '../views/projects/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Fix: Check if localStorage has user data
  const loggedIn = localStorage.getItem('user')
  
  // If the route requires auth and user is not logged in
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } 
  // Fix: Safely check state property (the issue is likely here)
  else if (to.name === 'login' && loggedIn && to.state && to.state.fromLogout) {
    // If coming from logout to login page
    next()
  }
  else if (to.name === 'login' && loggedIn) {
    // If logged in, don't allow going to login page
    next('/')
  } 
  else {
    next()
  }
})

export default router
