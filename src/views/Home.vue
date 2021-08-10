<template>
  <h1>Home</h1>
  <h1>{{store.state.title}}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<style>
</style>
