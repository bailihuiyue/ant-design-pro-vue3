import baseService from '@/utils/http/axios'
import { baseURL } from '@/utils/util'

export const userLogin = data => {
  const api = baseURL + `auth/unlock`
  return baseService.post(api, data)
}
