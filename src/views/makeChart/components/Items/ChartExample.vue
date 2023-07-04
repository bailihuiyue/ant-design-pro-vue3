<template>
  <div class="ChartExample">
    <h5 class="title">{{option.name}}</h5>
    <img :src="getImageUrl(option.chartType)" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ChartExample',
  props: {
    option: {
      type: Object,
      default: {}
    }
  },
  components: {},
  setup() {
    const getImageUrl = (name: string) => {
      return new URL(`./imgs/${name}.webp`, import.meta.url).href
    }

    return {
      getImageUrl
    };
  },
})
</script>
<style lang="scss">
.ChartExample {
  width: 90%;
  height: 220px;
  cursor: move;
  display: inline-block;
  &:hover{
    border: 2px dashed #0094ff;
  }
  img {
    width: 100%;
  }
  margin-bottom: 10px;
  .title{
    text-align: left;
  }
}
</style>
