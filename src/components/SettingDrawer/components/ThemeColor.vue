<template>
  <SettingItem :title="$t('settingDrawer.theme')">
    <div style="height: 20px">
      <a-tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in colorList" :key="index">
        <template #title>{{ item.key }}</template>
        <a-tag :color="item.color" @click="changeColor(item.color)">
          <CheckOutlined v-if="item.color === primaryColor" />
        </a-tag>
      </a-tooltip>
      <!-- 自定义颜色 -->
      <a-popover title="自定义" overlayClassName="themeColorCustomColor" placement="bottomRight">
        <template #content>
          <ColorPicker @change="changeColor" format="hex" disableHistory disableAlpha />
        </template>
        <a-tag :color="isCustomColor ? primaryColor : ''" class="setting-drawer-theme-color-colorBlock">
          <CheckOutlined v-if="isCustomColor" />
        </a-tag>
      </a-popover>
    </div>
  </SettingItem>
</template>
<script lang="ts" setup name="ThemeColor">
import { computed } from 'vue'
import { systemConfig } from '@/store/reactiveState'
import { THEME_COLOR } from '@/store/mutation-types'
import { CheckOutlined } from '@ant-design/icons-vue'
import { colorList } from '../settingConfig'
import useSiteSettings from '@/store/useSiteSettings'
import SettingItem from './SettingItem.vue'
import ColorPicker from '@/components/ColorPicker/index.vue'

const { primaryColor } = useSiteSettings()

const changeColor = (color) => {
    systemConfig.commit(THEME_COLOR, color)
}

const colorArr = colorList.map((item) => item.color)
const isCustomColor = computed(() => {
  return !colorArr.includes(systemConfig.state.color+'')
})
</script>
<style lang="less" scoped>
.setting-drawer-theme-color-colorBlock {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  float: left;
  cursor: pointer;
  margin-right: 8px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: center;
  color: #fff;
  font-weight: 700;

  i {
    font-size: 14px;
  }
}
</style>
