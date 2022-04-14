<h1 align="center">Ant Design Vue Pro</h1>
<div align="center">
An out-of-box UI solution for enterprise applications as a Vue boilerplate. based on  <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a>
</div>

基于 [Vite2 Vue3 Ant-Design-of-Vue2 TS](https://github.com/bailihuiyue/ant-design-pro-vue3) 实现的 [Ant Design Pro Vue](https://pro.antdv.com/docs/router-and-nav)


预览图
----
#### 首页
![dashboard](https://gitee.com/Onces/images/raw/master/ant-pro-vue3/6.png)
个人中心
![dashboard](https://gitee.com/Onces/images/raw/master/ant-pro-vue3/1.png)

#### 夜间模式
![dashboard](https://gitee.com/Onces/images/raw/master/ant-pro-vue3/2.png)

#### 锁屏界面
![dashboard](https://gitee.com/Onces/images/raw/master/ant-pro-vue3/7.png)

可点击右下角锁头按钮进行解锁

#### 手机预览(最低支持iphone4)
<img src="https://gitee.com/Onces/images/raw/master/ant-pro-vue3/3.png"  width=250 /><img src="https://gitee.com/Onces/images/raw/master/ant-pro-vue3/4.png"  width=250/><img src="https://gitee.com/Onces/images/raw/master/ant-pro-vue3/5.png"  width=250 />

项目下载和运行
----

```bash
#拉取项目代码
git clone https://github.com/bailihuiyue/ant-design-pro-vue3.git
cd ant-design-pro-vue3
#安装依赖
yarn install
#开发模式运行
yarn dev 不带开发球
yarn dev-ui 带开发球
#编译项目
yarn build
```

路由和菜单
----

#### 基本结构

- 路由文件 通过约定的语法根据在 router.ts 中配置路由,
  - 后端路由:通过defaultSettings.ts中的useAsyncRouter来设置是否启用,后端路由的格式在mockUtils.ts的userNav中。
  - 后端路由对应的component自动引入逻辑在batchImportFiles,会自动引入view下面的,vue文件作为页面
  - 普通路由参照exampleRouterMap
- 菜单生成根据路由配置来生成菜单。菜单项名称，嵌套路径与路由高度耦合,具体配置内容参照
[Ant Design Pro Vue](https://pro.antdv.com/docs/router-and-nav) 即可
- 菜单跳转第三方网址的写法meta: { title: 'user.login.login', icon: 'account-book', target: 'http://www.baidu.com', blank: false }如果不想在新窗口打卡,请写明blank: false否则blank不写或者任意值均表示true

布局
----

- 布局没有采用新版pro-layout插件,因为二次封装不利于个性化定制,而且pro-layout全是用jsx写的,所以还是使用了ant-pro 2.0的代码去修改

新增页面
----

- 项目结构采用了类似ant design pro(react版本)的模块化结构,这样其他项目使用时直接复制文件夹即可,省去了在不同文件加分别找文件的痛苦了
- 模板在template文件夹中
    <template>
    ├helper.ts                工具文件,等同于utils
    ├Index.vue				  页面文件
    ├service.ts   			  用于存放接口内容
    ├types.ts				  声明ts类型使用
    ├<lang>                   国际化文件
    │  ├cn.ts					 中文
    │  └en.ts					 英文
   <!--使用时复制文件夹到所以在的位置(components,views等)即可-->

和服务端进行交互
----

- 项目使用了[apite](https://apite.frp.boyxing.com/)作为mock工具,文件写在了/mock文件夹中

业务图标
----

- 图标除了 Ant Design Vue 自带的图标以外还使用了 vite-plugin-svg-icons 插件缓存svg,所有图标都放在src/assets/icons中

-

- 想使用antv自带的图标请拷贝node_modules\@ant-design\icons-svg\inline-svg到图标文件夹,会自动引入,名称为 文件夹名-文件名 例如a下的b.svg,SvgIcon组件传入name="a-b"即可: <SvgIcon name="a-b" color="#fff"/>

  想获取所有已添加的icon:

  import ids from 'virtual:svg-icons-names';

  // => ['icon-icon1','icon-icon2','icon-icon3']

  这个插件是自动导入的,然后写到body上,如果图标过多觉得影响效率可以使用vite-plugin-vue-svg,手动引入一个个图标,demo在SvgIcon/manual中

  ***注意:svg文件的<svg> 标签上必须有 fill="currentColor" 字段,这样才能从外部的span等标签修改颜色,否则颜色不可变***

国际化
----

- 国际化使用了i18n 9的版本,由于该版本不识别.组成的key,所以程序用为了兼用使用replaceDot方法进行了一层循环,影响项目性能,并且禁止写成 'a':'xx','a.b':'xxxx'这种形式,因为无法生成对象,因此国际化不推荐写成 'list.search-list.articles': '搜索列表（文章）',推荐写成{a:{b:{c:'xxx'} } }

更换主题
----

- 项目使用了vite-plugin-theme产生主题(css)
- 目前可以支持自动切换主题,包括生产模式,
- 通过调研,发现antv(element 有官方支持)目前主流切换主题有两种模式,并且都需要webpack/vite插件:
 1. 提前传入需要改变的颜色变量和值入例如:@primary-color:[#0094ff,#fff,#000等...],然后正在webpack编译时读取这些变量,然后静态生成这些css文件,
     - 优点,1.切换主题时只是加载不同的css文件,节约性能,
     - 缺点:1.耗费服务端空间,2.只能订制提前定义好的几种主题3.需要动态写入要修改的变量名入,@primary-color,@success-colo等,替换不完全
 2. 本项目使用了第二种方案,基于vite-plugin-theme插件,
      - 优点

      		1. 可以任意在生产环境下选择主题颜色;

      		2. 没有上一中法案的问题3,主题更改比较全面

      - 缺点:
        1. 由于是动态生成主题颜色,会有性能损耗
        2. 必须先找到antv主颜色的色号,否则替换主题功能失效,所以当antv主色更改时,需要代码中跟着一起更改,建议锁定antv版本,避免该问题;
        - 猜测原理,根据该插件说明和代码运行现象猜测,是以主颜色生成几个临近颜色然后对应找到整个项目中包含这些颜色的css样式然后对比替换比如原来是[a,b,c,d],现在是[1,2,3,4],那么a变成1,b变成2这样对应着替换,然后把提换完成的css写入到body底部,完成主题切换,不需要根据@primary-color这种定义去查找,这样靠颜色替换比较完整

***黑夜模式目前使用了antv官网的黑夜css,采用动态添加link完成,不能适配所有页面,因此在darkModePatch.less写下一些兼容样式***

权限管理
----

- 权限管理在路由文件的meta.permission中设置,可以是一个数组,也可以不写,不写表示任意权限即可
- 后端路由的话一般不用设置权限,传来什么就是什么

命令行工具
----
 用于自动生成一套模板,包括国际化,vue文件,service等文件
- 输入yarn c --moduleName=想要的组件名称 可以在src/components里生成一套组件模板
- 输入yarn v --moduleName=想要的页面名称 可以在src/views里生成一套页面模板
- 输入create-module-be 用于前台页面一键生成模板所调用的后端接口
- dev-ui 同时启动项目和模板后端,在开发球中输入想要创建的组件/页面名称,刷新页面(vite热更新自动)即表示创建成功

其他说明
----

- 项目为了保持了ant vue pro样式一致,部分代码引用自[ant vue pro](https://2x.antdv.com/components/overview-cn/),如global.less,部分插件和原理借鉴[vben](https://vvbin.cn/next/),感谢两位大大

- 当前 <script setup lang="ts"></script>有bug,会导致.ts文件无法引入,报错 The requested module '/src/views/user/ty.ts' does not provide an export named 'FormState'

- 文档里有一些注释,搭配vscode插件better-comments食用,风味更佳:
  注释TODO: 待完成
  bug:todo: bug
  info:todo: 发现的一些情况
  warn:todo: 可能有bug
  ques:todo: 疑问
  只有大写的'TODO'才表示未完成的功能,小写的todo只是为了方便搜索而已

## 已完成
1. 注册登录vue3 语法
2. 自动生成国际化(多层级文件夹使用.连接,比如tools.UserMenu)
3. Storage(包含加密)
4. vueuse响应式判断设备(手机,平板,pc)
5. 输入命令,生成一个view/component的模板
6. 页面存在一个开发球,点击按钮就可以创建view/component(yarn dev没有开发球,dev-ui才有)
7. 由于viser-vue不支持vue3,于是使用g2-plot重写,并且已支持夜间模式
( 如果不需要该页面,除了删除dashboard文件夹,也不要忘记删除"@antv/g2plot","@vue/babel-plugin-jsx"这俩库)
8. 仿win10锁屏页面,动态显示是否联网,是否充电,可自由更换壁纸(存在indexedDB中,建议图片别太大,容易卡),点击右下角锁头按钮出现密码框或换壁纸按钮
## TODO
1. 使用reactiveState部分代替vuex
2. 详尽的文档

## 浏览器兼容

Edge Chrome 等现代浏览器,目前只测试过Chrome,没有Mac所以Safari没有测试

##### 落魄前端,在线要饭

<img src="https://gitee.com/Onces/images/raw/master/money.png" width=200/>

下次一定?给个Star也行啊
