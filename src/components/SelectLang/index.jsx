import './index.less'

// info:todo:vite plugin 目前不支持vue3 jsx的自动引入
import "ant-design-vue/lib/menu/style/index.css";
import "ant-design-vue/lib/dropdown/style/index.css";
import { Menu, Dropdown } from 'ant-design-vue'

import { defineComponent, getCurrentInstance, ref, reactive } from 'vue';
import { GlobalOutlined } from '@ant-design/icons-vue';
import Storage from '@/utils/Storage'

const locales = ['zh-CN', /*'zh-TW',*/ 'en-US', /*'pt-BR'*/]
const languageLabels = {
  'zh-CN': '简体中文',
  // 'zh-TW': '繁体中文',
  'en-US': 'English',
  // 'pt-BR': 'Português'
}
// eslint-disable-next-line
const languageIcons = {
  'zh-CN': '🇨🇳',
  // 'zh-TW': '🇭🇰',
  'en-US': '🇺🇸',
  // 'pt-BR': '🇧🇷'
}

const SelectLang = {
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-drop-down'
    }
  },
  name: 'SelectLang',
  setup (props) {
    const { proxy } = getCurrentInstance();

    const { prefixCls } = props
    const currentLang = ref(Storage.get('lang') || 'zh-CN')
    const changeLang = ({ key }) => {
      proxy.$i18n.locale = key
      Storage.set('lang', key)
      currentLang.value = key
    }
    const langMenu = (
      <Menu class={['menu', 'ant-pro-header-menu']} selectedKeys={[currentLang.value]} onClick={changeLang} getPopupContainer={
        triggerNode => {
          return triggerNode.parentNode || document.body;
        }
      }>
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale] + ' '}
            </span>
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    )
    return () => (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <span class={prefixCls}>
          <GlobalOutlined />
        </span>
      </Dropdown>
    )
  }
}

export default defineComponent(SelectLang)

// bug:antv本身有bug:https://github.com/vueComponent/ant-design-vue/issues/4441
