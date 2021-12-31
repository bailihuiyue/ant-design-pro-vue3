<template>
  <div :id="id"></div>
</template>
<script>
import { defineComponent, onMounted } from 'vue'
import { Pie } from '@antv/g2plot'

export default defineComponent({
  props: ['id', 'data'],
  setup(props) {
    onMounted(() => {
      const piePlot = new Pie(props.id, {
        appendPadding: 60,
        data: props.data,
        angleField: 'count',
        colorField: 'item',
        radius: 1,
        innerRadius: 0.6,
        label: null,
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        state: {
          // 设置 active 激活状态的样式
          active: {
            animate: { duration: 100, easing: 'easeLinear' },
            style: {
              lineWidth: 2,
              stroke: '#fff',
              fillOpacity: 0.7,
            }
          }
        },
        legend: {
          position: 'bottom'
        },
        statistic: {
          title: false,
          content: {
            content: false
          }
        }
      })

      piePlot.render()
    })
  }
})
</script>
<style lang="less">
</style>
