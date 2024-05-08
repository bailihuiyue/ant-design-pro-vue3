<template>
  <div class="ChartExample">
    <a-row :gutter="32">
      <a-col class="item" v-for="(c, index) in charts" :span="6">
        <img
          :src="getImageUrl(c.img)"
          @click="onClickImg(c, index)"
          :class="clickedImg === index ? 'clicked' : ''"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup name="chartExample">
import { ref, watch } from 'vue'

const props = defineProps({
  charts: {
    type: Array,
    default: []
  },
  clearChoose: Boolean
})
const getImageUrl = (name) => {
  return new URL(`./imgs/${name}`, import.meta.url).href
}

const clickedImg = ref(-1)
const emit = defineEmits(['click'])
const onClickImg = (c, index) => {
  clickedImg.value = index
  // 仅传递表格类型
  emit('click', c)
}

watch(
  () => props.clearChoose,
  (newVal) => {
    if (newVal) {
      clickedImg.value = -1
    }
  }
)
</script>
<style lang="less">
.ChartExample {
  .item {
    // width: 90%;
    // height: 220px;
    // cursor: move;
    // padding: 5px ;
    // display: inline-block;
    img {
      width: 100%;
      border: 1px solid #ddd;
      cursor: pointer;
      &.clicked,
      &:hover {
        border: 2px solid #0094ff;
      }
    }
    margin-bottom: 10px;
    .title {
      text-align: left;
    }
  }
}
</style>
