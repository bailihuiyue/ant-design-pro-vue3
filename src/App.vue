<template>
  <div id="app">
    <a-config-provider :locale="lang">
      <router-view />
      {{t('user.test.a')}}
    </a-config-provider>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from 'vue';
import cn from 'ant-design-vue/es/locale/zh_CN';
import en from 'ant-design-vue/lib/locale-provider/en_US'
import storage from '@/utils/Storage'
import { useI18n } from 'vue-i18n'
import i18n from '@/locales/setupI18n'

export default defineComponent({
  name: 'App',
  setup() {
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    // setTimeout(() => {
    //   proxy.$i18n.locale = 'en'
    // }, 2000)
    const lang = ref(cn)
    return {
      lang,
      t
    }
  }
});
</script>

<style>
</style>