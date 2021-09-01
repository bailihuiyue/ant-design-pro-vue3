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


目前可以支持自动切换主题,包括生产模式,
通过调研,发现antv(element 有官方支持)目前主流切换主题有两种模式,并且都需要webpack/vite插件1.提前传入需要改变的颜色变量和值入例如:@primary-color:[#0094ff,#fff,#000等...],然后正在webpack编译时读取这些变量,然后静态生成这些css文件,优点,1.切换主题时只是加载不同的css文件,节约性能,缺点:1.耗费服务端空间,2.只能订制提前定义好的几种主题3.需要动态写入要修改的变量名入,@primary-color,@success-colo等,替换不完全
本项目使用了第二种方案,基于vite-plugin-theme插件,有点1.可以任意在生产环境下选择主题颜色;2.没有上一中法案的问题3,主题更改比较全面;缺点:1.由于是动态生成主题颜色,会有性能损耗2.必须先找到antv主颜色的色号,否则替换主题功能失效,所以当antv主色更改时,需要代码中跟着一起更改,建议锁定antv版本,避免该问题;猜测原理,根据该插件说明和代码运行现象猜测,是以主颜色生成几个临近颜色然后对应找到整个项目中包含这些颜色的css样式然后对比替换比如原来是[a,b,c,d],现在是[1,2,3,4],那么a变成1,b变成2这样对应着替换,然后把提换完成的css写入到body底部,完成主题切换,不需要根据@primary-color这种定义去查找,这样靠颜色替换比较完整


注意:svg文件的<svg> 标签上必须有 fill="currentColor" 字段,这样才能从外部的span等标签复制颜色,否则颜色不可变

菜单跳转第三方网址的写法meta: { title: 'user.login.login', icon: 'account-book', target: 'http://www.baidu.com', blank: false }
如果不想在新窗口打卡,请写明blank: false否则blank不写或者任意值均表示true

黑夜模式css位置:darkModePatch.less
