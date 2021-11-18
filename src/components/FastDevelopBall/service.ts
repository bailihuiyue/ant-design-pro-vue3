import baseService from '@/utils/http/axios'

const baseURL = "http://localhost:3006/"

export const createC = (name) => {
  const api = baseURL + `createModule/addComponent?name=${name}`
  return baseService.get(api)
}

export const createV = (name) => {
  const api = baseURL + `createModule/addView?name=${name}`
  return baseService.get(api)
}
