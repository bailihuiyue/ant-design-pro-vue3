<template>
  <div class="setting-drawer">
    <a-drawer width="320" placement="right" @close="onClose" :closable="isMobile" :visible="systemConfig.state.showSettings">
      <div class="setting-drawer-index-content">
        <!-- 整体风格设置 -->
        <GlobalStyle />
        <!-- 主题色 -->
        <ThemeColor />
        <!-- 导航模式 -->
        <NavigationMode />
        <!-- 布局设置 -->
        <LayoutSettings />
        <!-- 其他设置 -->
        <OtherSettings />
      </div>

      <div :style="{ marginBottom: '24px' }">
        <a-button @click="doCopy" block>
          <template #icon>
            <span>
              <CopyOutlined style="margin-right:5px" /> {{ $t('settingDrawer.copySettings') }}
            </span>
          </template>
        </a-button>
        <a-alert type="warning" :style="{ marginTop: '24px' }" v-if="isDev">
          <template #message>
            <span>
              {{ $t('settingDrawer.words') }}
              <a href="https://github.com/bailihuiyue/ant-design-pro-vue3/blob/main/src/config/defaultSettings.ts"
                target="_blank">src/config/defaultSettings.ts</a>
            </span>
          </template>
        </a-alert>
      </div>

      <template #handle>
        <div class="setting-drawer-index-handle" v-if="systemConfig.state.showSettings" @click="onClose">
          <CloseOutlined style="color: #fff" />
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup name="SettingDrawer">
import { systemConfig } from '@/store/reactiveState'
import { CloseOutlined, CopyOutlined } from '@ant-design/icons-vue'
import { SET_SETTING_DRAWER } from '@/store/mutation-types'
import useClipboard from 'vue-clipboard3'
import { message } from 'ant-design-vue'
import { isDev } from '@/utils/util'
import GlobalStyle from './components/GlobalStyle.vue'
import ThemeColor from './components/ThemeColor.vue'
import NavigationMode from './components/NavigationMode.vue'
import LayoutSettings from './components/LayoutSettings.vue'
import OtherSettings from './components/OtherSettings.vue'
import { isMobile } from '@/utils/device'

const { toClipboard } = useClipboard()

const onClose = () => {
  systemConfig.commit([SET_SETTING_DRAWER],false)
}
const doCopy = () => {
  // get current settings from mixin or this.$store.state.app, pay attention to the property name
  const text = `export default {
  primaryColor: '${systemConfig.state.color}', // primary color of ant design
  navTheme: '${systemConfig.state.theme}', // theme for nav menu
  layout: '${systemConfig.state.layout}', // nav menu position: sidemenu or topmenu
  contentWidth: '${systemConfig.state.contentWidth}', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: ${systemConfig.state.fixedHeader}, // sticky header
  fixSiderbar: ${systemConfig.state.fixSiderbar}, // sticky siderbar
  autoHideHeader: ${systemConfig.state.autoHideHeader}, //  auto hide header
  colorWeak: ${systemConfig.state.weak},
  grayMode: ${systemConfig.state.gray},
  multiTab: ${systemConfig.state.multiTab},
  // vue-ls options
  storage: {
    namespace: 'PRO_'
  },
}`
  toClipboard(text)
    .then((msg) => {
      message.success('复制完毕')
    })
    .catch((err) => {
      message.error('复制失败' + err)
    })
}
</script>

<style lang="less" scoped>
@import '../../style/index.less';

.setting-drawer-index-content {
  ::v-deep(.setting-drawer-index-blockChecbox) {
    display: flex;

    .setting-drawer-index-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 48px;
      }

      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: @primary-color;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
}

.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: @primary-color;
  width: 48px;
  height: 48px;
  right: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>
