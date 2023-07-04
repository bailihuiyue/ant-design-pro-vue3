<template>
  <div class="ChartGenerator" :id="id" ref="chartRef"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch, nextTick } from 'vue';
import { customAlphabet } from 'nanoid'
import * as echarts from 'echarts'
import { getCharData } from '../../service'
import _ from 'lodash'
import { log } from 'console';
// import { ChartItem } from '../../types'

const nanoid = customAlphabet('1234567890abcdef', 25)

export default defineComponent({
  name: 'ChartGenerator',
  props: {
    option: {
      type: Object,
      default: null
    },
  },
  setup(props) {
    const id = ref(nanoid() + '_chart')
    let chartInstance:any = null
    const chartRef = ref<HTMLElement | null>(null)

    const getCharDataApi = async (option: any) => {
      const chartItem = _.cloneDeep(option.chartOption)
      // const data = await getCharData(chartItem.interfaceUrl);
      // chartItem.series[0].data = data
      //   chartInstance.clear();
      chartInstance.setOption(chartItem);
      // todo:info:不加nextTick会导致调整占用宽度之后,保存按钮需要点击两遍图表宽度才能生效,猜测是因为外边边框的宽度调整速度慢于echart的调整速度,所以echarts的宽度被父级限定死了
      nextTick(()=>{
        // chartInstance.resize(setContainerHeight());
        chartInstance.resize();
      })
    }

    // 根据比例设置echarts图形宽高,目前是4:3
    const setContainerHeight=()=>{
        const width = document.getElementById(id.value)!.offsetWidth
        // debugger
        const height = 3 * width / 4
        return {width :width +'px',height:height+'px'}
    }

    onMounted(() => {
      chartInstance = echarts.init(document.getElementById(id.value) as HTMLElement);
      if (props.option) {
        if (props.option.interfaceUrl) {
          getCharDataApi(props.option)
        } else {
          chartInstance.setOption(props.option.chartOption);
        //   chartInstance.resize();
        }
        window.addEventListener('resize', function () {
            // todo:bug:使用setContainerHeight()后拖拽缩放时图形比例不对
            // chartInstance.resize(setContainerHeight());
            chartInstance.resize();
        });
      }
    })
    watch(
      () => props.option,
      async (val) => {
        getCharDataApi(val)
      },
      { deep: true }
    );
    return { id };
  },
})
</script>
<style lang="scss">
.ChartGenerator {
  width: 100%;
  min-height: 200px;
  max-height: 100%;
  display: inline-block;
}
</style>
