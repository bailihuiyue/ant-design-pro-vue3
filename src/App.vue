<template>
  <a-config-provider :locale="locale">
  </a-config-provider>
</template>

<script>
import { defineComponent, ref } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import storage from '@/utils/Storage'

export default defineComponent({
  name: 'App',
  setup() {
    const lang = ref('zhCN')
    return {
      lang
    }
  }
});
</script>

<style>
</style>