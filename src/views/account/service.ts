// import useAxios from '@/hooks/useAxios'
import baseService from '@/utils/http/axios'
import { UpdateUserLabel, UserInfo, AllLabelItem } from './types'
import { baseURL } from '@/utils/util'

export const updateLabel: (para: any) => Promise<String> = async (param: any) => {
  const api = baseURL + `member/label/updateLabel`
  // const { service, loading, data } = useAxios()
  return await baseService.post(api, param)
  // return reactive([loading, data])
}

export const findAllLabel: () => Promise<AllLabelItem[]> = () => {
  const api = baseURL + `member/label/findAll`
  return baseService.get(api)
}

export const personDetail: () => Promise<UserInfo> = () => {
  const api = baseURL + `member/user/personDetail`
  return baseService.get(api)
}

export const updatePersonDetail:(param: Partial<UserInfo>) => Promise<String> = param => {
  const api = baseURL + `member/user/updatePersonDetail`
  return baseService.post(api, param)
}

export const updateUserLabel: (param: Partial<UserInfo>) => Promise<String> = param => {
  const api = baseURL + `member/user/updateUserLabel`
  return baseService.post(api, param)
}
