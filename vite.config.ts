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
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
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
