<template>
  <div class="setting-drawer">
    <a-drawer
      width="300"
      placement="right"
      @close="onClose"
      :closable="false"
      :visible="state.app.showSettings"
    >
      <div class="setting-drawer-index-content">
        <!-- 导航模式 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">{{ $t('SettingDrawer.globalStyleSetting') }}</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template #title>{{ $t('SettingDrawer.darkStyle') }}</template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img src="./icons/darkMenu.svg" alt="dark" />
                <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'">
                  <CheckOutlined />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template #title>{{ $t('SettingDrawer.lightStyle') }}</template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img src="./icons/lightMenu.svg" alt="light" />
                <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'light'">
                  <CheckOutlined />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template #title>{{ $t('SettingDrawer.darkMode') }}</template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('realDark')">
                <img src="./icons/darkTheme.svg" alt="dark theme" />
                <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'realDark'">
                  <CheckOutlined />
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>
        <!-- 主题色 -->
        <div style="margin-bottom: 24px">
          <h3 class="setting-drawer-index-title">{{ $t('SettingDrawer.theme') }}</h3>
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
        </div>
        <a-divider />
        <!-- 导航模式 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">{{ $t('SettingDrawer.navigationMode') }}</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template #title>{{ $t('SettingDrawer.sidebarNavigater') }}</template>
              <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                <img src="./icons/sideMenu.svg" alt="sidemenu" />
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode === 'sidemenu'">
                  <CheckOutlined />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template #title>{{ $t('SettingDrawer.topNavigater') }}</template>
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img src="./icons/topMenu.svg" alt="topmenu" />
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode !== 'sidemenu'">
                  <CheckOutlined />
                </div>
              </div>
            </a-tooltip>
          </div>

          <!-- 布局设置 -->
          <a-divider />
          <div :style="{ marginTop: '24px' }">
            <h3 class="setting-drawer-index-title">{{ $t('SettingDrawer.otherSettings') }}</h3>
            <a-list :split="false">
              <!-- 内容区域宽度 -->
              <a-list-item>
                <template #actions>
                  <a-tooltip>
                    <template #title>{{ $t('SettingDrawer.onlyValid') }}</template>
                    <a-select
                      size="small"
                      style="width: 80px"
                      :defaultValue="contentWidth"
                      @change="handleContentWidthChange"
                    >
                      <a-select-option value="Fixed">{{
                        $t('SettingDrawer.fixation')
                      }}</a-select-option>
                      <a-select-option value="Fluid" v-if="layoutMode !== 'sidemenu'">{{
                        $t('SettingDrawer.fluid')
                      }}</a-select-option>
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
                  <a-switch
                    size="small"
                    v-model:checked="fixedHeader"
                    @change="handleFixedHeader"
                  />
                </template>
                <a-list-item-meta>
                  <template #title>{{ $t('SettingDrawer.fixHeader') }}</template>
                </a-list-item-meta>
              </a-list-item>
              <!-- 固定 Header 时可配置 -->
              <a-list-item>
                <template #actions>
                  <a-switch
                    slot="actions"
                    size="small"
                    :disabled="!fixedHeader"
                    v-model:checked="autoHideHeader"
                    @change="handleFixedHeaderHidden"
                  />
                </template>
                <a-list-item-meta>
                  <template #title>
                    <a-tooltip placement="left">
                      <template #title>
                        <div :style="{ opacity: !fixedHeader ? '0.5' : '1' }">
                          {{ $t('SettingDrawer.hideHeaders') }}
                        </div>
                      </template>
                      {{ $t('SettingDrawer.configurableWhenFixingHeaders') }}
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
                    v-model:checked="fixSiderbar"
                    @change="handleFixSiderbar"
                  />
                </template>
                <a-list-item-meta>
                  <template
                    #title
                    :style="{ textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset' }"
                  >
                    {{ $t('SettingDrawer.fixedSideMenu') }}
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />

        <!-- 其他设置 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">{{ $t('SettingDrawer.otherSettings') }}</h3>
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
        </div>

        <!-- 试验功能 -->
        <!-- <a-divider />
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">{{ $t('SettingDrawer.testFun') }}</h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <template #actions>
                  <a-switch size="small" v-model:checked="darkMode" @change="onDarkMode" />
                </template>
                <a-list-item-meta>
                  <template #title>{{ $t('SettingDrawer.darkMode') }}</template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div> -->
        <a-divider />
        <div :style="{ marginBottom: '24px' }">
          <a-button @click="doCopy" block>
            <template #icon>
              <CopyOutlined />
              {{ $t('SettingDrawer.copySettings') }}
            </template>
          </a-button>
          <a-alert type="warning" :style="{ marginTop: '24px' }" v-if="isDev">
            <template #message>
              <span>
                {{ $t('SettingDrawer.words') }}
                <a
                  href="https://github.com/bailihuiyue/ant-design-pro-vue3/blob/main/src/config/defaultSettings.ts"
                  target="_blank"
                  >src/config/defaultSettings.ts</a
                >
              </span>
            </template>
          </a-alert>
        </div>
      </div>
      <template #handle>
        <div class="setting-drawer-index-handle" v-if="state.app.showSettings" @click="onClose">
          <CloseOutlined style="color: #fff" />
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts">
// TODO:1.文件过长,考虑拆分 2.修复各按钮逻辑 3.增加自定义颜色
import SettingItem from './SettingItem.vue';
import config from '@/config/defaultSettings';
import {
  updateTheme,
  updateColorWeak,
  colorList,
  updateGrayMode,
  updateDarkMode,
} from './settingConfig';
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import { CheckOutlined, CloseOutlined, CopyOutlined } from '@ant-design/icons-vue';
import {
  SET_SETTING_DRAWER,
  TOGGLE_WEAK,
  TOGGLE_GRAY,
  TOGGLE_MULTI_TAB,
  TOGGLE_THEME,
  TOGGLE_LAYOUT_MODE,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_COLOR,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_HEADER_HIDDEN,
  TOGGLE_FIXED_SIDERBAR,
  SET_DARK_MODE,
} from '@/store/mutation-types';
import {
  multiTab,
  layoutMode,
  contentWidth,
  fixedHeader,
  navTheme,
  primaryColor,
  autoHideHeader,
  fixSiderbar,
  colorWeak,
  darkMode,
  grayMode,
} from '@/store/useSiteSettings';
import useClipboard from 'vue-clipboard3';
import { message } from 'ant-design-vue';
import { isDev } from '@/utils/util';

