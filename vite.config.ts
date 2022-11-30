import { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';
import legacy from '@vitejs/plugin-legacy'
import { vite2Ext } from "apite";
import viteSvgIcons from 'vite-plugin-svg-icons';
import { viteThemePlugin } from 'vite-plugin-theme';
import { getThemeColors } from './src/utils/themeUtil'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    server: {
      host: '0.0.0.0',
      port: 8000
    },
    build: {
      // 清除console和debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      chunkSizeWarningLimit: 650,
      // sourcemap: true,
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
            if (id.includes('node_modules')) {
              return 'vendors'
            }
          }
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        dts: true,
        resolvers: [AntDesignVueResolver()],
        include: [/\.vue$/, /\.tsx$/],
      }),
      vite2Ext({
        dir: 'mock'
      }) as any,
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      viteSvgIcons({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteThemePlugin({
        colorVariables: [...getThemeColors()],
      }),
      PkgConfig(),
      OptimizationPersist(),
      vueSetupExtend()
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
    },
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
  }
};
