<template>
  <div class="ExamplesModal">
    <a-modal ref="modalRef" :open="open" title="选择图表" width="80%" @ok="onOk" @cancel="onCancel">
      <a-tabs>
        <a-tab-pane forceRender v-for="d in data" :key="d.title" :tab="d.title">
          <ChartExample :charts="d.charts" @click="onClickChart" :clearChoose="!open" />
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script lang="ts" setup name="chartExamples">
import { ref, watch, reactive } from 'vue'
import ChartExample from './ChartExample.vue'
import data from './data'
import { customAlphabet } from 'nanoid'
import chartList from '@/components/ChartGenerator/MakeChart/chartList'
import echartTemplateData from '@/components/ChartGenerator/MakeChart/components/Echarts/data'
import { cloneDeep } from 'lodash-es'

const nanoid = customAlphabet('1234567890abcdef', 25)
const props = defineProps({
  open: Boolean
})

const emit = defineEmits(['selected', 'closeModal'])

const selectedChart: any = ref({})
const onClickChart = (c) => {
  selectedChart.value = c
}

const onOk = () => {
  const id = nanoid() + '_chart'
  chartList.value[id] = {
    ...cloneDeep(echartTemplateData[selectedChart.value.name]),
    id,
    x: 0,
    y: 0,
    w: 320,
    h: 180
  }
  emit('selected', id)
  emit('closeModal')
}

const onCancel = () => {
  selectedChart.value = {}
  emit('closeModal')
}
</script>
<style lang="less">
.ExamplesModal {
  text-align: center;

  // .BarChart,
  // .LineChart {
  //   width: 100%;
  //   height: 200px;
  // }
}
</style>
