import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/global.less';
import storage from '@/utils/Storage'

storage.setOptions({namespace:'v3_'})

createApp(App).use(router).use(store).mount('#app');