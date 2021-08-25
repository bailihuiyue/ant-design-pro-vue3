<template>
  <SettingItem :title="$t('SettingDrawer.globalStyleSetting')">
    <div class="setting-drawer-index-blockChecbox">
      <a-tooltip>
        <template #title>{{ $t('SettingDrawer.darkStyle') }}</template>
        <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
          <img src="../icons/darkMenu.svg" alt="dark" />
          <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'&&!darkMode">
            <CheckOutlined />
          </div>
        </div>
      </a-tooltip>

      <a-tooltip>
        <template #title>{{ $t('SettingDrawer.lightStyle') }}</template>
        <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
          <img src="../icons/lightMenu.svg" alt="light" />
          <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'light'">
            <CheckOutlined />
          </div>
        </div>
      </a-tooltip>

      <a-tooltip>
        <template #title>{{ $t('SettingDrawer.darkMode') }}</template>
        <div class="setting-drawer-index-item" @click="handleDarkMode('realDark')">
          <img src="../icons/darkTheme.svg" alt="dark theme" />
          <div class="setting-drawer-index-selectIcon" v-if="darkMode">
            <CheckOutlined />
          </div>
        </div>
      </a-tooltip>
    </div>
  </SettingItem>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { TOGGLE_THEME, SET_DARK_MODE } from '@/store/mutation-types'
import { navTheme, darkMode } from '@/store/useSiteSettings'
import { CheckOutlined } from '@ant-design/icons-vue'
import SettingItem from './SettingItem.vue'
import config from '@/config/defaultSettings'
import { updateDarkMode } from '../settingConfig'

export default defineComponent({
  components: {
    CheckOutlined,
    SettingItem
  },
  setup() {
    const { state, commit } = useStore()

    onMounted(() => {
      if (state.app.darkMode !== config.darkMode) {
        updateDarkMode(state.darkMode)
      }
    })

    const handleMenuTheme = (theme) => {
      commit(TOGGLE_THEME, theme)
    }

    const handleDarkMode = (isDark) => {
      commit(SET_DARK_MODE, isDark)
    }

    return {
      handleMenuTheme,
      handleDarkMode,
      navTheme,
      darkMode
    }
  }
})
</script>
<style lang="less" scoped>
</style>
