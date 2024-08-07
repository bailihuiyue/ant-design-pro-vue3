<template>
  <div class="OnlyChart">
    <a-button size="small" type="primary" @click="showExamplesModal = true" id="btn">打开图例</a-button>
    <MakeChart :cellSize="cellSize" :showExamplesModal="showExamplesModal" v-if="showMakeChart" @closeModal="onCloseModal"
      prevElName="#btn" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import MakeChart from '@/components/ChartGenerator/MakeChart/index.vue'
import chartList from '@/components/ChartGenerator/MakeChart/chartList'
import data from '@/components/ChartGenerator/MakeChart/components/Echarts/data'
import { cloneDeep } from 'lodash-es'

const cellSize = ref({ height: 25, width: 100, indexWidth: 60 })
const showMakeChart = ref(false)
onMounted(() => {
  nextTick(() => {
    showMakeChart.value = true

    chartList.value = {
      c45e6fb1e9b7b6558db679b5f_chart: {
        chartType: 'bar',
        name: 'bar',
        img: 'bar.webp',
        id: 'c45e6fb1e9b7b6558db679b5f_chart',
        x: 82,
        y: 37,
        w: 320,
        h: 180,
        chartOption: { ...cloneDeep(data.bar.chartOption) }
      }
    }
  })
})

// 弹窗
const showExamplesModal = ref(false)
const onCloseModal = (chartData) => {
  showExamplesModal.value = false
}
</script>
<style lang="less">
.OnlyChart {
  #chartWrapper {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
