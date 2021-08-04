import config from '@/config/defaultSettings'
import i18n from '@/locales/useI18n'

export const setDocumentTitle = function (to) {
  if (config.dynamicBrowserTab) {
    const title = to?.meta?.title
    if (!title) {
      return
    }
    // info:为了使页面切换语言时标签名也能及时切换
    window.pagetitle = title
    setDocumentTitleForLangChange()

    const ua = navigator.userAgent
    // eslint-disable-next-line
    const regex = /\bMicroMessenger\/([\d\.]+)/
    if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
      const i = document.createElement('iframe')
      i.src = '/favicon.ico'
      i.style.display = 'none'
      i.onload = function () {
        setTimeout(function () {
          i.remove()
        }, 9)
      }
      document.body.appendChild(i)
    }
  }
}

export const setDocumentTitleForLangChange = () => {
  document.title = (window.pagetitle ? i18n.global.t(window.pagetitle) + ' - ' : '') + config.title
}

export const domTitle = config.title
