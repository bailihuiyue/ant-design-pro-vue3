<template>
  <SettingItem :title="$t('settingDrawer.otherSettings')">
    <div>
      <a-list :split="false">
        <!-- 内容区域宽度  -->
        <a-list-item>
          <template #actions>
            <a-switch size="small" :checked="colorWeak" @change="onColorWeak" />
          </template>
          <a-list-item-meta>
            <template #title>{{ $t('settingDrawer.colorBlindness') }}</template>
          </a-list-item-meta>
        </a-list-item>
        <a-list-item>
          <template #actions>
            <a-switch size="small" :checked="grayMode" @change="onGrayMode" />
          </template>
          <a-list-item-meta>
            <template #title>{{ $t('settingDrawer.grayMode') }}</template>
          </a-list-item-meta>
        </a-list-item>
        <a-list-item>
          <template #actions>
            <a-switch size="small" :checked="multiTab" @change="onMultiTab" />
          </template>
          <a-list-item-meta>
            <template #title>{{ $t('settingDrawer.multiTab') }}</template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </SettingItem>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { TOGGLE_WEAK, TOGGLE_GRAY, TOGGLE_MULTI_TAB } from '@/store/mutation-types'
import { colorWeak, grayMode, multiTab } from '@/store/useSiteSettings'
import { CheckOutlined } from '@ant-design/icons-vue'
import { updateColorWeak, updateGrayMode } from '../settingConfig'
import SettingItem from './SettingItem.vue'

export default defineComponent({
  components: {
    CheckOutlined,
    SettingItem
  },
  setup() {
    const { commit } = useStore()

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
