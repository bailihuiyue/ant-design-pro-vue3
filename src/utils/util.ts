import ls from '@/utils/Storage'
import { ACCESS_TOKEN, PERMISSION, USER_INFO, MENU_NAV } from '@/store/mutation-types'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export function clearUserInfo() {
  ls.remove(ACCESS_TOKEN)
  ls.remove(PERMISSION)
  ls.remove(USER_INFO)
  ls.remove(MENU_NAV)
}

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

export const firstLetterIsUpperCase = function (str) {
  var reg = /^[A-Z][A-z0-9]*$/;
  return reg.test(str);
};

export const separator = ';'

export const divisionStringToArray = (string, customSeparator) => {
  return string ? string.split(customSeparator || separator) : []
}

export const getWeek = (week: number, useZhou) => {
  let txt = ''
  switch (week) {
    case 1:
      txt = '一'
      break
    case 2:
      txt = '二'
      break
    case 3:
      txt = '三'
      break
    case 4:
      txt = '四'
      break
    case 5:
      txt = '五'
      break
    case 6:
      txt = '六'
      break
    case 0:
      txt = '日'
      break
    default:
      return 'getWeekError'
  }
  return useZhou ? '周' : '星期' + txt
}

const sitUrl = 'xxxxx'
export const isDev = import.meta.env.DEV
export const baseURL = isDev ? '/api/' : '生产地址'

export function toLocalTimeStr({ date, format = 'YYYY-MM-DD HH:mm:ss' }) {
  if (!date) return null;
  return dayjs(date).format(format)
}

export function objToArr(obj) {
  let arr: any = []
  for (const o in obj) {
    arr.push({ label: o, txt: obj[o] })
  }
  return arr
}

export function clearObj(obj) {
  for (const key in obj) {
    obj[key] = undefined
  }
}

export function delArrItem(arr, item) {
  const index = arr.indexOf(item);
  arr.splice(index, 1);
}

export const useImageUrl = (name: string, type: string = 'png'): string => {
  /**
   * @method vite动态引入图片
   * @params folder 文件夹名称 name 文件名称 type 文件格式 一般为png/jpg/webp/gif等...
   * @returns 图片
   */
  return new URL(`../assets/images/${name}.${type}`, import.meta.url).href
}

export const batchDispatch = (dispatch, arr) => {
  arr.forEach(item => {
    dispatch(item)
  });
}

export const createFormData = (formDatas, file) => {
  const formData = new FormData()
  if (file.length) {
    file.map(item => {
      formData.append('file', item)
    })
  } else {
    formData.append('file', file)
  }
  for (const item in formDatas) {
    formData.append(item, formDatas[item] || '')
  }
  return formData
}
