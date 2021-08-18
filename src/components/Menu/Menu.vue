<template>
  <a-menu
    :mode="mode"
    :theme="theme"
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    @openChange="onOpenChange"
    @select="onSelect"
  >
    <template v-for="m in menu" :key="m.path">
      <RenderItem :menu="m" v-if="!m.hidden" />
    </template>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import RenderItem from './RenderItem.vue';
// import { asyncRouterMap } from '@/router/asyncRouterMap';
// TODO:等完成setting-drawer再来测
export default defineComponent({
  name: 'Menu',
  props: {
    menu: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: 'dark',
    },
    mode: {
      type: String,
      required: false,
      default: 'inline',
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: { RenderItem },
  setup(props, { emit }) {
    const router = useRouter();
    const route = router.currentRoute.value;
    const openKeys = reactive<any>({ value: [] });
    const selectedKeys = reactive<any>({ value: [] });
    const cachedOpenKeys = reactive<any>({ value: [] });
    const rootSubmenuKeys = computed(() => {
      const keys = [];
      props.menu.forEach((item) => keys.push(item.path));
      return keys;
    });

    onMounted(() => {
      updateMenu();
    });

    watch(
      () => props.collapsed,
      (val) => {
        if (val) {
          cachedOpenKeys.value = openKeys.concat();
        } else {
          openKeys.value = cachedOpenKeys;
        }
      },
    );

    watch(
      () => router.currentRoute.value,
      (val) => {
        console.log(456)
        updateMenu();
      },
    );

    // select menu item
    const onOpenChange = (openKeysParams) => {
      // 在水平模式下时执行，并且不再执行后续
      if (props.mode === 'horizontal') {
        openKeys.value = openKeysParams;
        return;
      }
      // 非水平模式时
      const latestOpenKey = openKeys.value.find((key) => openKeys.value.includes(key));
      if (!rootSubmenuKeys.value.includes(latestOpenKey)) {
        openKeys.value = openKeysParams;
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    const onSelect = ({ item, key, selectedKeys: selectedKeysParams }) => {
      selectedKeys.value = selectedKeysParams;
      emit('select', { item, key, selectedKeys });
    };
    const updateMenu = () => {
      const routes = route.matched.concat();
      const { hidden } = route.meta;
      if (routes.length >= 3 && hidden) {
        routes.pop();
        selectedKeys.value = [routes[routes.length - 1].path];
      } else {
        selectedKeys.value = [routes.pop().path];
      }
      const openKeysArr: any = [];
      if (props.mode === 'inline') {
        routes.forEach((item) => {
          openKeysArr.push(item.path);
        });
      }

      props.collapsed ? (cachedOpenKeys.value = openKeysArr) : (openKeys.value = openKeysArr);
    };

    return {
      openKeys: openKeys.value,
      selectedKeys: selectedKeys.value,
      cachedOpenKeys: cachedOpenKeys.value,
      onOpenChange,
      onSelect,
      updateMenu,
      // asyncRouterMap,
    };
  },
});
</script>
<style lang="less">
</style>
