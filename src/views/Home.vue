<template>
  <section class="Home">
    <h1>Home</h1>
    <h1>{{ store.state.title }}</h1>
  </section>
</template>

<script lang="ts" setup name="Home">
import { useStore } from 'vuex'
const store = useStore()
</script>

<style scoped lang="less">
.Home {
  height: 200vh;
}
</style>
