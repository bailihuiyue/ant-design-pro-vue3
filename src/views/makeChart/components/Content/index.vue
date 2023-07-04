<template>
  <div class="Content">
    <Draggable
      animation="300"
      :list="chartList"
      group="MakeChart"
      ghostClass="ghost"
      chosenClass="chosen"
      item-key="fieldId"
      class="Draggable"
    >
      <template #item="{ element, index }">
        <Warpper
            @click="onClick(index,element)"
            :selected="selectedId===element.fieldId"
            :item="element"
            :currentIndex="index"
            @remove="onDelChart"
        >
            <ChartGenerator :option="element" />
        </Warpper>
      </template>
    </Draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Draggable from 'vuedraggable'
import ChartGenerator from '../Echarts/ChartGenerator.vue'
import Warpper from './Warpper.vue'
import { ChartItem } from '../../types'

export default defineComponent({
  name: 'Content',
  components: { Draggable, ChartGenerator, Warpper },
  setup(props, { emit }) {
    const chartList = ref([]);
    const selectedId = ref<string | null>(null)
    const onClick = (index: number, item: ChartItem) => {
      selectedId.value = item.fieldId + ''
      emit('showSetting', index, item)
    }
    // , item: ChartItem
    const onDelChart = (index: number) => {
      chartList.value = chartList.value.filter((data, i) => i !== index)
    }
    watch(
      () => chartList,
      (val) => {
        emit('change', chartList.value)
      },
      { deep: true }
    );
    return {
      chartList,
      selectedId,
      onClick,
      onDelChart
    };
  },
})
</script>
<style lang="scss">
.Content {
  .Draggable{
    width:100%;
    height:100%;
    display: flex;
    flex-flow: row wrap;
    row-gap: 0px;
    align-content: flex-start;
  }
  width: 100%;
  height: 92%;
  .BarChart,
  .LineChart {
    width: 100%;
    // height: 300px;
    display: inline-block;
  }
  .ghost {
    border: 2px dashed #0094ff;
  }
}
</style>
