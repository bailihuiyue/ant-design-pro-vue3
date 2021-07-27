import baseService from '@/utils/http/axios'
import { baseURL } from '@/utils/util'

export const userLogin = (data: any) => {
  const api = baseURL + `auth/login`
  return baseService.post(api, data)
}

export const getSmsCaptcha = (data: any) => {
  const api = baseURL + `account/sms`
  return baseService.post(api, data)
}

export const get2step = (data: any) => {
  const api = baseURL + `auth/2step-code`
  return baseService.get(api, data)
}

export const logout = () => {
  const api = baseURL + `auth/logout`
  return baseService.post(api)
}

