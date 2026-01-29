<template>
  <v-main v-if="route.name != 'Login'">
    <Navigation />
    <v-container class="pa-8" fluid>
      <router-view />
    </v-container>
    <AppFooter />
  </v-main>
  <v-main v-else>
    <div class="stars-container">
      <div
        v-for="(star, index) in staticStars"
        :key="'static-' + index"
        class="static-star"
        :style="{
          top: star.top,
          left: star.left,
          width: star.size,
          height: star.size,
          '--twinkle-duration': star.duration,
          animationDelay: star.delay,
        }"
      ></div>
    </div>
    <div class="night">
      <div
        v-for="n in 15"
        :key="n"
        class="shooting-star"
        :style="getStarStyle()"
      ></div>
    </div>
    <router-view />
    <AppFooter />
  </v-main>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// สร้างข้อมูลดาวนิ่ง 150 ดวง
const staticStars = Array.from({ length: 150 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 2 + 1}px`,
  duration: `${Math.random() * 3 + 2}s`,
  delay: `${Math.random() * 5}s`,
}));

const getStarStyle = () => {
  const top = Math.floor(Math.random() * 100); // ตำแหน่งแนวตั้ง
  const left = Math.floor(Math.random() * 100); // ตำแหน่งแนวนอน
  const delay = Math.floor(Math.random() * 8000); // เวลาหน่วงก่อนเริ่มวิ่ง
  const duration = Math.floor(Math.random() * 3000) + 2000; // ระยะเวลาวิ่ง (2-5 วินาที)

  return {
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
  };
};

onMounted(() => {
  console.log("🚀 ~ route:", route.name);
});
</script>

<style scoped>
/* --- ชั้นของดาวนิ่ง (Static Stars) --- */
.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.static-star {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0.5;
  animation: twinkle var(--twinkle-duration) infinite ease-in-out;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
:root {
  --primary-color: #2196f3;
}

body,
html {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  height: 100vh;
}

/* Container สำหรับดาวตก */
.night {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateZ(45deg); /* หมุนทั้งแผงเพื่อให้ดาววิ่งเฉียง */
  z-index: 0;
  pointer-events: none;
}

.shooting-star {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 2px;
  background: linear-gradient(-45deg, #ffffff, rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px #ffffff);
  animation: tail 3000ms ease-in-out infinite,
    shooting 3000ms ease-in-out infinite;
}

.shooting-star::before,
.shooting-star::after {
  content: "";
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  height: 2px;
  background: linear-gradient(
    -45deg,
    rgba(0, 0, 255, 0),
    #ffffff,
    rgba(0, 0, 255, 0)
  );
  transform: translateX(50%) rotateZ(45deg);
  border-radius: 100%;
  animation: shining 3000ms ease-in-out infinite;
}

.shooting-star::after {
  transform: translateX(50%) rotateZ(-45deg);
}

/* Animation สำหรับความยาวของหาง */
@keyframes tail {
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}

/* Animation สำหรับการกะพริบที่หัวดาว */
@keyframes shining {
  0% {
    width: 0;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 0;
  }
}

/* Animation สำหรับการพุ่งเคลื่อนที่ */
@keyframes shooting {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300px);
  }
}

/* ตกแต่งเนื้อหาให้อยู่บนพื้นหลัง */
.v-application {
  background: transparent !important;
}
</style>
