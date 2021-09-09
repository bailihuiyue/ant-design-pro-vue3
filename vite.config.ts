import { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';
import legacy from '@vitejs/plugin-legacy'
import { vite2Ext } from "apite";
import viteSvgIcons from 'vite-plugin-svg-icons';
import { viteThemePlugin } from 'vite-plugin-theme';
import { getThemeColors } from './src/utils/themeUtil'

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    server: {
      host: '0.0.0.0'
    },
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
