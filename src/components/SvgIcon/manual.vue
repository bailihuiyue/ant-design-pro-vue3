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
<script lang="ts" setup name="SvgIconManual">
// 使用vite-plugin-vue-svg插件的demo
import Icon from '@ant-design/icons-vue';
// import logo from '@/assets/icons/logo.svg?component';
</script>
<style lang="less">
</style>
