<template>
  <v-container fluid class="pa-6">
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="text-h5 bg-primary">
        <p>แบบฟอร์มลงทะเบียน</p>
      </v-card-title>
      
      <v-card-text class="pa-6">
        <v-form ref="form">
          <!-- ชื่อ -->
           <p>ชื่อ</p>
          <v-text-field
            ref="firstField"
            v-model="formData.firstName"
            label="ชื่อ"
            outlined
            class="mb-4"
          />

          <!-- นามสกุล -->
          <v-text-field
            v-model="formData.lastName"
            label="นามสกุล"
            outlined
            class="mb-4"
          />

          <!-- อีเมล -->
          <v-text-field
            v-model="formData.email"
            label="อีเมล"
            type="email"
            outlined
            class="mb-4"
          />

          <!-- เบอร์โทรศัพท์ -->
          <v-text-field
            v-model="formData.phone"
            label="เบอร์โทรศัพท์"
            outlined
            class="mb-4"
          />

          <!-- ที่อยู่ -->
          <v-textarea
            v-model="formData.address"
            label="ที่อยู่"
            outlined
            rows="3"
            class="mb-4"
          />

          <!-- เพศ -->
          <v-select
            v-model="formData.gender"
            :items="genderOptions"
            label="เพศ"
            outlined
            class="mb-4"
          />

          <!-- วันเกิด -->
          <v-text-field
            v-model="formData.birthDate"
            label="วันเกิด"
            type="date"
            outlined
            class="mb-4"
          />

          <!-- Checkbox -->
          <v-checkbox
            v-model="formData.acceptTerms"
            label="ยอมรับข้อกำหนดและเงื่อนไข"
            class="mb-4"
          />

          <!-- ปุ่ม -->
          <div class="d-flex gap-3">
            <v-btn
              color="primary"
              @click="handleSubmit"
            >
              บันทึก
            </v-btn>
            
            <v-btn
              color="secondary"
              @click="handleReset"
            >
              ล้างข้อมูล
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const firstField = ref(null)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
  birthDate: '',
  acceptTerms: false
})

const genderOptions = ['ชาย', 'หญิง', 'ไม่ระบุ']
const submitted = ref(false)

const handleSubmit = () => {
  submitted.value = true
  console.log('Form Data:', formData.value)
}

const handleReset = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    birthDate: '',
    acceptTerms: false
  }
  submitted.value = false
}

const onLastFieldTab = (e) => {
  // ถ้ากด Tab (ไม่ใช่ Shift+Tab) ให้วนกลับไปที่ field แรก
  if (!e.shiftKey) {
    e.preventDefault()
    firstField.value?.focus()
  }
}
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>