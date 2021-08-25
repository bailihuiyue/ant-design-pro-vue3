import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/components/global.less';
import storage from '@/utils/Storage'
import i18n from '@/locales/useI18n'
import '@/utils/components_use'
import 'virtual:svg-icons-register';
import setupDefaultSetting from '@/utils/setupDefaultSetting'

// storage.set('asd', 'zxcxzcxzcxzcxzcxzxcxzcxzcxz')
// console.log(storage.get('asd'))
const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app');
// console.log(import.meta.env)

setupDefaultSetting()
