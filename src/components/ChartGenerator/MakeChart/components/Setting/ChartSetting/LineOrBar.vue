<template>
  <a-collapse :bordered="false" ghost class="collapse" accordion expandIconPosition="end">
    <!-- forceRender -->
    <a-collapse-panel key="Title">
      <template #header> {{ $t('标题设置') }} </template>
      <Title :title="data.title" />
    </a-collapse-panel>
    <a-collapse-panel key="Grid" :header="$t('图形边距')">
      <Grid :grid="data.grid" :legend="data.legend" />
    </a-collapse-panel>
    <a-collapse-panel key="Legend" :header="$t('图例')">
      <Legend :legend="data.legend" :total="total" />
    </a-collapse-panel>
    <a-collapse-panel key="XAxis" :header="$t('横轴设置')">
      <XAxis :xAxis="data.xAxis" :grid="data.grid" />
    </a-collapse-panel>
    <a-collapse-panel key="YAxis" :header="$t('纵轴设置')" class="YAxisTab">
      <a-tabs>
        <a-tab-pane key="1" :tab="$t('左侧')" force-render>
          <YAxis :yAxis="data.yAxis[0]" :grid="data.grid" />
          <!-- :title="isDoubleYAxis ? $t('左侧纵轴设置') : ''" -->
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('右侧')" v-if="isDoubleYAxis">
          <YAxis :yAxis="data.yAxis[1]" :grid="data.grid" />
          <!-- :title="isDoubleYAxis ? $t('右侧纵轴设置') : ''" -->
        </a-tab-pane>
      </a-tabs>

      <!-- <a-divider v-if="isDoubleYAxis" /> -->
    </a-collapse-panel>
    <a-collapse-panel key="Position" :header="$t('位置微调')">
      <Position :total="total" />
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" name="BarSetting" setup>
import { ref, watch, defineAsyncComponent, computed } from 'vue'
import { chartType } from '@/components/ChartGenerator/MakeChart/types'
const Title = defineAsyncComponent(() => import('./_components/Base/Title.vue'))
const Grid = defineAsyncComponent(() => import('./_components/Base/Grid.vue'))
const Legend = defineAsyncComponent(() => import('./_components/Base/Legend/index.vue'))
const Position = defineAsyncComponent(() => import('./_components/Base/Position.vue'))
const XAxis = defineAsyncComponent(() => import('./_components/XAxis.vue'))
const YAxis = defineAsyncComponent(() => import('./_components/YAxis.vue'))

const props = defineProps({
  selectedChartId: String,
  data: {
    type: Object,
    default: null
  },
  total: {
    type: Object,
    default: null
  }
})

const isDoubleYAxis = computed(() => [chartType.lineBar].includes(props.total.chartType))
</script>
<style lang="less">
.BarSetting {}
</style>
