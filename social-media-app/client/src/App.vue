<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import { RouterView } from 'vue-router'
import axios from 'axios'
import { useUserStore } from './stores/user'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const userStore = useUserStore()
const token: Ref<null | string> = ref(null)
const isAuthenticated: Ref<boolean> = ref(false)

onMounted(() => {
  userStore.initStore()

  token.value = userStore.user.access

  isAuthenticated.value = !!userStore.user.isAuthenticated

  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  } else {
    axios.defaults.headers.common['Authorization'] = ''
  }
})
</script>

<template>
  <div>
    <NavbarComponent :is-authenticated="isAuthenticated" />
    <main class="px-8 py-6 bg-gray-100">
      <RouterView />
    </main>
  </div>
</template>
