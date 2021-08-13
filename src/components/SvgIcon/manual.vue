<template>
  <div>
    <Icon :style="{ color: 'hotpink',fontSize:'100px' }">
      <template #component>
        <!-- <logo /> -->
      </template>
    </Icon>
    <logo />
  </div>
</template>
<script lang="ts">
// 使用vite-plugin-vue-svg插件的demo
import { defineComponent } from 'vue';
import Icon from '@ant-design/icons-vue';
// import logo from '@/assets/icons/logo.svg?component';
export default defineComponent({
  components: {
    Icon,
    // logo,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="less">
</style>
