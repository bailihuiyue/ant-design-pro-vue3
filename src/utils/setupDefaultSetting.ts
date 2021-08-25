import ls from './Storage';
import { SITE_SETTINGS, TOGGLE_THEME, SET_DARK_MODE } from '@/store/mutation-types'
import store from '@/store'

export default () => {
  const siteSettings = ls.get(SITE_SETTINGS)

  if (siteSettings) {
    for (let s in siteSettings) {
      if (s === TOGGLE_THEME && siteSettings[SET_DARK_MODE]) {
        continue;
      }
      store.commit(s, siteSettings[s])
    }
  }
}
