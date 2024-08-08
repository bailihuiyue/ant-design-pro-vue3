import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { visualizer } from 'rollup-plugin-visualizer'
// import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

const lifecycle = process.env.npm_lifecycle_event
const target = process.env.BUILD_TARGET === 'cloud-release' ? 'com' : process.env.BUILD_TARGET
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 666
    },
    // 向import.meta.env注入变量,无法注入全局windows,只能注入import.meta.env中
    // 'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE)
    // https://cn.vitejs.dev/config/shared-options.html#envprefix
    define: {
      'import.meta.env.APP_VERSION': JSON.stringify('3.0.0')
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
          manualChunks(id) {
            //静态资源分拆打包
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
                  break
                default:
                  return 'vendors'
              }
            }
          }
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      // vueDevTools(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      mockDevServerPlugin({
        prefix: '/',
        include: 'mock/*.ts',
        log: false
      }),
      // Components({
      //   dts: true,
      //   resolvers: [AntDesignVueResolver()],
      //   include: [/\.vue$/, /\.tsx$/],
      // }),
      vueSetupExtend(),
      lifecycle === 'report' ? visualizer({ gzipSize: true, open: true, brotliSize: true, filename: 'report.html' }) : null,
      // viteCommonjs()
    ],
    resolve: {
      alias: [
        // {
        //   find: 'vue-i18n',
        //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        // },
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    }
  }
})
