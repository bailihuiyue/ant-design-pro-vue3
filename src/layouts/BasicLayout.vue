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
        @refresh="onRefresh"
      />

      <!-- layout content -->
      <a-layout-content
        :style="{
          height: '100%',
          margin: '24px 24px 0',
          paddingTop: fixedHeader ? '64px' : '0',
        }"
      >
        <multi-tab v-if="multiTab"></multi-tab>
        <transition name="page-transition">
          <section>
            <route-view v-if="showRouter" />
          </section>
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>
      <FastDevelopBall />
      <setting-drawer></setting-drawer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue'
import { triggerWindowResizeEvent, isMobile, isDesktop } from '@/utils/device'
import RouteView from './RouteView.vue'
import MultiTab from '@/components/MultiTab/index.vue'
import SideMenu from '@/components/Menu/SideMenu.vue'
import GlobalHeader from '@/components/GlobalHeader/index.vue'
import GlobalFooter from '@/components/GlobalFooter/index.vue'
import SettingDrawer from '@/components/SettingDrawer/index.vue'
import { convertRoutes } from '@/router/generateAsyncRoutes'
import { filteRouterPermission } from '@/router/permission'
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
import { useRouter } from 'vue-router'
import emitter from '@/utils/eventBus'
import FastDevelopBall from '@/components/FastDevelopBall/index.vue'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    MultiTab,
    RouteView,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer,
    FastDevelopBall
  },
  setup() {
    const router = useRouter()
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
    // bug:TODO:克隆时报警告[Vue warn]: Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.目前还不知道解决方案
    const mainMenu = cloneDeep(router.getRoutes())
    const orginRoutes = filteRouterPermission(mainMenu, ls.get(PERMISSION))
    // 相对路径转绝对路径
    // 系统菜单以/为第一级,/外面的都不显示在菜单中,但是可以跳转到该路由
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
      store.commit(SET_SIDEBAR_TYPE, !collapsed.value)
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

    const showRouter = ref(true)
    const onRefresh = () => {
      emitter.all.clear()
      showRouter.value = false
      nextTick(() => (showRouter.value = true))
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
      isSideMenu,
      showRouter,
      onRefresh
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
