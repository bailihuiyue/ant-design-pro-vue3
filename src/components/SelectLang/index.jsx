import './index.less'

// info:todo:vite plugin 目前不支持vue3 jsx的自动引入
import "ant-design-vue/lib/menu/style/index.css";
import "ant-design-vue/lib/dropdown/style/index.css";
import { Menu, Dropdown } from 'ant-design-vue'

import { defineComponent, getCurrentInstance, ref } from 'vue';
import { GlobalOutlined } from '@ant-design/icons-vue';
import ls from '@/utils/Storage'
import { setDocumentTitleForLangChange } from '@/utils/domUtil'

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
    const currentLang = ref(ls.get('lang') || 'zh-CN')
    function changeLang ({ key }) {
      proxy.$i18n.locale = key
      ls.set('lang', key)
      currentLang.value = key
      setDocumentTitleForLangChange()
    }

    return {
      prefixCls,
      changeLang,
      currentLang
    }
  },
  render () {
    const langMenu = (
      <Menu class={['menu', 'ant-pro-header-menu']} selectedKeys={[this.currentLang]} onClick={this.changeLang} getPopupContainer={
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
    return (
      <Dropdown overlay={langMenu} class={this.prefixCls} placement="bottomRight">
        <span>
          <GlobalOutlined />
        </span>
      </Dropdown>)
  }
}

export default defineComponent(SelectLang)

// info:todo:之前render里面的函数全部写在setup中,导致出现了bug:https://github.com/vueComponent/ant-design-vue/issues/4441
// 经作者回复之后bug修复,但是要写在render函数中,感觉这样和模板没什么区别了,可是HelloWord.jsx却不用写在render中,不知道为什么
