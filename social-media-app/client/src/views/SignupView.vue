<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, reactive } from 'vue'
import { signUp } from '@/services/auth'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  password1: '',
  password2: ''
})
const errors: Ref<string[]> = ref([])

const submitForm = async () => {
  errors.value = []
  if (!form.email) {
    errors.value.push('Your e-mail is missing')
  }

  if (!form.name) {
    errors.value.push('Your name is missing')
  }

  if (!form.password1) {
    errors.value.push('Your password is missing')
  }

  if (form.password1 !== form.password2) {
    errors.value.push('The password does not match')
  }

  if (errors.value.length === 0) {
    signUp(form)
      .then(() => {
        toast.success('Signup successful')
      })
      .catch((error) => {
        console.log('error', error)
        toast.error('error', error)
      })
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
    <div class="main-left">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <h1 class="mb-6 text-2xl">Signup</h1>

        <p class="mb-6 text-gray-500">
          Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem
          ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate.
        </p>

        <p class="font-bold">
          Already have an account?
          <RouterLink :to="{ name: 'login' }" class="underline">Click here</RouterLink> to log in!
        </p>
      </div>
    </div>

    <div class="main-right">
      <div class="p-12 bg-white border-gray-200 rounded-lg">
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="name" class="font-bold">Name</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              placeholder="Your full name"
              class="w-full my-3 py-4 px-6 border border-gray-200 rounded-lg"
            />
            <label for="email" class="font-bold">E-mail</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              placeholder="Your e-mail address"
              class="w-full my-3 py-4 px-6 border border-gray-200 rounded-lg"
            />
            <label for="password" class="font-bold">Password</label>
            <input
              v-model="form.password1"
              type="password"
              id="password"
              placeholder="Your password"
              class="w-full my-3 py-4 px-6 border border-gray-200 rounded-lg"
            />
            <label for="repeatPassword" class="font-bold">Repeat password</label>
            <input
              v-model="form.password2"
              type="password"
              id="repeatPassword"
              placeholder="Repeat your password"
              class="w-full my-3 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </template>

          <div>
            <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
