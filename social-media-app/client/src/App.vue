<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <NavbarComponent />

    <main class="px-8 py-6 bg-gray-100">
      <RouterView />
    </main>
  </div>
</template>
