<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toast-notification'
import { login, getMe } from '@/services/auth'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const userStore = useUserStore()
const form = reactive({
  email: '',
  password: ''
})
const errors: Ref<string[]> = ref([])

const submitForm = async () => {
  errors.value = []
  if (form.email === '') {
    errors.value.push('Your e-mail is missing')
  }

  if (form.password === '') {
    errors.value.push('Your password is missing')
  }

  if (errors.value.length === 0) {
    login(form)
      .then(({ data }) => {
        userStore.setToken(data)
        const { access, refresh } = data as any

        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`

        toast.success('Login successful')
      })
      .catch((error) => {
        console.log('error', error)
        toast.error('error', error)
      })

    getMe()
      .then(({ data }) => {
        userStore.setUserInfo(data)
        router.push('/feed')
      })
      .catch((err) => console.log(err))
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
    <div class="main-left">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <h1 class="mb-6 text-2xl">Log in</h1>

        <p class="mb-6 text-gray-500">
          Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem
          ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate.
        </p>

        <p class="font-bold">
          Don't have an account?
          <RouterLink :to="{ name: 'signup' }" class="underline">Click here</RouterLink> to create
          one!
        </p>
      </div>
    </div>

    <div class="main-right">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label>E-mail</label><br />
            <input
              v-model="form.email"
              type="email"
              placeholder="Your e-mail address"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label>Password</label><br />
            <input
              v-model="form.password"
              type="password"
              placeholder="Your password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </template>

          <div>
            <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Log in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
