import ls from './Storage';
import { SITE_SETTINGS, TOGGLE_THEME, SET_DARK_MODE, TOGGLE_COLOR } from '@/store/mutation-types'
import store from '@/store'
import { updateTheme } from '@/components/SettingDrawer/updateTheme'

export default () => {
  const siteSettings = ls.get(SITE_SETTINGS)

  if (siteSettings) {
    for (let s in siteSettings) {
      if (s === TOGGLE_THEME && siteSettings[SET_DARK_MODE]) {
        continue;
      }
      if (s === TOGGLE_COLOR && siteSettings[TOGGLE_COLOR]) {
        updateTheme(siteSettings[TOGGLE_COLOR])
      }
      store.commit(s, siteSettings[s])
    }
  }
}
