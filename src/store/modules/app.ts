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
  SITE_SETTINGS
} from '@/store/mutation-types'

const app = {
  state: {
    sidebar: true,
    device: 'desktop',
    theme: '',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixSiderbar: false,
    autoHideHeader: false,
    color: null,
    weak: false,
    gray: false,
    multiTab: true,
    showSettings: false
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type
      ls.setObj(SITE_SETTINGS, { [SIDEBAR_TYPE]: type })
    },
    CLOSE_SIDEBAR: (state) => {
      ls.setObj(SITE_SETTINGS, { [SIDEBAR_TYPE]: true })
      state.sidebar = false
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
      // setStore('_DEFAULT_THEME', theme)
      ls.setObj(SITE_SETTINGS, { [DEFAULT_THEME]: theme })
      state.theme = theme
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      ls.setObj(SITE_SETTINGS, { [DEFAULT_LAYOUT_MODE]: layout })
      state.layout = layout
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      ls.setObj(SITE_SETTINGS, { [DEFAULT_FIXED_HEADER]: fixed })
      state.fixedHeader = fixed
    },
    TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
      ls.setObj(SITE_SETTINGS, { [DEFAULT_FIXED_SIDEMENU]: fixed })
      state.fixSiderbar = fixed
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
      ls.setObj(SITE_SETTINGS, { [DEFAULT_FIXED_HEADER_HIDDEN]: show })
      state.autoHideHeader = show
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      ls.setObj(SITE_SETTINGS, { [DEFAULT_CONTENT_WIDTH_TYPE]: type })
      state.contentWidth = type
    },
    TOGGLE_COLOR: (state, color) => {
      ls.setObj(SITE_SETTINGS, { [DEFAULT_COLOR]: color })
      state.color = color
    },
    TOGGLE_WEAK: (state, flag) => {
      ls.setObj(SITE_SETTINGS, { [DEFAULT_COLOR_WEAK]: flag })
      state.weak = flag
    },
    TOGGLE_GRAY: (state, flag) => {
      ls.setObj(SITE_SETTINGS, { [DEFAULT_COLOR_GRAY]: flag })
      state.gray = flag
    },
    TOGGLE_MULTI_TAB: (state, bool) => {
      ls.setObj(SITE_SETTINGS, { [DEFAULT_MULTI_TAB]: bool })
      state.multiTab = bool
    },
    SET_SETTING_DRAWER: (state, type) => {
      state.showSettings = type
    }
  },
  actions: {
    setSidebar({ commit }, type) {
      commit('SET_SIDEBAR_TYPE', type)
    },
    CloseSidebar({ commit }) {
      commit('CLOSE_SIDEBAR')
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme({ commit }, theme) {
      commit('TOGGLE_THEME', theme)
    },
    ToggleLayoutMode({ commit }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode)
    },
    ToggleFixedHeader({ commit }, fixedHeader) {
      if (!fixedHeader) {
        commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
      }
      commit('TOGGLE_FIXED_HEADER', fixedHeader)
    },
    ToggleFixSiderbar({ commit }, fixSiderbar) {
      commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
    },
    ToggleFixedHeaderHidden({ commit }, show) {
      commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
    },
    ToggleContentWidth({ commit }, type) {
      commit('TOGGLE_CONTENT_WIDTH', type)
    },
    ToggleColor({ commit }, color) {
      commit('TOGGLE_COLOR', color)
    },
    ToggleWeak({ commit }, weakFlag) {
      commit('TOGGLE_WEAK', weakFlag)
    },
    ToggleGray({ commit }, grayFlag) {
      commit('TOGGLE_GRAY', grayFlag)
    },
    ToggleMultiTab({ commit }, bool) {
      commit('TOGGLE_MULTI_TAB', bool)
    }
  }
}

export default app
