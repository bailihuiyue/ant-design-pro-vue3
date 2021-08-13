<template>
  <router-view v-slot="{ Component }" v-if="isKeep">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view v-else />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const isKeep = ref(false);

    watch(
      () => router.currentRoute.value,
      (newVal) => {
        // 这里增加了 multiTab 的判断，当开启了 multiTab 时
        // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
        // 若确实不需要，可改为 return meta.keepAlive ? isKeep : notKeep
        const routeKeepAlive = router.currentRoute.value.meta.keepAlive;
        if (!store.state.app.multiTab && !routeKeepAlive && !props.keepAlive) {
          isKeep.value = false;
        } else {
          isKeep.value = true;
        }
      },
      {
        immediate: true,
      },
    );

    return {
      isKeep,
    };
  },
});
</script>
