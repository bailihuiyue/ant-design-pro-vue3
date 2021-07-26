export function timeFix () {
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

const sitUrl = 'xxxxx'
const isDev = import.meta.env.DEV
export const baseURL = isDev ? '/' : '生产地址'