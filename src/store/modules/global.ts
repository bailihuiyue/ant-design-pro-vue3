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
  SET_DARK_MODE,
  SET_LOCK_SCREEN
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
    color: null, //主题颜色
    weak: false,
    gray: false,
    multiTab: false,
    showSettings: false,
    darkMode: false,
    lockScreen: false
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
    // 深浅主题
    [TOGGLE_THEME]: (state, theme) => {
      cache({ [TOGGLE_THEME]: theme })
      state.theme = theme

      // 开启深浅主题时关闭黑夜模式
      if (state.darkMode) {
        setDarkMode(state, false)
      }
    },
    [SET_DARK_MODE]: (state, isDark) => {
      setDarkMode(state, isDark)
      // 开启黑夜模式时设置主题为黑色
      if (isDark) {
        state.theme = 'dark'
      }
    },
    [TOGGLE_LAYOUT_MODE]: (state, layout) => {
      // 左侧菜单的话就用流式布局
      if (layout === 'sidemenu') {
        state.contentWidth = 'Fluid'
        cache({ [TOGGLE_CONTENT_WIDTH]: 'Fluid' })
      }
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

      // menuIconColorPatch(color)
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
    [SET_LOCK_SCREEN]: (state, flag) => {
      state.lockScreen = flag
      cache({ [SET_LOCK_SCREEN]: flag })
      document.getElementById('app')!.style.overflow = flag ? 'hidden' :'visible'
    },

  }
}

function cache(o) {
  ls.setObj(SITE_SETTINGS, o)
}

function menuIconColorPatch(color) {
  const menuIconColor = `
      .SysMenu .ant-menu-light .ant-menu-submenu-selected .ant-menu-item-icon,
      .SysMenu .ant-menu-light .ant-menu-item-selected .ant-menu-item-icon{
        color: ${color} !important;
      }`
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(menuIconColor));
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}

function setDarkMode(state, isDark) {
  cache({ [SET_DARK_MODE]: isDark })
  updateDarkMode(isDark)
  state.darkMode = isDark
}

export default app
