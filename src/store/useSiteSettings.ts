import { computed } from 'vue';
import { systemConfig } from '@/store/reactiveState'

export default () => {
  const layoutMode = computed(() => systemConfig.state.layout)
  const navTheme = computed(() => systemConfig.state.theme)
  const primaryColor = computed(() => systemConfig.state.color)
  const colorWeak = computed(() => systemConfig.state.weak)
  const grayMode = computed(() => systemConfig.state.gray)
  const fixedHeader = computed(() => systemConfig.state.fixedHeader)
  const fixSiderbar = computed(() => systemConfig.state.fixSiderbar)
  const fixSidebar = computed(() => systemConfig.state.fixSiderbar)
  const contentWidth = computed(() => systemConfig.state.contentWidth)
  const autoHideHeader = computed(() => systemConfig.state.autoHideHeader)
  const sidebarOpened = computed(() => systemConfig.state.sidebar)
  const multiTab = computed(() => systemConfig.state.multiTab)
  const device = computed(() => systemConfig.state.device)
  const darkMode = computed(() => systemConfig.state.darkMode)
  const lockScreen = computed(() => systemConfig.state.lockScreen)

  const isTopMenu = () => layoutMode.value === 'topmenu'
  const isSideMenu = () => !isTopMenu()

  return {
    layoutMode, navTheme, primaryColor, colorWeak, grayMode, fixedHeader, fixSiderbar, fixSidebar, contentWidth, autoHideHeader, sidebarOpened, multiTab, device, darkMode, lockScreen, isTopMenu, isSideMenu
  }
}
