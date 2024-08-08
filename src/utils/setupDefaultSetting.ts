import ls from './Storage';
import { SITE_SETTINGS, TOGGLE_THEME, SET_DARK_MODE, THEME_COLOR, TOGGLE_GRAY, TOGGLE_WEAK } from '@/store/mutation-types'
import { systemConfig } from '@/store/reactiveState'
import { updateColorWeak, updateGrayMode } from '@/components/SettingDrawer/settingConfig'

export default () => {
  const siteSettings = ls.get(SITE_SETTINGS)

  if (siteSettings) {
    for (let s in siteSettings) {
      // 只要设置了黑暗主题,就不设置亮暗颜色了,统一默认暗色
      if (s === TOGGLE_THEME && siteSettings[SET_DARK_MODE]) {
        continue;
      }
      // 黑白模式
      if (s === TOGGLE_GRAY && siteSettings[TOGGLE_GRAY]) {
        updateGrayMode(true)
      }
      // 色弱模式
      if (s === TOGGLE_WEAK && siteSettings[TOGGLE_WEAK]) {
        updateColorWeak(true)
      }
      systemConfig.commit(s, siteSettings[s])
    }
  }
}
