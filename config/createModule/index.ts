import { moduleTypes } from './type'
import { copyFolder, log, templatePath, disPath, deleteFolder, modifyIndexVue, firstLetterUpperCase } from './utils'

function run() {
  const argv = require('minimist')(process.argv.slice(2));
  const { type, moduleName } = argv
  if (!moduleName) {
    log.error('请输入组件/页面名称!')
    return false
  }
  copyFolder(templatePath, disPath(type + '/' + firstLetterUpperCase(moduleName)))
  // 修改index.vue的class名称为组件名称
  setTimeout(() => modifyIndexVue(type, moduleName), 300)
  if (type === moduleTypes.component) {
    // components文件夹不需要再复制components文件夹了
    setTimeout(() => deleteFolder(disPath('components/' + moduleName + '/components')), 300)
  }
  log.success('复制完成!')
}

run()