export default defineComponent({
  components: {
    SettingItem,
    CheckOutlined,
    CloseOutlined,
    CopyOutlined,
  },
  setup() {
    const { state, commit } = useStore();
    const { toClipboard } = useClipboard();

    onMounted(() => {
      updateTheme(state.primaryColor);
      if (state.app.colorWeak !== config.colorWeak) {
        updateColorWeak(state.colorWeak);
      }
      if (state.app.grayMode !== config.grayMode) {
        updateGrayMode(state.grayMode);
      }
      if (state.app.darkMode !== config.darkMode) {
        updateDarkMode(state.darkMode);
      }
    });

    const onClose = () => {
      commit(SET_SETTING_DRAWER, false);
    };
    const onColorWeak = (checked) => {
      commit(TOGGLE_WEAK, checked);
      updateColorWeak(checked);
    };
    const onGrayMode = (checked) => {
      commit(TOGGLE_GRAY, checked);
      updateGrayMode(checked);
    };
    const onMultiTab = (checked) => {
      commit(TOGGLE_MULTI_TAB, checked);
    };
    const handleMenuTheme = (theme) => {
      commit(TOGGLE_THEME, theme);
    };
    const doCopy = () => {
      // get current settings from mixin or this.$store.state.app, pay attention to the property name
      const text = `export default {
  primaryColor: '${state.app.primaryColor}', // primary color of ant design
  navTheme: '${state.app.navTheme}', // theme for nav menu
  layout: '${state.app.layoutMode}', // nav menu position: sidemenu or topmenu
  contentWidth: '${state.app.contentWidth}', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: ${state.app.fixedHeader}, // sticky header
  fixSiderbar: ${state.app.fixSiderbar}, // sticky siderbar
  autoHideHeader: ${state.app.autoHideHeader}, //  auto hide header
  colorWeak: ${state.app.colorWeak},
  grayMode: ${state.app.grayMode},
  multiTab: ${state.app.multiTab},
  // vue-ls options
  storage: {
    namespace: 'PRO_'
  },
}`;
      toClipboard(text)
        .then((msg) => {
          message.success('复制完毕');
        })
        .catch((err) => {
          message.error('复制失败' + err);
        });
    };
    const handleLayout = (mode) => {
      commit(TOGGLE_LAYOUT_MODE, mode);
      // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
      handleFixSiderbar(false);
    };
    const handleContentWidthChange = (type) => {
      commit(TOGGLE_CONTENT_WIDTH, type);
    };
    const changeColor = (color) => {
      if (state.app.primaryColor !== color) {
        commit(TOGGLE_COLOR, color);
        updateTheme(color);
      }
    };
    const handleFixedHeader = (fixed) => {
      commit(TOGGLE_FIXED_HEADER, fixed);
    };
    const handleFixedHeaderHidden = (autoHidden) => {
      commit(TOGGLE_FIXED_HEADER_HIDDEN, autoHidden);
    };
    const handleFixSiderbar = (fixed) => {
      if (state.app.layoutMode === 'topmenu') {
        commit(TOGGLE_FIXED_SIDERBAR, false);
        return;
      }
      commit(TOGGLE_FIXED_SIDERBAR, fixed);
    };
    const onDarkMode = (checked) => {
      commit(SET_DARK_MODE, checked);
    };

    return {
      colorList,
      state,
      onClose,
      onColorWeak,
      onGrayMode,
      onMultiTab,
      handleMenuTheme,
      doCopy,
      handleLayout,
      changeColor,
      handleFixedHeader,
      handleFixedHeaderHidden,
      handleFixSiderbar,
      handleContentWidthChange,
      onDarkMode,
      multiTab,
      layoutMode,
      contentWidth,
      fixedHeader,
      navTheme,
      primaryColor,
      autoHideHeader,
      fixSiderbar,
      colorWeak,
      darkMode,
      grayMode,
      isDev,
    };
  },
});
</script>

<style lang="less" scoped>
.setting-drawer-index-content {
  .setting-drawer-index-blockChecbox {
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
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
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
}

.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  right: 300px;
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
