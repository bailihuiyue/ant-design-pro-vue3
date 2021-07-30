export type Crypt = (key: string, iv: string, data: string) => string
export interface LangFile {
  [x: string]: string
}
export interface I18nMsg {
  [x: string]: I18nMsgVal
}
export type I18nMsgVal = I18nMsg | string

export interface ResponseBody {
  _status?: number
  _headers?: Object
  message: string,
  timestamp: number,
  result,
  code: number
}
