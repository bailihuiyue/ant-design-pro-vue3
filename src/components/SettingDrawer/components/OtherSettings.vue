<template>
  <SettingItem :title="$t('SettingDrawer.otherSettings')">
    <div>
      <a-list :split="false">
        <!-- 内容区域宽度  -->
        <a-list-item>
          <template #actions>
            <a-switch size="small" v-model:checked="colorWeak" @change="onColorWeak" />
          </template>
          <a-list-item-meta>
            <template #title>{{ $t('SettingDrawer.colorBlindness') }}</template>
          </a-list-item-meta>
        </a-list-item>
        <a-list-item>
          <template #actions>
            <a-switch size="small" v-model:checked="grayMode" @change="onGrayMode" />
          </template>
          <a-list-item-meta>
            <template #title>{{ $t('SettingDrawer.grayMode') }}</template>
          </a-list-item-meta>
        </a-list-item>
        <a-list-item>
          <template #actions>
            <a-switch size="small" v-model:checked="multiTab" @change="onMultiTab" />
          </template>
          <a-list-item-meta>
            <template #title>{{ $t('SettingDrawer.multiTab') }}</template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </SettingItem>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { TOGGLE_WEAK, TOGGLE_GRAY, TOGGLE_MULTI_TAB } from '@/store/mutation-types'
import { colorWeak, grayMode, multiTab } from '@/store/useSiteSettings'
import { CheckOutlined } from '@ant-design/icons-vue'
import { updateColorWeak, updateGrayMode } from '../settingConfig'
import SettingItem from './SettingItem.vue'
import config from '@/config/defaultSettings'

export default defineComponent({
  components: {
    CheckOutlined,
    SettingItem
  },
  setup() {
    const { state, commit } = useStore()

    onMounted(() => {
      if (state.app.colorWeak !== config.colorWeak) {
        updateColorWeak(state.colorWeak)
      }
      if (state.app.grayMode !== config.grayMode) {
        updateGrayMode(state.grayMode)
      }
    })

    const onColorWeak = (checked) => {
      commit(TOGGLE_WEAK, checked)
      updateColorWeak(checked)
    }

    const onGrayMode = (checked) => {
      commit(TOGGLE_GRAY, checked)
      updateGrayMode(checked)
    }

    const onMultiTab = (checked) => {
      commit(TOGGLE_MULTI_TAB, checked)
    }
    return {
      onColorWeak,
      onGrayMode,
      colorWeak,
      grayMode,
      multiTab,
      onMultiTab
    }
  }
})
</script>
<style lang="less">
</style>
