<template>
  <section class="Home">
    <h1>Home</h1>
    <h1>{{store.state.title}}</h1>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const store = useStore()
    return {
      store
    }
  }
})
</script>

<style scoped lang="less">
.Home {
  height: 200vh;
}
</style>
