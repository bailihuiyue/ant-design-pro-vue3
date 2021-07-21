// 默认缓存期限为7天
const options: any = {
  namespace: 'ls_', // key prefix
  storage: 'localStorage', // storage name session, local, memory
  default_cache_time: 60 * 60 * 24 * 7
}
let hasSetStorage = false

export const storage = {
  getKey: (key: string) => {
    return options.namespace + key
  },
  setOptions: (opt: any) => {
    if (hasSetStorage) {
      console.error('Has set storage:',options)
      return
    }
    Object.assign(options, opt)
    hasSetStorage = true
  },
  set: (key: string, value: any, expire: number | null = options.default_cache_time) => {
    const stringData = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null
    })
    window[options.storage].setItem(storage.getKey(key), stringData)
  },
  /**
   * 读取缓存
   * @param {string} key 缓存键
   * @param {*=} def 默认值
   */
  get: (key: string, def: any = null) => {
    const item = window[options.storage].getItem(storage.getKey(key))
    if (item) {
      try {
        const data = JSON.parse(item)
        const { value, expire } = data
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value
        }
        storage.remove(storage.getKey(key))
      } catch (e) {
        return def
      }
    }
    return def
  },
  remove: (key: string) => {
    window[options.storage].removeItem(storage.getKey(key))
  },
  clear: (): void => {
    window[options.storage].storage.clear()
  }
}

export default storage
