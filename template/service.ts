// import baseService from '@/utils/http/axios'
// import { baseURL } from '@/utils/util'

// export const test = data => {
//   const api = baseURL + `test`
//   return baseService.post(api, data)
// }
export interface States {
  rememberMe: boolean;
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}
