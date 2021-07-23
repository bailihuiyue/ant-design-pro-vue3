import { createI18n } from 'vue-i18n'
import storage from '@/utils/Storage'
import { genLangs } from '@/utils/batchImportFiles'

// TODO:底下这三大块没有封装是因为import.meta.globEager只让传字符串,不让传变量
// 通用国际化的写在locales/lang/里(比如路由,菜单之类的)
let enU = import.meta.globEager('./**/en.ts');
let cnU = import.meta.globEager('./**/cn.ts');
enU = genLangs(enU, 'lang')
cnU = genLangs(cnU, 'lang')

// 页面类的
let enV = import.meta.globEager('../views/**/lang/en.ts');
let cnV = import.meta.globEager('../views/**/lang/cn.ts');
enV = genLangs(enV, 'views')
cnV = genLangs(cnV, 'views')
// 组件类的
let enC = import.meta.globEager('../components/**/lang/en.ts');
let cnC = import.meta.globEager('../components/**/lang/cn.ts');
enC = genLangs(enC, 'components')
cnC = genLangs(cnC, 'components')

const en = { ...enU, ...enV, ...enC }
const cn = { ...cnU, ...cnV, ...cnC }

const i18n = createI18n({
  locale: storage.get('lang') || 'cn',
  legacy: false,
  globalInjection: true,
  messages: {
    cn,
    en
  }
})

export default i18n

export const getLocale = () => {
  return i18n.global.locale
}