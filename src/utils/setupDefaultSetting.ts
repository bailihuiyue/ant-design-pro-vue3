import ls from './Storage';
import { SITE_SETTINGS, TOGGLE_THEME, SET_DARK_MODE, TOGGLE_COLOR, TOGGLE_GRAY, TOGGLE_WEAK } from '@/store/mutation-types'
import store from '@/store'
import { updateTheme } from '@/components/SettingDrawer/updateTheme'
import { updateColorWeak, updateGrayMode } from '@/components/SettingDrawer/settingConfig'

export default () => {
  const siteSettings = ls.get(SITE_SETTINGS)

  if (siteSettings) {
    for (let s in siteSettings) {
      // 只要设置了黑暗主题,就不设置亮暗颜色了,统一默认暗色
      if (s === TOGGLE_THEME && siteSettings[SET_DARK_MODE]) {
        continue;
      }
      // 有主题色就设置主题色
      if (s === TOGGLE_COLOR && siteSettings[TOGGLE_COLOR]) {
        updateTheme(siteSettings[TOGGLE_COLOR])
      }
      // 黑白模式
      if (s === TOGGLE_GRAY && siteSettings[TOGGLE_GRAY]) {
        updateGrayMode(true)
      }
      // 色弱模式
      if (s === TOGGLE_WEAK && siteSettings[TOGGLE_WEAK]) {
        updateColorWeak(true)
      }
      store.commit(s, siteSettings[s])
    }
  }
}
