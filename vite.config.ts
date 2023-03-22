import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { vite2Ext } from "apite";
// 自动动态引入antv组件,测试结果发现全部引入也不大,所以注了
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { visualizer } from 'rollup-plugin-visualizer'

const lifecycle = process.env.npm_lifecycle_event;

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    drop: [],
  },
  build: {
    sourcemap: true,
    // terserOptions: {
    //   compress: {
    //     drop_console: false,
    //     drop_debugger: false,
    //   },
    // },
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        // manualChunks: {
        //   vendor
        // },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks(id) { //静态资源分拆打包
          // 可参考https://www.cnblogs.com/jyk/p/16029074.html
          // node包插件打包在一起
          if (id.includes('node_modules')) {
            const arr = id.toString().split('node_modules/')[1].split('/')
            switch (arr[0]) {
              // logicflow是例外,和页面文件打包在一起
              case '@logicflow':
                // if (arr[1] === 'core') {
                //   return 'logicflow_core'
                // } else {
                //   return 'logicflow_extension'
                // }
                break;
              default:
                return 'vendors'
            }
          }
        }
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    vite2Ext({
      dir: 'mock'
    }) as any,
    // Components({
    //   dts: true,
    //   resolvers: [AntDesignVueResolver()],
    //   include: [/\.vue$/, /\.tsx$/],
    // }),
    PkgConfig(),
    OptimizationPersist(),
    vueSetupExtend(),
    lifecycle === 'report' ? visualizer({ gzipSize: true, open: true, brotliSize: true, filename: 'report.html' }) : null
  ],
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
})
