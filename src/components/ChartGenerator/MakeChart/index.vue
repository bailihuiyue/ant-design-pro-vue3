<template>
  <div class="MakeChart">
    <ExamplesModal
      :open="showExamplesModal"
      @selected="onSelectedChart"
      @closeModal="onCloseModal"
    />
    <Container
      :excelHeight="excelHeight"
      :excelWidth="excelWidth"
      :cellSize="cellSize"
      :chartList="chartList"
      @click="onClickChart"
      @deactivate="onDeactivate"
      :isInXSheet="isInXSheet"
      :prevElName="prevElName"
    />
    <Setting
      :selectedChartId="selectedChartId"
      :open="showSettings"
      @save="onSaveSetting"
      @close="showSettings = false"
    ></Setting>
  </div>
</template>
<script lang="ts" setup name="MakeChart">
import { ref } from 'vue'
import ExamplesModal from './components/ExamplesModal/index.vue'
import Container from './components/Container/index.vue'
import Setting from './components/Setting/index.vue'
import { ChartItem } from './types'
import { customAlphabet } from 'nanoid'
import chartList from './chartList'
import data from './components/Echarts/data'

const nanoid = customAlphabet('1234567890abcdef', 25)
const props = defineProps({
  showExamplesModal: Boolean,
  excelHeight: {
    type: Number,
    default: 0
  },
  excelWidth: {
    type: Number,
    default: 0
  },
  cellSize: {
    type: Object,
    default: { height: 25, width: 100, indexWidth: 60 }
  },
  isInXSheet: {
    type: Boolean,
    default: false
  },
  prevElName: {
    type: String,
    default: false
  }
})

const onShowSetting = (index: number, item: ChartItem) => {}
const onSaveSetting = (fun: Function) => {
  fun()
}

// 从图例中选择了一个图表
const onSelectedChart = (id) => {
  emit('closeModal', id)
}

const emit = defineEmits(['closeModal'])
const onCloseModal = () => {
  emit('closeModal')
}

const selectedChartId = ref()
const showSettings = ref(false)
const onClickChart = (id) => {
  showSettings.value = true
  selectedChartId.value = id
}
const onDeactivate = () => {
  showSettings.value = false
  selectedChartId.value = null
}
</script>
<style lang="less">
.MakeChart {
  // width: 100%;
  // height: 95vh;
  // display: flex;
  // flex-flow: row nowrap;

  h5 {
    height: 40px;
    font-weight: 600;
    font-size: 12px;
    margin-left: 8px;
  }

  @lr-width: 360px;

  .layout-left {
    width: 255px;
    height: 100%;
    overflow-y: scroll;
    box-shadow: 5px 0px 5px -2px #0000001a;
    margin-right: 10px;
  }

  .layout-center {
    height: 100%;
    flex: 1;
    overflow-y: scroll;
  }

  .layout-right {
    width: @lr-width;
    height: 100%;
    overflow-y: scroll;
    box-shadow: -5px 0px 5px -2px #0000001a;
    margin-left: 10px;
  }

  // & ::-webkit-scrollbar {
  //   width: 4px;
  //   height: 4px;
  // }
  // & ::-webkit-scrollbar-track {
  //   background: transparent;
  // }
  // & ::-webkit-scrollbar-thumb {
  //   border-radius: 4px;
  //   background-color: rgba(144, 147, 153, 0.3);
  //   transition: background-color 0.3s;
  // }
  // & ::-webkit-scrollbar-thumb:hover {
  //   background-color: rgba(144, 147, 153, 0.5);
  // }
}
</style>
