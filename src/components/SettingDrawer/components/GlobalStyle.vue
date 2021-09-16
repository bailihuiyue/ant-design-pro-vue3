<template>
  <SettingItem :title="$t('settingDrawer.globalStyleSetting')">
    <div class="setting-drawer-index-blockChecbox">
      <a-tooltip>
        <template #title>{{ $t('settingDrawer.darkStyle') }}</template>
        <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
          <img src="../icons/darkMenu.svg" alt="dark" />
          <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'&&!darkMode">
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
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { TOGGLE_THEME, SET_DARK_MODE } from '@/store/mutation-types'
import { navTheme, darkMode } from '@/store/useSiteSettings'
import { CheckOutlined } from '@ant-design/icons-vue'
import SettingItem from './SettingItem.vue'

export default defineComponent({
  components: {
    CheckOutlined,
    SettingItem
  },
  setup() {
    const { commit } = useStore()

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
