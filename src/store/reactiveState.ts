import { ref, reactive } from 'vue'
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

export const globalLoading = ref(false)

export const systemConfig = {
    state: reactive({
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
    }),
    commit: (field, type) => {
        const fun = {
            [SET_SIDEBAR_TYPE]: (type) => {
                systemConfig.state.sidebar = type
                cache({ [SET_SIDEBAR_TYPE]: type })
            },
            [CLOSE_SIDEBAR]: (state) => {
                cache({ [CLOSE_SIDEBAR]: true })
                systemConfig.state.sidebar = false
            },
            [TOGGLE_DEVICE]: (device) => {
                systemConfig.state.device = device
            },
            // 深浅主题
            [TOGGLE_THEME]: (theme) => {
                cache({ [TOGGLE_THEME]: theme })
                systemConfig.state.theme = theme

                // 开启深浅主题时关闭黑夜模式
                if (systemConfig.state.darkMode) {
                    setDarkMode(false)
                }
            },
            [SET_DARK_MODE]: (isDark) => {
                setDarkMode(isDark)
                // 开启黑夜模式时设置主题为黑色
                if (isDark) {
                    systemConfig.state.theme = 'dark'
                }
            },
            [TOGGLE_LAYOUT_MODE]: (layout) => {
                // 左侧菜单的话就用流式布局
                if (layout === 'sidemenu') {
                    systemConfig.state.contentWidth = 'Fluid'
                    cache({ [TOGGLE_CONTENT_WIDTH]: 'Fluid' })
                }
                cache({ [TOGGLE_LAYOUT_MODE]: layout })
                systemConfig.state.layout = layout
            },
            [TOGGLE_FIXED_HEADER]: (fixed) => {
                cache({ [TOGGLE_FIXED_HEADER]: fixed })
                systemConfig.state.fixedHeader = fixed
            },
            [TOGGLE_FIXED_SIDERBAR]: (fixed) => {
                cache({ [TOGGLE_FIXED_SIDERBAR]: fixed })
                systemConfig.state.fixSiderbar = fixed
            },
            [TOGGLE_FIXED_HEADER_HIDDEN]: (show) => {
                cache({ [TOGGLE_FIXED_HEADER_HIDDEN]: show })
                systemConfig.state.autoHideHeader = show
            },
            [TOGGLE_CONTENT_WIDTH]: (type) => {
                cache({ [TOGGLE_CONTENT_WIDTH]: type })
                systemConfig.state.contentWidth = type
            },
            [TOGGLE_COLOR]: (color) => {
                cache({ [TOGGLE_COLOR]: color })
                systemConfig.state.color = color

                // menuIconColorPatch(color)
            },
            [TOGGLE_WEAK]: (flag) => {
                cache({ [TOGGLE_WEAK]: flag })
                systemConfig.state.weak = flag
            },
            [TOGGLE_GRAY]: (flag) => {
                cache({ [TOGGLE_GRAY]: flag })
                systemConfig.state.gray = flag
            },
            [TOGGLE_MULTI_TAB]: (bool) => {
                cache({ [TOGGLE_MULTI_TAB]: bool })
                systemConfig.state.multiTab = bool
            },
            [SET_SETTING_DRAWER]: (type) => {
                systemConfig.state.showSettings = type
            },
            [SET_LOCK_SCREEN]: (flag) => {
                systemConfig.state.lockScreen = flag
                cache({ [SET_LOCK_SCREEN]: flag })
                document.getElementById('app')!.style.overflow = flag ? 'hidden' : 'visible'
            },
        }
        fun[field](type)
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

function setDarkMode(isDark) {
    cache({ [SET_DARK_MODE]: isDark })
    updateDarkMode(isDark)
    systemConfig.state.darkMode = isDark
}
