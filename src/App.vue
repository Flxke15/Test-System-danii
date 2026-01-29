<template>
  <v-app>
    <router-view />
    <Loading v-model="loadingStore.isLoading" />
  </v-app>
</template>

<script setup>
import { useLoadingStore } from '@/stores/loading'
const loadingStore = useLoadingStore()

</script>
