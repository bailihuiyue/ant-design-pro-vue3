<template>
  <div class="ant-pro-multi-tab">
    <div class="ant-pro-multi-tab-wrapper">
      <a-tabs
        hideAdd
        type="editable-card"
        v-model:activeKey="activeKey"
        :tabBarStyle="{margin: 0, paddingLeft: '16px', paddingTop: '1px' }"
        @edit="onEdit"
      >
        <a-tab-pane
          v-for="page in pages"
          :key="page.fullPath"
          :closable="pages.length > 1"
          style="height: 0"
        >
          <template #tab>
            <a-dropdown :trigger="['contextmenu']">
              <span :style="{ userSelect: 'none' }">{{page.meta.customTitle || $t(page.meta.title)}}</span>
              <template #overlay>
                <a-menu
                  @click="({ key, item, domEvent }) => {
                this.closeMenuClick(key, page.fullPath);
              }"
                >
                  <a-menu-item key="closeSelf">{{$t('multiTab.closeCurrent')}}</a-menu-item>
                  <a-menu-item key="closeRight">{{$t('multiTab.closeRight')}}</a-menu-item>
                  <a-menu-item key="closeLeft">{{$t('multiTab.closeLeft')}}</a-menu-item>
                  <a-menu-item key="closeAll">{{$t('multiTab.closeAll')}}</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, getCurrentInstance } from 'vue'
import { useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
import events from '@/utils/eventBus'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import './index.less'

export default defineComponent({
  name: 'MultiTab',
  setup() {
    let fullPathList: Array<string> = []
    const pages = reactive<Array<RouteLocationNormalizedLoaded>>([])
    const activeKey = ref('')
    const router = useRouter()
    const { t } = useI18n()
    const { ctx } = getCurrentInstance()

    const selectedLastPath = () => {
      activeKey.value = fullPathList[fullPathList.length - 1]
    }

    ;(function created() {
      // 全局的事件绑定用于页面内控制tab标签,暂时用不上
      // #region
      events.once('multiTab.open', (val) => {
        if (!val) {
          throw new Error(`multi-tab: open tab ${val} err`)
        }
        activeKey.value = val
      })
      events.once('multiTab.close', (val) => {
        if (!val) {
          closeSelf(activeKey.value)
          return
        }
        closeSelf(val)
      })
      events.once('multiTab.rename', ({ key, name }) => {
        console.log('rename', key, name)
        try {
          const item = pages.find((item) => item.path === key)
          item!.meta.customTitle = name
          ctx.$forceUpdate()
        } catch (e) {
          console.error(e)
        }
      })
      // #endregion

      pages.push(router.currentRoute.value)
      fullPathList.push(router.currentRoute.value.fullPath)
      selectedLastPath()
    })()

    const onEdit = (targetKey, action) => {
      ctx[action](targetKey)
    }
    const remove = (targetKey) => {
      const temp = pages.filter((page) => page.fullPath !== targetKey)
      pages.length = 0
      pages.push(...temp)
      fullPathList = fullPathList.filter((path) => path !== targetKey)
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!fullPathList.includes(activeKey.value)) {
        selectedLastPath()
      }
    }

    // content menu
    const closeSelf = (e) => {
      // 判断是否为最后一个标签页，如果是最后一个，则无法被关闭
      if (fullPathList.length > 1) {
        remove(e)
      } else {
        message.info(t('multiTab.cannotCloseLast'))
      }
    }
    const closeLeft = (e) => {
      const currentIndex = fullPathList.indexOf(e)
      if (currentIndex > 0) {
        fullPathList.forEach((item, index) => {
          if (index < currentIndex) {
            remove(item)
          }
        })
      } else {
        message.info(t('multiTab.noLeft'))
      }
    }
    const closeRight = (e) => {
      const currentIndex = fullPathList.indexOf(e)
      if (currentIndex < fullPathList.length - 1) {
        fullPathList.forEach((item, index) => {
          if (index > currentIndex) {
            remove(item)
          }
        })
      } else {
        message.info(t('multiTab.noRight'))
      }
    }
    const closeAll = (e) => {
      const currentIndex = fullPathList.indexOf(e)
      fullPathList.forEach((item, index) => {
        if (index !== currentIndex) {
          remove(item)
        }
      })
    }
    const closeMenuClick = (key: string, route) => {
      ctx[key](route)
    }

    watch(
      () => router.currentRoute.value,
      (newVal) => {
        activeKey.value = newVal.fullPath
        if (fullPathList.indexOf(newVal.fullPath) < 0) {
          fullPathList.push(newVal.fullPath)
          pages.push(newVal)
        }
      }
    )

    watch(activeKey, (newPathKey) => {
      router.push({ path: newPathKey })
    })

    return {
      fullPathList,
      pages,
      activeKey,
      onEdit,
      remove,
      selectedLastPath,
      closeSelf,
      closeLeft,
      closeRight,
      closeAll,
      closeMenuClick
    }
  }
})
</script>
<style lang="less">
.tab_style() {
  .ant-tabs-card-bar {
    padding-left: 0;
    .ant-tabs-nav-container {
      .ant-tabs-tab-prev:hover,
      .ant-tabs-tab-next:hover {
        // width: 22px;
        background-color: rgba(0, 0, 0, 0.03);
      }
      font-size: 13px;
      height: 39px;
    }
    .ant-tabs-tab {
      margin-right: 0;
      border-radius: 0px;
      border-top: 0px;
      line-height: 40px;
      .anticon-close {
        display: none;
      }
    }
    .ant-tabs-tab-active {
      padding-bottom: 0px;
      background-color: rgba(0, 0, 0, 0.1);
      .anticon-close {
        display: inline-block;
      }
    }
    .ant-tabs-tab:hover {
      padding-left: 20px;
      padding-right: 20px;
      .anticon-close {
        color: #333;
        display: inline-block;
      }
    }
  }
}

.ant-pro-multi-tab-wrapper {
  .tab_style() !important;
}
</style>
