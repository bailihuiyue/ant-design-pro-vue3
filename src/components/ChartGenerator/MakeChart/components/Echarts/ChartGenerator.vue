<template>
  <VueDraggableResizable
    class="dragger"
    :parent="true"
    @resizing="onResize"
    :w="options.w"
    :h="options.h"
    :x="options.x"
    :y="options.y"
    style="pointer-events: auto"
    :draggable="!locked"
    :resizable="!locked"
    @activated="onActivated"
    @deactivated="onDeactivated"
    :class="locked ? 'lockedClass' : ''"
    :min-width="50"
    :min-height="50"
    :snap="true"
    :snapTolerance="10"
    :active="isActivated"
    parentElementCannotClick
    @dragstop="onDragStop"
  >
    <DraggerToolBar @lock="onLock" :locked="locked" v-show="isActivated" @del="onDelChart" />
    <div class="ChartGenerator" :id="options.id" ref="chartRef" :style="{ width: options.w + 'px', height: options.h + 'px' }"></div>
  </VueDraggableResizable>
</template>
<script lang="ts" setup name="ChartGenerator">
import { onMounted, ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { cloneDeep } from 'lodash-es'
import VueDraggableResizable from '../vue-draggable-resizable-gorkys-vue3/components/vue-draggable-resizable.vue'
import DraggerToolBar from './DraggerToolBar.vue'
// 可选择导入默认样式
import '../vue-draggable-resizable-gorkys-vue3/components/vue-draggable-resizable.css'
import chartTemplateData from '../Echarts/data'
import chartList from '../../chartList'
import { watchDebounced } from '@vueuse/core'
import { deepDiffKeys } from '@/utils/util'

const props = defineProps({
  options: {
    type: Object,
    default: null
  }
})
let chartInstance: any = null
const chartRef = ref<HTMLElement | null>(null)
let oldChartOption: any = {}

const refreshChart = (option, notMerge = false) => {
  const diff = deepDiffKeys(option, oldChartOption)
  // TODO:暂时废弃
  // #region
  // 用于性能优化: watch到scale和unit的时候计算新的formatter,但是生成了formatter又会调用watch,
  // 由于formatter每次都是重新生成对象,于是又被watch到,所以会无限循环
  // 所以加一个判断,虽然watch到scale和unit改变,但是不重新使用setOption绘画chart,只是改变formatter的内容
  // 达成效果:scale,unit变化时,不setOption
  // 总结bug原因:watch deep时,new和old值一样无法判断导致:scale,unit变化->formatter变化->formatter变化->....
  // if (
  //   diff.length === 1 &&
  //   (diff[0].indexOf('customLabel.scale') > 0 || diff[0].indexOf('customLabel.unit') > 0)
  // ) {
  //   option.yAxis.forEach((item) => {
  //     const customY = item?.axisLabel?.customLabel
  //     if (customY?.open) {
  //       const scale = customY.scale
  //       const unit = customY.unit
  //       // // 增加一个prevKey用于判断是否更新,否则每次formatter都是一个新对象,会导致watch无限循环
  //       // // if (customY.prevUpdated !== customY.scale + customY.unit) {
  //       item.axisLabel.formatter = (value: number, index: number) => {
  //         return value !== 0 ? parseInt(value / scale + '') + unit : 0
  //       }
  //       // // customY.prevUpdated = customY.scale + customY.unit
  //       // // }
  //     }
  //   })
  // } else {
  //   console.log(123)

  //   chartInstance.setOption(option, notMerge, true)
  // }
  // #endregion

  // TODO:上面算法暂时废弃,目前发现只要判断有变化的字段即可,当设置完formatter之后再cloneDeep就可以避免deepDiffKeys检测到formatter的变化
  // 尝试直接查看变量值的变化而不是用deepDiffKeys计算
  if (diff.length) {
    Array.isArray(option.yAxis) &&
      option.yAxis?.forEach((item) => {
        const customY = item?.axisLabel?.customLabel
        if (customY?.open) {
          const scale = customY.scale
          const unit = customY.unit
          if (customY.prevUpdated !== customY.scale + customY.unit) {
            item.axisLabel.formatter = (value: number, index: number) => {
              return value !== 0 ? parseInt(value / scale + '') + unit : 0
            }
          }
          customY.prevUpdated = customY.scale + customY.unit
        }
      })
    chartInstance.setOption(option, notMerge)
  }
  oldChartOption = cloneDeep(option)
}

const getCharDataApi = async (options: any) => {
  const chartItem = cloneDeep(options.chartOption)
  // const data = await getCharData(chartItem.interfaceUrl);
  // chartItem.series[0].data = data
  //   chartInstance.clear();
  refreshChart(chartItem)
  // todo:info:不加nextTick会导致调整占用宽度之后,保存按钮需要点击两遍图表宽度才能生效,猜测是因为外边边框的宽度调整速度慢于echart的调整速度,所以echarts的宽度被父级限定死了
  nextTick(() => {
    // chartInstance.resize(setContainerHeight());
    chartInstance.resize()
  })
}

// 根据比例设置echarts图形宽高,目前是4:3
const setContainerHeight = () => {
  const width = document.getElementById(props.options.id)!.offsetWidth
  // debugger
  const height = (3 * width) / 4
  return { width: width + 'px', height: height + 'px' }
}

// 监听图表配置的变化,自动渲染Echart
watchDebounced(
  () => props.options.chartOption,
  async (val) => {
    refreshChart(val, true)
  },
  { deep: true, debounce: 500 }
)

onMounted(() => {
  chartInstance = echarts.init(document.getElementById(props.options.id) as HTMLElement)
  // const isAdd = props.options.isAdd
  const chartObj = props.options
  if (props.options) {
    if (props.options.interfaceUrl) {
      getCharDataApi(props.options)
    } else {
      refreshChart(chartObj.chartOption)
      chartInstance.resize({ width: props.options.w + 'px', height: props.options.h + 'px' })
    }
    // window.addEventListener('resize', function () {
    //   // todo:bug:使用setContainerHeight()后拖拽缩放时图形比例不对
    //   // chartInstance.resize(setContainerHeight());
    //   chartInstance.resize()
    // })
  }
})

const onResize = (x, y, width, height) => {
  props.options.x = x
  props.options.y = y
  props.options.w = width
  props.options.h = height
  // nextTick(() => {
  // chartInstance.resize(setContainerHeight());
  chartInstance.resize({ width, height })
  // })
}

const onDragStop = (x, y) => {
  props.options.x = x
  props.options.y = y
}

const locked = ref(false)
const onLock = (isLocked) => {
  locked.value = isLocked
}
const isActivated = ref(false)
const onActivated = () => {
  isActivated.value = true
}
const onDeactivated = (e) => {
  // 点击到 配置图表 弹框时,不去掉选中元素的拖拽点,用来表示当前选中的元素
  const classes = getParentNodesListClassNames(e)
  if (!classes.includes('MakeChartSettings') && !classes.includes('themeColorCustomColor')) {
    isActivated.value = false
    emit('deactivate')
  }
}

const emit = defineEmits(['deactivate'])
const onDelChart = () => {
  delete chartList.value[props.options.id]
  emit('deactivate')
}

const getParentNodesListClassNames = (element) => {
  var classNames = []
  while (element?.parentNode) {
    element = element.parentNode
    if (element.classList) {
      classNames.push(...element.classList)
    }
  }
  return classNames
}
</script>
<style lang="less">
.dragger {
  .handle {
    border-radius: 50%;
    width: 10px !important;
    height: 10px !important;
    border: 1px solid #3883fa;
  }

  &.vdr {
    border: 1px solid #3883fa;
  }

  &.lockedClass {
    border: none;
  }

  .ChartGenerator {
    width: 300px;
    // min-height: 300px;
    // max-height: 100px;
    display: inline-block;
  }
}
</style>
