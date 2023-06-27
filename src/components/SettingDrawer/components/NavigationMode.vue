<template>
  <SettingItem :title="$t('settingDrawer.navigationMode')">
    <div class="setting-drawer-index-blockChecbox">
      <a-tooltip>
        <template #title>{{ $t('settingDrawer.sidebarNavigater') }}</template>
        <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
          <img src="../icons/sideMenu.svg" alt="sidemenu" />
          <div class="setting-drawer-index-selectIcon" v-if="layoutMode === 'sidemenu'">
            <CheckOutlined />
          </div>
        </div>
      </a-tooltip>

      <a-tooltip>
        <template #title>{{ $t('settingDrawer.topNavigater') }}</template>
        <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
          <img src="../icons/topMenu.svg" alt="topmenu" />
          <div class="setting-drawer-index-selectIcon" v-if="layoutMode !== 'sidemenu'">
            <CheckOutlined />
          </div>
        </div>
      </a-tooltip>
    </div>
  </SettingItem>
</template>
<script lang="ts" setup name="NavigationMode">
import { systemConfig } from '@/store/reactiveState'
import { TOGGLE_LAYOUT_MODE, TOGGLE_FIXED_SIDERBAR } from '@/store/mutation-types'
import useSiteSettings from '@/store/useSiteSettings'
import { CheckOutlined } from '@ant-design/icons-vue'
import SettingItem from './SettingItem.vue'

const { layoutMode } = useSiteSettings()
const handleLayout = (mode) => {
  systemConfig.commit(TOGGLE_LAYOUT_MODE, mode)
  // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
  handleFixSiderbar(false)
}

const handleFixSiderbar = (fixed) => {
  if (systemConfig.state.layout === 'topmenu') {
    systemConfig.commit(TOGGLE_FIXED_SIDERBAR, false)
    return
  }
  systemConfig.commit(TOGGLE_FIXED_SIDERBAR, fixed)
}
</script>
<style lang="less" scoped>
</style>
