import Axios from 'axios'
import { clearAuth } from '@/helpers/auth'

const axios = Axios.create({
  responseType: 'json',
  timeout: 60000,
  withCredentials: true // สำคัญ! ส่ง cookie ไปกับทุก request
})

axios.interceptors.request.use(
  (config) => {
    // ไม่ต้องส่ง token ใน header แล้ว เพราะใช้ cookie แทน
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - ดักจับ 401 แล้ว logout อัตโนมัติ
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // เช็คว่าอยู่หน้า Login แล้วหรือยัง ป้องกัน infinite loop
      if (!window.location.pathname.includes('/Login')) {
        clearAuth() // ล้าง localStorage
        window.location.href = '/web/Login' // redirect ไป login
      }
    }
    return Promise.reject(error)
  }
)

export { axios }