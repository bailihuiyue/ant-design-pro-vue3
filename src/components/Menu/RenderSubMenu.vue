<template>
  <a-sub-menu v-if="menu.children && !menu.hideChildrenInMenu" :key="menu.path" popupClassName="popupSubMenu">
    <template #icon>
      <SvgIcon :name="menu.meta.icon" v-if="menu.meta.icon" />
    </template>
    <template #title>{{$t(menu.meta.title)}}</template>
    <template v-if="!menu.hideChildrenInMenu">
      <template v-for="sub in menu.children">
        <!-- 递归组件 -->
        <RenderSubMenu :menu="sub" />
      </template>
    </template>
  </a-sub-menu>
  <!-- renderMenuItem -->
  <a-menu-item :key="menu.path" v-else>
    <template #icon>
      <SvgIcon :name="menu.meta.icon" v-if="menu.meta.icon" />
    </template>
    <!-- 外部链接 -->
    <a v-if="menu.meta.target" :href="menu.meta.target" :target="menu.meta.blank===false?'':'_blank'">
      <!-- span重复了吧?这就是template的弊端,jsx才是王道 -->
      <span>{{$t(menu.meta.title)}}</span>
    </a>
    <router-link :to="menu.path" v-else>
      <span>{{$t(menu.meta.title)}}</span>
    </router-link>
  </a-menu-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'RenderSubMenu',
  props: ['menu'],
  components: {
    SvgIcon
  },
  setup(prop) {
    // TODO:貌似没用
    if (prop.menu.children && prop.menu.hideChildrenInMenu) {
      // 把有子菜单的 并且 父菜单是要隐藏子菜单的
      // 都给子菜单增加一个 hidden 属性
      // 用来给刷新页面时， selectedKeys 做控制用
      prop.menu.children.forEach((item) => {
        item.meta = Object.assign(item.meta, { hidden: true })
      })
    }
  }
})
</script>
<style lang="less" scoped>
.menuName {
  svg,
  span {
    vertical-align: middle;
  }
  svg {
    margin-right: 10px;
  }
}
</style>
