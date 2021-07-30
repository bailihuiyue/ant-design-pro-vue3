import { ResponseBody } from './types'
import { useBreakpoints, breakpointsAntDesign } from '@vueuse/core';
// { "xs": 480, "sm": 576, "md": 768, "lg": 992, "xl": 1200, "xxl": 1600 }
const breakpoints = useBreakpoints(breakpointsAntDesign);
export const isMobile = breakpoints.smaller('lg');

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

// aes encryption key
export const encryptKeys = {
  // key最少4位,否则报错
  key: '1111',
  iv: '1',
};

const responseBody: ResponseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0
}

export const builder = (data: Object, message?: string, code = 0, headers = {}) => {
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}

export function scorePassword(pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
    variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}

const sitUrl = 'xxxxx'
const isDev = true
export const baseURL = isDev ? '/' : '生产地址'
