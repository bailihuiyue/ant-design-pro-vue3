import { state } from './state';
import app from './modules/app'
import { createStore } from 'vuex';

const store = createStore({
  state,
  mutations: {},
  actions: {},
  modules: {
    app
  },
});

export default store
