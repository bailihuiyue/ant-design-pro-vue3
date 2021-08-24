<template>
  <SettingItem :title="$t('SettingDrawer.theme')">
    <div style="height: 20px">
      <a-tooltip
        class="setting-drawer-theme-color-colorBlock"
        v-for="(item, index) in colorList"
        :key="index"
      >
        <template #title>{{ item.key }}</template>
        <a-tag :color="item.color" @click="changeColor(item.color)">
          <CheckOutlined v-if="item.color === primaryColor" />
        </a-tag>
      </a-tooltip>
    </div>
  </SettingItem>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { TOGGLE_COLOR } from '@/store/mutation-types'
import { CheckOutlined } from '@ant-design/icons-vue'
import { colorList, updateTheme } from '../settingConfig'
import { primaryColor } from '@/store/useSiteSettings'
import SettingItem from './SettingItem.vue'

export default defineComponent({
  components: {
    CheckOutlined,
    SettingItem
  },
  setup() {
    const { state, commit } = useStore()

    const changeColor = (color) => {
      if (state.app.primaryColor !== color) {
        commit(TOGGLE_COLOR, color)
        updateTheme(color)
      }
    }

    onMounted(() => {
      updateTheme(state.primaryColor)
    })

    return {
      colorList,
      changeColor,
      primaryColor
    }
  }
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
