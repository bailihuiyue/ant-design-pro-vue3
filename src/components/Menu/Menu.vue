<template>
  <a-menu :mode="mode" :theme="theme" :openKeys="openKeys.value" :selectedKeys="selectedKeys" @openChange="onOpenChange"
    @click="onSelect" class="SysMenu">
    <template v-for="m in menu" :key="m.path">
      <RenderSubMenu :menu="m" v-if="!m.hidden" />
    </template>
  </a-menu>
</template>
<script lang="ts" setup name="Menu">
import { reactive, computed, onMounted, watch, ref, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import RenderSubMenu from './RenderSubMenu.vue'

const props = defineProps({
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
})
const router = useRouter()
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

const emit = defineEmits(['menuSelect'])
const onSelect = ({ item, key, selectedKeys: selectedKeysParams }) => {
  selectedKeys.value = selectedKeysParams
  emit('menuSelect', { item, key, selectedKeys })
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
</script>
<style lang="less">
</style>
