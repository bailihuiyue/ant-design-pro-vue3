<template>
  <div class="antv-chart-mini" style="margin-bottom: -10px;">
    <div class="chart-wrapper">
      <div :id="id"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { Area } from '@antv/g2plot'
import moment from 'moment'
const data = []
const beginDay = new Date().getTime()

for (let i = 0; i < 10; i++) {
  data.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round(Math.random() * 10)
  })
}

export default defineComponent({
  name: 'MiniArea',
  props: ['id'],
  setup(props) {
    onMounted(() => {
      const area = new Area(props.id, {
        data,
        xField: 'x',
        yField: 'y',
        smooth: true,
        yAxis: false,
        xAxis: {
          range: [0, 1],
          label: null
        },
        height: 50,
        areaStyle: {
          fill: '#74BCFF',
          fillOpacity: 1
        },
        line: {
          color: '#74BCFF'
        },
        padding: [5, 0, 0, 0]
      })
      area.render()
    })
  }
})
</script>

<style lang="less" scoped>
// @import 'chart';
</style>
