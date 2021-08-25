import ls from '@/utils/Storage'
import { updateDarkMode } from '@/components/SettingDrawer/settingConfig'
import {
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
    layout: 'sidemenu', //sidemenu topmenu
    contentWidth: 'Fluid',  //Fixed Fluid
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
      cache({ [SET_SIDEBAR_TYPE]: type })
    },
    [CLOSE_SIDEBAR]: (state) => {
      cache({ [CLOSE_SIDEBAR]: true })
      state.sidebar = false
    },
    [TOGGLE_DEVICE]: (state, device) => {
      state.device = device
    },
    [TOGGLE_THEME]: (state, theme) => {
      cache({ [TOGGLE_THEME]: theme })
      state.theme = theme
      // 开启深浅主题时关闭黑夜模式
      cache({ [SET_DARK_MODE]: false })
      updateDarkMode(false)
      state.darkMode = false
    },
    // TODO:黑夜模式下一旦点开设置抽屉,黑色就没了一半
    [SET_DARK_MODE]: (state, type) => {
      cache({ [SET_DARK_MODE]: type })
      updateDarkMode(type)
      state.darkMode = type
      // 开启/关闭黑夜模式时设置主题为黑色
      state.theme = 'dark'
    },
    [TOGGLE_LAYOUT_MODE]: (state, layout) => {
      cache({ [TOGGLE_LAYOUT_MODE]: layout })
      state.layout = layout
    },
    [TOGGLE_FIXED_HEADER]: (state, fixed) => {
      cache({ [TOGGLE_FIXED_HEADER]: fixed })
      state.fixedHeader = fixed
    },
    [TOGGLE_FIXED_SIDERBAR]: (state, fixed) => {
      cache({ [TOGGLE_FIXED_SIDERBAR]: fixed })
      state.fixSiderbar = fixed
    },
    [TOGGLE_FIXED_HEADER_HIDDEN]: (state, show) => {
      cache({ [TOGGLE_FIXED_HEADER_HIDDEN]: show })
      state.autoHideHeader = show
    },
    [TOGGLE_CONTENT_WIDTH]: (state, type) => {
      cache({ [TOGGLE_CONTENT_WIDTH]: type })
      state.contentWidth = type
    },
    [TOGGLE_COLOR]: (state, color) => {
      cache({ [TOGGLE_COLOR]: color })
      state.color = color
    },
    [TOGGLE_WEAK]: (state, flag) => {
      cache({ [TOGGLE_WEAK]: flag })
      state.weak = flag
    },
    [TOGGLE_GRAY]: (state, flag) => {
      cache({ [TOGGLE_GRAY]: flag })
      state.gray = flag
    },
    [TOGGLE_MULTI_TAB]: (state, bool) => {
      cache({ [TOGGLE_MULTI_TAB]: bool })
      state.multiTab = bool
    },
    [SET_SETTING_DRAWER]: (state, type) => {
      state.showSettings = type
    },
  }
}

function cache(o) {
  ls.setObj(SITE_SETTINGS, o)
}

export default app
