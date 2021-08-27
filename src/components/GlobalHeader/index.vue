<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
        :style="{ padding: '0' }"
      >
        <div v-if="mode === 'sidemenu'" class="header">
          <span @click="toggle">
            <template v-if="device==='mobile'">
              <MenuFoldOutlined v-if="collapsed==='menu-fold'" class="trigger" />
              <MenuUnfoldOutlined v-if="collapsed==='menu-unfold'" class="trigger" />
            </template>
            <template v-else>
              <MenuUnfoldOutlined v-if="collapsed==='menu-unfold'" class="trigger" />
              <MenuFoldOutlined v-if="collapsed==='menu-fold'" class="trigger" />
            </template>
          </span>
          <user-menu :theme="theme"></user-menu>
        </div>
        <div v-else :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'" />
              <s-menu v-if="device !== 'mobile'" mode="horizontal" :menu="menus" :theme="theme" />
              <span v-else @click="toggle">
                <MenuFoldOutlined v-if="collapsed==='menu-fold'" class="trigger" />
                <MenuUnfoldOutlined v-if="collapsed==='menu-unfold'" class="trigger" />
              </span>
            </div>
            <user-menu class="header-index-right" :theme="theme"></user-menu>
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script lang="ts">
import UserMenu from '../tools/UserMenu/index.vue';
import SMenu from '../Menu/Menu.vue';
import Logo from '../tools/Logo.vue';
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { sidebarOpened, device, fixedHeader, autoHideHeader } from '@/store/useSiteSettings';

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  },
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu',
    },
    menus: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: 'dark',
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    device: {
      type: String,
      required: false,
      default: 'desktop',
    },
  },
  setup(props, { emit }) {
    const visible = ref<boolean>(true);
    const oldScrollTop = ref<number>(0);
    const ticking = ref<boolean>(false);
    // TODO:未知作用
    const handleScroll = () => {
      if (!autoHideHeader) {
        return;
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
      if (!ticking.value) {
        ticking.value = true;
        requestAnimationFrame(() => {
          if (oldScrollTop.value > scrollTop) {
            visible.value = true;
          } else if (scrollTop > 300 && visible.value) {
            visible.value = false;
          } else if (scrollTop < 300 && !visible.value) {
            visible.value = true;
          }
          oldScrollTop.value = scrollTop;
          ticking.value = false;
        });
      }
    };

    const toggle = () => {
      emit('toggle');
    };

    onMounted(() => {
      document.addEventListener('scroll', handleScroll, { passive: true });
    });

    onBeforeUnmount(() => {
      document.body.removeEventListener('scroll', handleScroll, true);
    });

    return {
      visible,
      fixedHeader,
      sidebarOpened,
      toggle,
      device,
    };
  },
});
</script>

<style lang="less">
@import '../../style/index.less';

.header-animat {
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
</style>
