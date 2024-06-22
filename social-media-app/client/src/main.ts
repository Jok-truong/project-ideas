import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import 'vue-toast-notification/dist/theme-bootstrap.css'
import ToastPlugin from 'vue-toast-notification'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.mount('#app')
