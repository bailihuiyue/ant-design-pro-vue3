<template>
  <section class="Home">
    <h1>Home</h1>
    <h1>{{ systemConfig.state.title }}</h1>
  </section>
</template>

<script lang="ts" setup name="Home">
import { systemConfig } from '@/store/reactiveState'
</script>

<style scoped lang="less">
.Home {
  height: 200vh;
}
</style>
