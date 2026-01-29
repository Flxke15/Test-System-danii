<template>
  <v-container class="fill-height d-flex align-self-center justify-center" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" class="text-center">
        <v-card class="glass-card pa-10" elevation="0">
          <v-icon size="64" color="blue-lighten-3" class="mb-4">
            mdi-star-shooting
          </v-icon>
          <h1 class="text-h2 font-weight-black text-white mb-4 hero-text">
            Comets System
          </h1>
          <v-form ref="formLogin">
            <v-row>
              <v-col cols="12">
                <TextField
                  v-model="dataLogin.username"
                  label="ผู้ใช้งาน"
                  placeholder="กรอกชื่อผู้ใช้งานของคุณ"
                  clearable
                  :rules="rules.required"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <TextField
                  v-model="dataLogin.password"
                  label="รหัสผ่าน"
                  placeholder="กรอกรหัสผ่านของคุณ"
                  :type="passwordType"
                  clearable
                  :append-inner-icon="eyeIcon"
                  @click:append-inner="watchPassword"
                  :rules="rules.required"
                />
              </v-col>
            </v-row>
          </v-form>
          <v-btn
            color="blue-darken-2"
            size="large"
            variant="flat"
            rounded="lg"
            class="px-8 mt-4"
            prepend-icon="mdi-login"
            @click="handleLogin"
          >
            เข้าสู่ระบบ
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loading'

import { alert } from '@/helpers/alert'
import { setAuth } from '@/helpers/auth'
import { rules } from '@/utils/rules'
import { apiAuth } from '@/services'

const router = useRouter()
const userStore = useUserStore()
const loadingStore = useLoadingStore()

const eyeIcon = computed(() => {
  return eye.value ? 'mdi-eye' : 'mdi-eye-off'
})
const passwordType = computed(() => {
  return eye.value ? 'text' : 'password'
})

const defaultLogin = {
  username: '',
  password: ''
}
const dataLogin = ref(structuredClone(defaultLogin))
const eye = ref(false)
const formLogin = ref(null)

const watchPassword = () => {
  eye.value = !eye.value
}

const handleLogin = async () => {
  const { valid } = await formLogin.value.validate()
  if (valid) {
    await onLogin()
  } else {
    alert({
      icon: 'warning',
      title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      text: 'โปรดตรวจสอบข้อมูลและลองใหม่อีกครั้ง',
      confirmButtonText: 'ปิด',
      showCancelButton: false
    })
  }
}

const onLogin = async () => {
  try {
    loadingStore.showLoading()
    const responseLogin = await apiAuth.login(dataLogin.value)
    
    // บันทึกสถานะ login ลง localStorage
    setAuth(responseLogin.data.user)
    userStore.setUser(responseLogin.data.user)
    
    router.push({ name: 'Home' })
  } catch (error) {
    alert({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: error.response?.data?.message || 'ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง',
      confirmButtonText: 'ปิด',
      showCancelButton: false
    })
  } finally {
    loadingStore.hideLoading()
  }
}
</script>

<style scoped>
.glassy-card {
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}

.glassy-btn {
  background: rgba(144, 21, 206, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>