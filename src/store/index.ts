import app from './modules/global'
import { createStore } from 'vuex';
import { genStore } from '@/utils/batchImportFiles'

const allStores = genStore()
const store = createStore({
  modules: {
    app,
    ...allStores
  },
});

export default store
