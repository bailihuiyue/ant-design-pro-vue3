<template>
  <!--placement="bottomRight"
    :autoAdjustOverflow="false"
  :arrowPointAtCenter="true"-->
  <a-popover
    v-model:visible="visible"
    trigger="click"
    :placement="isMobile?'bottom':'bottomRight'"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="getPopupContainer"
    :overlayStyle="{ width: isMobile?'250px':'300px', top: '50px' }"
  >
    <template #content>
      <a-spin :spinning="loading">
        <a-tabs>
          <a-tab-pane tab="通知" key="1">
            <a-list>
              <a-list-item>
                <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="消息" key="2">123</a-tab-pane>
          <a-tab-pane tab="待办" key="3">123</a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef" style="padding: 0 18px">
      <a-badge count="12">
        <BellOutlined style="font-size: 16px; padding: 4px" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BellOutlined } from '@ant-design/icons-vue'
import { isMobile } from '@/utils/device'

export default defineComponent({
  name: 'HeaderNotice',
  components: {
    BellOutlined
  },
  setup() {
    const loading = ref<boolean>(false)
    const visible = ref<boolean>(false)
    const noticeRef = ref(null)

    const fetchNotice = () => {
      if (!visible.value) {
        loading.value = true
        setTimeout(() => {
          loading.value = false
        }, 300)
      } else {
        loading.value = false
      }
      // visible.value = !visible.value;
    }

    const getPopupContainer = () => {
      return noticeRef.value!.parentElement
    }
    return {
      loading,
      visible,
      fetchNotice,
      noticeRef,
      getPopupContainer,
      isMobile
    }
  }
})
</script>

<style lang="css">
.header-notice-wrapper {
  top: 50px !important;
}
</style>
<style lang="less" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    // vertical-align: initial;
  }
}
</style>
