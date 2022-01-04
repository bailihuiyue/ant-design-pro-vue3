<template>
  <a-config-provider :locale="lang[proxy.$i18n.locale]">
    <router-view />
  </a-config-provider>
  <LockScreen />
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent } from 'vue'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import en_US from 'ant-design-vue/lib/locale-provider/en_US'
import { setDeviceType } from '@/utils/device'
import LockScreen from '@/components/LockScreen/index.vue'

export default defineComponent({
  components: { LockScreen },
  setup(props) {
    const { proxy } = getCurrentInstance()
    const lang = { 'en-US': en_US, 'zh-CN': zh_CN }

    window.onresize = setDeviceType
    setDeviceType()

    return {
      proxy,
      lang
    }
  }
})
</script>

<style>
</style>
