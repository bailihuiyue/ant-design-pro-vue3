<template>
  <div class="antv-chart-mini" style="margin-top:10px">
    <div class="chart-wrapper">
      <div :id="id"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { Area } from '@antv/g2plot'

export default defineComponent({
  name: 'MiniSmoothArea',
  props: ['id', 'data'],
  setup(props) {
    onMounted(() => {
      const area = new Area(props.id, {
        data: props.data,
        xField: 'x',
        yField: 'y',
        smooth: true,
        yAxis: false,
        xAxis: {
          range: [0, 1],
          label: null
        },
        height: 60,
        areaStyle: {
          fill: '#74BCFF',
          fillOpacity: 0.9
        },
        padding: [5, 0, 0, 0]
      })
      area.render()
    })
  }
})
</script>

<style lang="less" scoped>
</style>
