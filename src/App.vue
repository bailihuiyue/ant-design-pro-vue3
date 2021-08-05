<template>
  <div id="app">
    <a-config-provider :locale="lang[proxy.$i18n.locale]">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent } from 'vue';
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import en_US from 'ant-design-vue/lib/locale-provider/en_US';

export default defineComponent({
  setup(props) {
    const { proxy } = getCurrentInstance();
    const lang = { 'en-US': en_US, 'zh-CN': zh_CN };
    return {
      proxy,
      lang,
    };
  },
});
</script>

<style>
</style>
