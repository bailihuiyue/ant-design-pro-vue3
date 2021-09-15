<template>
  <SettingItem :title="$t('SettingDrawer.layoutSettings')">
    <a-list :split="false">
      <!-- 内容区域宽度 -->
      <a-list-item>
        <template #actions>
          <a-tooltip>
            <template #title>{{ $t('SettingDrawer.onlyValid') }}</template>
            <a-select
              size="small"
              style="width: 80px"
              :value="contentWidth"
              @change="handleContentWidthChange"
              :disabled="layoutMode === 'sidemenu'"
            >
              <a-select-option value="Fluid">{{$t('SettingDrawer.fluid')}}</a-select-option>
              <a-select-option value="Fixed">{{ $t('SettingDrawer.fixation')}}</a-select-option>
            </a-select>
          </a-tooltip>
        </template>
        <a-list-item-meta>
          <template #title>{{ $t('SettingDrawer.contentWidth') }}</template>
        </a-list-item-meta>
      </a-list-item>
      <!-- 固定 Header -->
      <a-list-item>
        <template #actions>
          <a-switch size="small" :checked="fixedHeader" @change="handleFixedHeader" />
        </template>
        <a-list-item-meta>
          <template #title>{{ $t('SettingDrawer.fixHeader') }}</template>
        </a-list-item-meta>
      </a-list-item>
      <!-- 下滑时隐藏 Header -->
      <a-list-item>
        <template #actions>
          <a-switch
            slot="actions"
            size="small"
            :disabled="!fixedHeader"
            :checked="autoHideHeader"
            @change="handleFixedHeaderHidden"
          />
        </template>
        <a-list-item-meta>
          <template #title>
            <a-tooltip placement="left">
              <template #title>{{ $t('SettingDrawer.configurableWhenFixingHeaders') }}</template>
              <div
                :style="{ opacity: !fixedHeader ? '0.5' : '1' }"
              >{{ $t('SettingDrawer.hideHeaders') }}</div>
            </a-tooltip>
          </template>
        </a-list-item-meta>
      </a-list-item>
      <!-- 固定侧边菜单 -->
      <a-list-item>
        <template #actions>
          <a-switch
            slot="actions"
            size="small"
            :disabled="layoutMode === 'topmenu'"
            :checked="fixSiderbar"
            @change="handleFixSiderbar"
          />
        </template>
        <a-list-item-meta>
          <template
            #title
            :style="{ textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset' }"
          >{{ $t('SettingDrawer.fixedSideMenu') }}</template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </SettingItem>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import {
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_HEADER_HIDDEN,
  TOGGLE_FIXED_SIDERBAR
} from '@/store/mutation-types'
import {
  contentWidth,
  layoutMode,
  fixedHeader,
  autoHideHeader,
  fixSiderbar
} from '@/store/useSiteSettings'
import { CheckOutlined } from '@ant-design/icons-vue'
import SettingItem from './SettingItem.vue'

export default defineComponent({
  components: {
    CheckOutlined,
    SettingItem
  },
  setup() {
    const { state, commit } = useStore()

    const handleContentWidthChange = (type) => {
      commit(TOGGLE_CONTENT_WIDTH, type)
    }

    const handleFixedHeader = (fixed) => {
      commit(TOGGLE_FIXED_HEADER, fixed)
    }

    const handleFixedHeaderHidden = (autoHidden) => {
      commit(TOGGLE_FIXED_HEADER_HIDDEN, autoHidden)
    }

    const handleFixSiderbar = (fixed) => {
      if (state.app.layoutMode === 'topmenu') {
        commit(TOGGLE_FIXED_SIDERBAR, false)
        return
      }
      commit(TOGGLE_FIXED_SIDERBAR, fixed)
    }
    return {
      handleContentWidthChange,
      contentWidth,
      layoutMode,
      fixedHeader,
      handleFixedHeader,
      autoHideHeader,
      handleFixedHeaderHidden,
      fixSiderbar,
      handleFixSiderbar
    }
  }
})
</script>
<style lang="less">
</style>
