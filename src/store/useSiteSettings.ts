import { computed } from 'vue';
import { useStore } from 'vuex'

export default () => {
  const { state } = useStore()

  const layoutMode = computed(() => state.app.layout)
  const navTheme = computed(() => state.app.theme)
  const primaryColor = computed(() => state.app.color)
  const colorWeak = computed(() => state.app.weak)
  const grayMode = computed(() => state.app.gray)
  const fixedHeader = computed(() => state.app.fixedHeader)
  const fixSiderbar = computed(() => state.app.fixSiderbar)
  const fixSidebar = computed(() => state.app.fixSiderbar)
  const contentWidth = computed(() => state.app.contentWidth)
  const autoHideHeader = computed(() => state.app.autoHideHeader)
  const sidebarOpened = computed(() => state.app.sidebar)
  const multiTab = computed(() => state.app.multiTab)
  const device = computed(() => state.app.device)
  const darkMode = computed(() => state.app.darkMode)
  const lockScreen = computed(() => state.app.lockScreen)

  const isTopMenu = () => layoutMode.value === 'topmenu'
  const isSideMenu = () => !isTopMenu()

  return {
    layoutMode, navTheme, primaryColor, colorWeak, grayMode, fixedHeader, fixSiderbar, fixSidebar, contentWidth, autoHideHeader, sidebarOpened, multiTab, device, darkMode, lockScreen, isTopMenu, isSideMenu
  }
}
