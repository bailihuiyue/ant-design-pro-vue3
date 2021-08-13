vscode插件better-comments:
TODO: 待完成
bug:todo: bug
info:todo: 发现的一些情况
warn:todo: 可能有bug
只有大写的TODO才表示未完成的功能,小写的todo只是为了方便搜索而已

已完成:1.注册登录vue3 语法
2.自动生成国际化(多层级文件夹使用.连接,比如tools.UserMenu)
3.Storage(包含加密)
4.vueuse响应式判断设备(手机,平板,pc)
5.模块化开发
6.动态路由,(后端获取数据)
7.views下的.vue文件自动获取,动态路由中可自动引入
8.组件化svg图标(自动)
9.权限管理
10.mock

当前 <script setup lang="ts"></script>有bug,会导致.ts文件无法引入,报错 The requested module '/src/views/user/ty.ts' does not provide an export named 'FormState',


使用vite插件缓存了svg,将svg图标放入assets/icons下即可,想使用antv自带的图标请拷贝node_modules\@ant-design\icons-svg\inline-svg到图标文件夹,会自动引入,名称为 文件夹名-文件名 例如a下的b.svg,SvgIcon组件传入name="a-b"即可
想获取所有已添加的icon:
import ids from 'virtual:svg-icons-names';
// => ['icon-icon1','icon-icon2','icon-icon3']
这个插件是自动导入的,然后写到body上,如果图标过多觉得影响效率可以使用vite-plugin-vue-svg,手动引入一个个图标,demo在SvgIcon/manual中


为什么没有使用pro-layout组件,因为二次封装不利于个性化定制,而且pro-layout全是用jsx写的,所以还是使用了ant-pro 2.0的代码去修改
