<template>
  <keep-alive v-if="inKeep">
    <router-view />
  </keep-alive>
  <router-view v-else />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
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
    const inKeep = ref(false);
    const routeKeepAlive = router.currentRoute.value.meta.keepAlive;
    if (!store.state.multiTab && !routeKeepAlive && !props.keepAlive) {
      inKeep.value = false;
    } else {
      inKeep.value = false;
    }
    return {
      inKeep,
    };
  },
});
</script>
