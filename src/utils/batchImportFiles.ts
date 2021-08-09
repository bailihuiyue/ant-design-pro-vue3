import { LangFile, I18nMsg, I18nMsgVal } from './types'
export function genLangs(module: Record<string, any>, include: Array<string> | null, exclude?: string) {
  const obj = {};

  Object.keys(module).forEach((item) => {
    const content: LangFile = module[item].default;
    if (!content) {
      throw new Error('Please export default in ' + item)
    }
    let path
    if (include?.length) {
      path = item.replace(/^\/src\//, '');
      include?.forEach(e => {
        path = path.replace(`${e}/`, '')
      })
    } else {
      path = item.replace(/^\.\.\//, '').replace(/^\.\//, '').replace(`${exclude}/`, '');
    }
    path = path.replace(/\/lang/, '').split('.')[0];
    const names = path.split('/')
    names.pop() as string;
    const objKey = names.join('.');
    obj[objKey] = replaceDot(content)
  });
  return obj;
}

// 修复i18n 9.0版本无法识别$t('a.b.c')的问题,(当key为a.b.c:"1"时无法识别,必须写成a:{b:{c:1}})
function replaceDot(c: LangFile) {
  let o: I18nMsg = {}
  for (var k in c) {
    if (k.includes('.')) {
      var arr = k.split('.')
      arr.reduce((total: I18nMsgVal, val, index) => {
        if (index === arr.length - 1) {
          total[val] = c[k]
          return total[val]
        }
        return (total[val] || (total[val] = {}))
      }, o)
    } else {
      return c
    }
  }
  return o
}

export const getRoutePages = () => {
  const pages = import.meta.glob('/src/views/**/*.vue')
  const files = {}
  for (let p in pages) {
    files[getFileName(p)] = pages[p]
  }
  return files
}

const getFileName = (path: string) => {
  const pattern = /\/(\w*)\.vue/
  const matched = path.match(pattern)
  if(!matched){
    throw new Error('path is not right:' + path)
  }
  return matched[1]
}
