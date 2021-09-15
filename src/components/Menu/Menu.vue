<template>
  <a-menu
    :mode="mode"
    :theme="theme"
    :openKeys="openKeys.value"
    :selectedKeys="selectedKeys"
    @openChange="onOpenChange"
    @select="onSelect"
    class="SysMenu"
  >
    <template v-for="m in menu" :key="m.path">
      <RenderSubMenu :menu="m" v-if="!m.hidden" />
    </template>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted, watch, ref, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import RenderSubMenu from './RenderSubMenu.vue'

export default defineComponent({
  name: 'Menu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: { RenderSubMenu },
  setup(props, { emit }) {
    const router = useRouter()
    // ques:todo:router.currentRoute就保留了响应式router.currentRoute.value响应式就没了?难道.value等于取值了?,如果是响应没了,为什么点击菜单就显示正常,而使用代码跳转路由就不正常呢,难道是vue-router4的bug?
    const route = router.currentRoute
    const openKeys = reactive<any>({ value: [] })
    const selectedKeys = ref<any>([])
    const cachedOpenKeys = reactive<any>({ value: [] })
    const rootSubmenuKeys: ComputedRef<string[]> = computed(() => {
      const keys: string[] = []
      props.menu.forEach((item: any) => keys.push(item.path))
      return keys
    })
    onMounted(() => {
      updateMenu()
    })

    watch(
      () => props.collapsed,
      (val) => {
        if (val) {
          cachedOpenKeys.value = openKeys.value.concat()
        } else {
          openKeys.value = cachedOpenKeys.value
        }
      }
    )

    // 主要作用:使用router.push跳转页面时更左侧新菜单选中项
    watch(
      () => route.value,
      (val) => {
        updateMenu()
      }
    )

    // select menu item
    const onOpenChange = (openKeysParams) => {
      // 在水平模式下时执行，并且不再执行后续
      if (props.mode === 'horizontal') {
        openKeys.value = openKeysParams
        return
      }
      // 非水平模式时
      const latestOpenKey: string = openKeysParams.find(
        (key) => /*去掉这个!则可以全部打开菜单(目前只能打开一个菜单)*/ !openKeys.value.includes(key)
      )
      if (!rootSubmenuKeys.value.includes(latestOpenKey)) {
        openKeys.value = openKeysParams
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : []
      }
    }
    const onSelect = ({ item, key, selectedKeys: selectedKeysParams }) => {
      selectedKeys.value = selectedKeysParams
      emit('select', { item, key, selectedKeys })
    }
    const updateMenu = () => {
      const routes = route.value.matched.concat()
      const { hidden } = route.value.meta
      if (routes.length >= 3 && hidden) {
        routes.pop()
        selectedKeys.value = [routes[routes.length - 1].path]
      } else {
        selectedKeys.value = [routes.pop()!.path]
      }
      const openKeysArr: any = []
      if (props.mode === 'inline') {
        routes.forEach((item) => {
          openKeysArr.push(item.path)
        })
      }
      props.collapsed ? (cachedOpenKeys.value = openKeysArr) : (openKeys.value = openKeysArr)
    }

    return {
      openKeys,
      selectedKeys,
      onOpenChange,
      onSelect
    }
  }
})
</script>
<style lang="less">
</style>
