<template>
  <SettingItem :title="$t('settingDrawer.globalStyleSetting')">
    <div class="setting-drawer-index-blockChecbox">
      <a-tooltip>
        <template #title>{{ $t('settingDrawer.darkStyle') }}</template>
        <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
          <img src="../icons/darkMenu.svg" alt="dark" />
          <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark' && !darkMode">
            <CheckOutlined />
          </div>
        </div>
      </a-tooltip>

      <a-tooltip>
        <template #title>{{ $t('settingDrawer.lightStyle') }}</template>
        <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
          <img src="../icons/lightMenu.svg" alt="light" />
          <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'light'">
            <CheckOutlined />
          </div>
        </div>
      </a-tooltip>

      <a-tooltip>
        <template #title>{{ $t('settingDrawer.darkMode') }}</template>
        <div class="setting-drawer-index-item" @click="handleDarkMode(true)">
          <img src="../icons/darkTheme.svg" alt="dark theme" />
          <div class="setting-drawer-index-selectIcon" v-if="darkMode">
            <CheckOutlined />
          </div>
        </div>
      </a-tooltip>
    </div>
  </SettingItem>
</template>
<script lang="ts" setup name="GlobalStyle">
import { systemConfig } from '@/store/reactiveState'
import { TOGGLE_THEME, SET_DARK_MODE } from '@/store/mutation-types'
import useSiteSettings from '@/store/useSiteSettings'
import { CheckOutlined } from '@ant-design/icons-vue'
import SettingItem from './SettingItem.vue'

const { navTheme, darkMode } = useSiteSettings()

const handleMenuTheme = (theme) => {
  systemConfig.commit(TOGGLE_THEME, theme)
}

const handleDarkMode = (isDark) => {
  systemConfig.commit(SET_DARK_MODE, isDark)
}
</script>
<style lang="less" scoped>
</style>
