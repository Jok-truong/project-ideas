declare module '*.vue'

declare module '@/services/auth' {
  import { AxiosResponse } from 'axios'
  import { SignUpForm } from '@/interfaces/auth'
  import type { LoginForm } from '@/interfaces/auth'

  export const signUp: (form: SignUpForm) => Promise<AxiosResponse<SignUpForm[]>>
  export const login: (form: LoginForm) => Promise<AxiosResponse<LoginForm[]>>
  export const getMe: () => Promise<AxiosResponse>
}
