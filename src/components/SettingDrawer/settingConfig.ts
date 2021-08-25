import { message } from 'ant-design-vue/es'
// import defaultSettings from '../defaultSettings';
import themeColor from './themeColor.js'
import config from '@/config/defaultSettings'
// let lessNodesAppended

const colorList = [
  {
    key: '拂晓蓝（默认）',
    color: '#1890FF'
  },
  {
    key: '薄暮',
    color: '#F5222D'
  },
  {
    key: '火山',
    color: '#FA541C'
  },
  {
    key: '日暮',
    color: '#FAAD14'
  },
  {
    key: '明青',
    color: '#13C2C2'
  },
  {
    key: '极光绿',
    color: '#52C41A'
  },
  {
    key: '极客蓝',
    color: '#2F54EB'
  },
  {
    key: '酱紫',
    color: '#722ED1'
  }
]

// TODO
const updateTheme = newPrimaryColor => {
  // const isPrimaryColor = newPrimaryColor === config.primaryColor
  // let styleTag = document.getElementById('changeThemeColor')
  // if (!styleTag) {
  //   styleTag = document.createElement('link')
  //   styleTag.setAttribute('id', 'changeThemeColor')
  //   document.head.appendChild(styleTag)
  // }
  // styleTag.setAttribute('href', isPrimaryColor ? '' : `./themes/${newPrimaryColor.split('#')[1]}.css`)
}

const updateDarkMode = isDark => {
  let styleTag = document.getElementById('themeCss')
  let appTag = document.getElementById('html')
  if (!styleTag) {
    styleTag = document.createElement('link')
    styleTag.setAttribute('id', 'themeCss')
    document.head.appendChild(styleTag)
  }
  if (isDark) {
    styleTag.setAttribute('href', '/themes/dark.css')
    appTag!.className = 'darkMode'
  }else{
    styleTag.setAttribute('href', '')
    appTag!.className = ''
  }
}

// const updateTheme = newPrimaryColor => {
//   const hideMessage = message.loading('正在切换主题！', 0)
//   themeColor.changeColor(newPrimaryColor).finally(t => {
//     setTimeout(() => {
//       hideMessage()
//     }, 10)
//   })
// }

/*
const updateTheme = primaryColor => {
  // Don't compile less in production!
  /* if (process.env.NODE_ENV === 'production') {
    return;
  } * /
  // Determine if the component is remounted
  if (!primaryColor) {
    return
  }
  const hideMessage = message.loading('正在编译主题！', 0)
  function buildIt () {
    if (!window.less) {
      return
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor
        })
        .then(() => {
          hideMessage()
        })
        .catch(() => {
          message.error('Failed to update theme')
          hideMessage()
        })
    }, 200)
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode.setAttribute('href', '/color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    buildIt()
  }
}
*/

const updateColorWeak = colorWeak => {
  // document.body.className = colorWeak ? 'colorWeak' : '';
  const app = document.body.querySelector('#app')
  colorWeak ? app!.classList.add('colorWeak') : app!.classList.remove('colorWeak')
}

const updateGrayMode = grayMode => {
  const app = document.body.querySelector('#app')
  grayMode ? app!.classList.add('grayMode') : app!.classList.remove('grayMode')
}

export { updateTheme, colorList, updateColorWeak, updateGrayMode, updateDarkMode }