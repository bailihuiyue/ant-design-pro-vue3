<template>
  <a-modal v-model:visible="isShow" title="快速开发面板" :footer="null" @cancel="onCancel" width="60%">
    <a-spin :spinning="loading">
      <section :style="{ height: '400px' }">
        <a-tabs>
          <a-tab-pane tab="模板">
            <div style="margin-bottom:20px">
              <a-space>
                <a-input v-model:value="v" placeholder="请输入页面名称" :style="{width:'200px'}" />
                <a-button type="primary" @click="createV">创建view</a-button>
              </a-space>
            </div>
            <div>
              <a-space>
                <a-input v-model:value="c" placeholder="请输入组件名称" :style="{width:'200px'}" />
                <a-button type="primary" @click="createC">创建component</a-button>
              </a-space>
            </div>
          </a-tab-pane>
        </a-tabs>
      </section>
    </a-spin>
  </a-modal>
</template>
<script lang="ts">
import { ref } from 'vue'
import * as api from './service'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const v = ref('')
    const c = ref('')
    const loading = ref(false)
    const onCancel = () => {
      emit('close')
    }
    const createV = () => {
      if (v.value) {
        loading.value = true
        api.createV(v.value)
      } else {
        alert('请输入页面名称')
      }
    }
    const createC = () => {
      if (c.value) {
        loading.value = true
        api.createC(c.value)
      } else {
        alert('请输入组件名称')
      }
    }
    return {
      onCancel,
      createV,
      createC,
      c,
      v,
      loading
    }
  }
}
</script>
<style lang="less"></style>
