import ls from '@/utils/Storage'
import {
  SIDEBAR_TYPE,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR,
  DEFAULT_COLOR_WEAK,
  DEFAULT_COLOR_GRAY,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB,
  SITE_SETTINGS,
  SET_SIDEBAR_TYPE,
  TOGGLE_DEVICE,
  TOGGLE_FIXED_HEADER,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_COLOR,
  TOGGLE_WEAK,
  TOGGLE_MULTI_TAB,
  SET_SETTING_DRAWER,
  TOGGLE_FIXED_SIDERBAR,
  TOGGLE_FIXED_HEADER_HIDDEN,
  TOGGLE_GRAY,
  TOGGLE_THEME,
  TOGGLE_LAYOUT_MODE,
  CLOSE_SIDEBAR,
  SET_DARK_MODE
} from '@/store/mutation-types'

const app = {
  state: {
    sidebar: true,
    device: 'desktop',
    theme: 'dark',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixSiderbar: false,
    autoHideHeader: false,
    color: null,
    weak: false,
    gray: false,
    multiTab: true,
    showSettings: false,
    darkMode: false
  },
  mutations: {
    [SET_SIDEBAR_TYPE]: (state, type) => {
      state.sidebar = type
      cache({ [SIDEBAR_TYPE]: type })
    },
    [CLOSE_SIDEBAR]: (state) => {
      cache({ [SIDEBAR_TYPE]: true })
      state.sidebar = false
    },
    [TOGGLE_DEVICE]: (state, device) => {
      state.device = device
    },
    [TOGGLE_THEME]: (state, theme) => {
      cache({ [DEFAULT_THEME]: theme })
      state.theme = theme
    },
    [TOGGLE_LAYOUT_MODE]: (state, layout) => {
      cache({ [DEFAULT_LAYOUT_MODE]: layout })
      state.layout = layout
    },
    [TOGGLE_FIXED_HEADER]: (state, fixed) => {
      cache({ [DEFAULT_FIXED_HEADER]: fixed })
      state.fixedHeader = fixed
    },
    [TOGGLE_FIXED_SIDERBAR]: (state, fixed) => {
      cache({ [DEFAULT_FIXED_SIDEMENU]: fixed })
      state.fixSiderbar = fixed
    },
    [TOGGLE_FIXED_HEADER_HIDDEN]: (state, show) => {
      cache({ [DEFAULT_FIXED_HEADER_HIDDEN]: show })
      state.autoHideHeader = show
    },
    [TOGGLE_CONTENT_WIDTH]: (state, type) => {
      cache({ [DEFAULT_CONTENT_WIDTH_TYPE]: type })
      state.contentWidth = type
    },
    [TOGGLE_COLOR]: (state, color) => {
      cache({ [DEFAULT_COLOR]: color })
      state.color = color
    },
    [TOGGLE_WEAK]: (state, flag) => {
      cache({ [DEFAULT_COLOR_WEAK]: flag })
      state.weak = flag
    },
    [TOGGLE_GRAY]: (state, flag) => {
      cache({ [DEFAULT_COLOR_GRAY]: flag })
      state.gray = flag
    },
    [TOGGLE_MULTI_TAB]: (state, bool) => {
      cache({ [DEFAULT_MULTI_TAB]: bool })
      state.multiTab = bool
    },
    [SET_SETTING_DRAWER]: (state, type) => {
      cache({ [SET_SETTING_DRAWER]: type })
      state.showSettings = type
    },
    [SET_DARK_MODE]: (state, type) => {
      cache({ [SET_DARK_MODE]: type })
      state.darkMode = type
    }
  }
}

function cache(o) {
  ls.setObj(SITE_SETTINGS, o)
}

export default app
