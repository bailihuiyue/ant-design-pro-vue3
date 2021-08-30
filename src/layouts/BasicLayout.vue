<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>

    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>
    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content
        :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }"
      >
        <multi-tab v-if="multiTab"></multi-tab>
        <transition name="page-transition">
          <section>
            <route-view />
          </section>
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

      <setting-drawer></setting-drawer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
// TODO:1.左侧菜单点击效果没有2.左侧菜单无效缩小
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue'
import { triggerWindowResizeEvent, isMobile, isDesktop } from '@/utils/device'
import RouteView from './RouteView.vue'
import MultiTab from '@/components/MultiTab/index.vue'
import SideMenu from '@/components/Menu/SideMenu.vue'
import GlobalHeader from '@/components/GlobalHeader/index.vue'
import GlobalFooter from '@/components/GlobalFooter/index.vue'
import SettingDrawer from '@/components/SettingDrawer/index.vue'
import { convertRoutes } from '@/router/generateAsyncRoutes'

import constantRouterMap from '@/router/commonRoutes'
import { filterAsyncRouter } from '@/router/permission'
import { PERMISSION, SET_SIDEBAR_TYPE } from '@/store/mutation-types'
import cloneDeep from 'lodash.clonedeep'
import {
  fixSidebar,
  sidebarOpened,
  multiTab,
  device,
  layoutMode,
  contentWidth,
  fixedHeader,
  navTheme,
  isSideMenu
} from '@/store/useSiteSettings'
import ls from '@/utils/Storage'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    MultiTab,
    RouteView,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer
  },
  setup() {
    const collapsed = ref(false)
    const menus = ref([])
    const store = useStore()
    const contentPaddingLeft = computed(() => {
      if (!fixSidebar.value || isMobile.value) {
        return '0'
      }
      if (sidebarOpened.value) {
        return '256px'
      }
      return '80px'
    })

    watch(
      () => sidebarOpened.value,
      (val) => {
        collapsed.value = !val
      }
    )

    // created()
    // TODO:菜单可能生成的不对
    const mainMenu = cloneDeep(constantRouterMap)
    const orginRoutes = filterAsyncRouter(mainMenu, ls.get(PERMISSION))
    const routes = convertRoutes(orginRoutes.find((item) => item.path === '/'))
    menus.value = (routes && routes.children) || []
    collapsed.value = !sidebarOpened.value

    onMounted(() => {
      const userAgent = navigator.userAgent
      if (userAgent.indexOf('Edge') > -1) {
        nextTick(() => {
          collapsed.value = !collapsed.value
          setTimeout(() => {
            collapsed.value = !collapsed.value
          }, 16)
        })
      }
    })

    const toggle = () => {
      collapsed.value = !collapsed.value
      store.dispatch(SET_SIDEBAR_TYPE, !collapsed.value)
      // TODO:未知用途
      triggerWindowResizeEvent()
    }
    const paddingCalc = () => {
      let left = ''
      if (sidebarOpened.value) {
        left = isDesktop.value ? '256px' : '80px'
      } else {
        left = (isMobile.value && '0') || (fixSidebar.value && '80px') || '0'
      }
      return left
    }
    const menuSelect = () => {}
    const drawerClose = () => {
      collapsed.value = false
    }
    return {
      collapsed,
      menus,
      contentPaddingLeft,
      orginRoutes,
      routes,
      toggle,
      paddingCalc,
      menuSelect,
      drawerClose,
      multiTab,
      device,
      layoutMode,
      contentWidth,
      fixedHeader,
      navTheme,
      isMobile,
      isSideMenu
    }
  }
})
</script>

<style lang="less">
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */
.page-transition-enter {
  opacity: 0;
}
.page-transition-leave-active {
  opacity: 0;
}
.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
