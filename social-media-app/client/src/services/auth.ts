import type { LoginForm, SignUpForm } from '@/interfaces/auth'
import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

export const signUp = async (form: SignUpForm): Promise<AxiosResponse<SignUpForm[]>> =>
  await axios.post('api/signup/', form)

export const login = async (form: LoginForm): Promise<AxiosResponse<LoginForm[]>> =>
  await axios.post('api/login/', form)

export const getMe = async (): Promise<AxiosResponse> => await axios.get('api/me/')
