import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import { isAuthenticated } from '@/helpers/auth'

const router = createRouter({
  history: createWebHistory('/web'),
  routes: routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = isAuthenticated()
  
  // ถ้าไปหน้า Login แต่ login แล้ว → redirect ไป Home
  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  }
  // ถ้าไปหน้าอื่นที่ต้อง auth แต่ยังไม่ login → redirect ไป Login
  else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  }
  else {
    next()
  }
})

export default router
