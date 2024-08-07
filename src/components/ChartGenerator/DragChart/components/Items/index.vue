<template>
  <div class="Items">
    <Draggable animation="300" :list="chartList" :group="{ name: 'DragChart', pull: 'clone', put: false }" :sort="false"
      :clone="clone" item-key="chartType">
      <template #item="{ element }">
        <ChartExample :option="element" style="min-width:220px;max-width:30%" />
      </template>
    </Draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive } from 'vue';
import Draggable from 'vuedraggable'
import ChartGenerator from '../Echarts/ChartGenerator.vue'
import chartData from '../Echarts/data'
import { cloneDeep } from 'lodash-es';
import { ChartItem } from '../../types'
import ChartExample from './ChartExample.vue'

export default defineComponent({
  name: 'Items',
  components: { Draggable, ChartGenerator, ChartExample },
  setup() {
    const chartList = reactive(chartData);
    const clone = (obj: ChartItem) => {
      const newObj = Object.assign(cloneDeep(obj), { fieldId: `${obj.chartType}_${new Date().getTime()}` });
      return newObj;
    }

    return {
      chartList,
      clone
    };
  },
})
</script>
<style lang="less">
.Items {
  text-align: center;

  .BarChart,
  .LineChart {
    width: 100%;
    height: 200px;
  }
}
</style>
