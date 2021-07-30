<template>
  <div id="app">
    <a-config-provider :locale="lang[proxy.$i18n.locale]">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance, defineComponent } from 'vue';
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import en_US from 'ant-design-vue/lib/locale-provider/en_US';
import storage from '@/utils/Storage';
import { useI18n } from 'vue-i18n';
import i18n from '@/locales/setupI18n';

export default defineComponent({
  setup(props) {
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const lang = { 'en-US': en_US, 'zh-CN': zh_CN };

    return {
      t,
      proxy,
      lang,
    };
  },
});
</script>

<style>
</style>
