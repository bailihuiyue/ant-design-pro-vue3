<template>
  <div class="ChatAndExcel">
    <div id="x-spreadsheet"></div>
    <MakeChart :cellSize="cellSize" :showExamplesModal="showExamplesModal" :excelHeight="excelHeight"
      :excelWidth="excelWidth" v-if="showMakeChart" @closeModal="onCloseModal" isInXSheet />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import Spreadsheet from '@/components/ChartGenerator/MakeChart/components/x-spreadsheet/index.js'
import { message } from 'ant-design-vue'
import zhCN from '@/components/ChartGenerator/MakeChart/components/x-spreadsheet/locale/zh-cn'
import emitter from '@/utils/eventBus'
import MakeChart from '@/components/ChartGenerator/MakeChart/index.vue'
import chartList from '@/components/ChartGenerator/MakeChart/chartList'
import data from '@/components/ChartGenerator/MakeChart/components/Echarts/data'
import { cloneDeep } from 'lodash-es'

const cellSize = ref({ height: 25, width: 100, indexWidth: 60 })

Spreadsheet.locale('zh-cn', zhCN)
const excelHeight = ref()
const excelWidth = ref()
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

  excelHeight.value = document.querySelector('#layoutContent').clientHeight - 50
  excelWidth.value = document.querySelector('#layoutContent').clientWidth
  var chartEl = document.createElement('img')
  chartEl.src = './chart.png'
  chartEl.width = 16
  chartEl.height = 16
  const s = new Spreadsheet('#x-spreadsheet', {
    showToolbar: true,
    showGrid: true,
    showBottomBar: false,
    view: {
      height: () => excelHeight.value,
      width: () => excelWidth.value
    },
    row: {
      height: cellSize.value.height
    },
    col: {
      width: cellSize.value.width,
      indexWidth: 60
    },
    style: {
      bgcolor: '#ffffff',
      align: 'left',
      valign: 'middle',
      textwrap: false,
      strike: false,
      underline: false,
      color: '#0a0a0a',
      font: {
        name: 'Helvetica',
        size: 10,
        bold: false,
        italic: false
      }
    },
    extendToolbar: {
      left: [
        {
          tip: '保存',
          el: chartEl,
          onClick: (data, sheet) => {
            console.log(data, chartList.value)
          }
        }
      ],
      right: [
        {
          tip: '图表',
          el: chartEl,
          onClick: (data, sheet) => {
            showExamplesModal.value = true
          }
        }
      ]
    }
  })
    .loadData({}) // load data
    .change((data) => {
      // save data to db
    })
})

emitter.once('x-spreadsheetScrollY', (top) => {
  document.getElementById('chartWrapper').scrollTop = top
})
emitter.once('x-spreadsheetScrollX', (left) => {
  document.getElementById('chartWrapper').scrollLeft = left
})

// 弹窗
const showExamplesModal = ref(false)
const onCloseModal = () => {
  showExamplesModal.value = false
}
</script>
<style lang="less">
.ChatAndExcel {
  #chartWrapper {
    background: rgba(0, 0, 0, 0.1);
  }

  // .x-spreadsheet-scrollbar.vertical{
  //   pointer-events: none;
  //   background: transparent;
  //   div{
  //     background: transparent;
  //     width: calc(100vw - 100px) !important;
  //   }
  // }
  #x-spreadsheet * {
    box-sizing: content-box;
  }

  // overflow: hidden;
}
</style>
