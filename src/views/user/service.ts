import baseService from '@/utils/http/axios'
import { baseURL } from '@/utils/util'

export const userLogin = (data: any) => {
  const api = baseURL + `auth/login`
  return baseService.post(api, data)
}