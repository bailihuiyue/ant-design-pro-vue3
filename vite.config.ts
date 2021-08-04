import { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';
import legacy from '@vitejs/plugin-legacy'
import { vite2Ext } from "apite";

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      ViteComponents({
        customComponentResolvers: [
          AntDesignVueResolver(),
        ]
      }),
      vite2Ext({
        dir: 'mock'
      }) as any,
      legacy({
        targets: ['defaults', 'not IE 11']
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
