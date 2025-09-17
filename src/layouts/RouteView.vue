<template>
  <router-view v-slot="{ Component }" v-if="isKeep">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view v-else />
</template>
<script lang="ts" setup name="RouteView">
import { ref, watch, onBeforeMount } from 'vue';
import { systemConfig } from '@/store/reactiveState'
import { useRouter } from 'vue-router';

const props = defineProps({
  keepAlive: {
    type: Boolean,
    default: false,
  },
})
const router = useRouter();
const isKeep = ref(false);

/*
组件是否缓存的逻辑不太正常,理论上,是否缓存标签应该完全由路由的 meta.keepAlive 判断,不需要额外判断
并且如果有多个RouteView组件存在,会有很多的watch监控,有性能问题
因此改为onMounted时进行判断,如果新逻辑(onMounted)不正确,可以仍然使用已注释的watch方法
watch(
  () => router.currentRoute.value,
  (newVal) => {
    // 这里增加了 multiTab 的判断，当开启了 multiTab 时
    // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
    // 若确实不需要，可改为 return meta.keepAlive ? isKeep : notKeep
    const routeKeepAlive = router.currentRoute.value.meta.keepAlive;
    if (!systemConfig.state.multiTab && !routeKeepAlive && !props.keepAlive) {
      isKeep.value = false;
    } else {
      isKeep.value = true;
    }
  },
  {
    immediate: true,
  },
);
*/

// 这里使用onMounted会导致子组件的onMounted被执行两次猜测是由于组件完全挂载后先加载了isKeep是false(默认值)的路由,然后又被设置为true,再次执行了一个路由Component,因此导致组件挂载了两次
onBeforeMount(() => {
  const routeKeepAlive = router.currentRoute.value.meta?.keepAlive
  isKeep.value = !!routeKeepAlive
})
</script>
