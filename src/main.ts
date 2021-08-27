import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/global.less';
import i18n from '@/locales/useI18n'
import '@/utils/components_use'
import 'virtual:svg-icons-register';
import setupDefaultSetting from '@/utils/setupDefaultSetting'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app');

setupDefaultSetting()
