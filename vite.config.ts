import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver, } from 'vite-plugin-components'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

module.exports = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteComponents({
      customComponentResolvers: [
        AntDesignVueResolver(),
      ]
    })
  ],
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      // /@/xxxx => src/xxxx
      {
        find: '@',
        replacement: pathResolve('src') + '/',
      },
    ]
  }
});
