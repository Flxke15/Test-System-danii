// Helper function สำหรับเช็ค Authentication
// หมายเหตุ: cookie httpOnly อ่านจาก JS ไม่ได้ ดังนั้นใช้ localStorage เก็บ session info

const AUTH_KEY = 'comet_auth'

// เช็คว่า login อยู่หรือไม่
export const isAuthenticated = () => {
  const auth = localStorage.getItem(AUTH_KEY)
  if (!auth) return false
  
  try {
    const { expiresAt } = JSON.parse(auth)
    // เช็คว่าหมดอายุหรือยัง
    if (expiresAt && Date.now() > expiresAt) {
      clearAuth()
      return false
    }
    return true
  } catch {
    return false
  }
}

// บันทึกสถานะ login (เรียกหลัง login สำเร็จ)
export const setAuth = (user, expiresInMs = 24 * 60 * 60 * 1000) => {
  const auth = {
    user,
    expiresAt: Date.now() + expiresInMs
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth))
}

// ล้างสถานะ login (เรียกตอน logout)
export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY)
}

// ดึงข้อมูล user
export const getUser = () => {
  const auth = localStorage.getItem(AUTH_KEY)
  if (!auth) return null
  
  try {
    const { user } = JSON.parse(auth)
    return user
  } catch {
    return null
  }
}
