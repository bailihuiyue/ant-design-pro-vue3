import axios, { AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
import { baseURL } from '@/utils/util'
import ls from '@/utils/Storage'
import { globalLoading } from '@/store/reactiveState'
import emitter from '@/utils/eventBus'

const ContentType = {
  urlencoded: 'application/x-www-form-urlencoded;charset=UTF-8',
  json: 'application/json',
  formData: 'multipart/form-data'
}

// 创建 axios 实例   withCredentials: true,
const baseService = axios.create({
  // baseURL,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// request interceptor
baseService.interceptors.request.use(
  (config) => {
    globalLoading.value = true
    const token = ls.get(ACCESS_TOKEN)
    const userinfo = ls.get(USER_INFO)
    if (token) {
      config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    if (userinfo) {
      config.headers['username'] = userinfo.username // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = ContentType[config.data instanceof FormData ? 'formData' : 'json']
    return config
  },
  (error) => {
    globalLoading.value = false
    return Promise.reject(error)
  }
)

baseService.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    globalLoading.value = false
    if (res.status === 200) {
      return res.data
    }
    return res
  },
  (error) => {
    console.log(error)
    globalLoading.value = false
    const msg = error.message
    const result = error.response
    if (result) {
      const { data, status } = result
      if (data.message) {
        message.error(data.message)
      } else if (status === 401 || status === 403) {
        message.error('登录过期或权限不足, 请重新登陆!')
      } else if (status === 500) {
        message.error('请求数据失败, 请重试!')
      } else if (status === 406) {
        message.error('登陆超时请重新登录!')
        emitter.emit('axios_goto_login')
      }
    } else if (msg) {
      if (msg === 'Network Error') {
        message.error('网络错误,请检查网络!')
      } else {
        message.error(msg)
      }
    } else if (error.__CANCEL__) {
      // ignore message error
    } else {
      message.error('未知错误,请重试!')
    }
    return false
  }
)

export default baseService
