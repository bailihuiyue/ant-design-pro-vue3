<template>
  <a-config-provider :locale="lang[proxy.$i18n.locale]">
    <router-view />
  </a-config-provider>
  <LockScreen />
</template>

<script lang="ts" setup name="App">
import { getCurrentInstance, onErrorCaptured, h } from 'vue'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import en_US from 'ant-design-vue/lib/locale-provider/en_US'
import { setDeviceType } from '@/utils/device'
import LockScreen from '@/components/LockScreen/index.vue'
import emitter from '@/utils/eventBus'
import { useRouter } from 'vue-router'
import { Modal } from 'ant-design-vue'

const { proxy } = getCurrentInstance()
const lang = { 'en-US': en_US, 'zh-CN': zh_CN }

window.onresize = setDeviceType
setDeviceType()

const router = useRouter()
emitter.once('axios_goto_login', () => {
  router.push({ name: 'login' })
})

//全局错误处理
onErrorCaptured((err, instance, info) => {
  if (window.env !== 'localhost') {
    // debugger
    console.log(err, instance, info)
    Modal.error({
      title: 'System Error',
      content: h('pre', err.stack),
      class: 'errorCapturedModal',
      width: '60%'
    })
  }
})
</script>

<style>
</style>
