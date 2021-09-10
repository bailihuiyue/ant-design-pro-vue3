import { Response } from 'types/global'

export interface Get2Step extends Response {
  result: { stepCode: number }
}

export interface Login {
  id: string;
  name: string;
  username: string;
  password: string;
  avatar: string;
  status: number;
  telephone: string;
  lastLoginIp: string;
  lastLoginTime: number;
  creatorId: string;
  createTime: number;
  merchantCode: string;
  deleted: number;
  permission: string[];
  menu: Array<any>
  code?: number
  msg?: string
}

export interface GetSmsCaptcha extends Response {
  result: { captcha: number }
}

export interface Logout extends Response {
  result: {}
}

export module API {
  export type _Get2Step = () => Promise<Get2Step>
  export type _Login = (data: {
    captcha?: string,
    mobile?: string,
    password?: string,
    rememberMe?: boolean,
    username?: string
  }) => Promise<Login>
  export type _GetSmsCaptcha = (data: { mobile: string }) => Promise<GetSmsCaptcha>
  export type _Logout = () => Promise<Logout>
}

export interface FormState {
  rememberMe: boolean;
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}
