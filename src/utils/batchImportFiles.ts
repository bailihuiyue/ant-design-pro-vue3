import { LangFile, I18nMsg } from './types'
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
    // 国际化文件中如果没有a.b.c这样的key就不需要写replaceDot(content),直接写content就行
    // replaceDot的作用就是变a.b.c:1为a:{b:{c:1}},内容多了的话会有性能损耗的
    reduceArr(obj, names, replaceDot(content))
  });
  return obj;
}

// 数组生成obj,可递归
function reduceArr(o, arr, cb) {
  arr.reduce((total, val, index) => {
    if (index === arr.length - 1) {
      try {
        total[val] = cb
      } catch (error) {
        const all = arr.join('.')
        arr.pop()
        console.error(arr.join('.') + ' 本身不应该存在或者 ' + all + ' 不应该存在')
      }
      return total[val]
    }
    return (total[val] || (total[val] = {}))
  }, o)
}

// 修复i18n 9.0版本无法识别$t('a.b.c')的问题,(当key为a.b.c:"1"时无法识别,必须写成a:{b:{c:1}})
function replaceDot(c: LangFile) {
  let o: I18nMsg = {}
  let hasMutiKeys = false
  for (var k in c) {
    if (k.includes('.')) {
      hasMutiKeys = true
      var arr = k.split('.')
      reduceArr(o, arr, c[k])
    }
  }
  return hasMutiKeys ? o : c
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
  if (!matched) {
    throw new Error('path is not right:' + path)
  }
  return matched[1]
}
