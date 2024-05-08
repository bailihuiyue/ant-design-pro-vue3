<template>
  <div>
    <a-drawer :open="open" root-class-name="MakeChartSettings" placement="right" @close="onCloseSetting" :mask="false"
      :maskClosable="false" :closable="false" width="350">
      <a-tabs centered v-model:activeKey="activeTab">
        <!-- <a-tab-pane key="图表" :tab="$t('图表')" force-render>图表</a-tab-pane> -->
        <a-tab-pane key="样式" :tab="$t('样式')">
          <ChartSetting :selectedChartId="selectedChartId" :total="total" :data="data" />
        </a-tab-pane>
        <a-tab-pane key="数据" :tab="$t('数据')">
          <DataSetting :selectedChartId="selectedChartId" :total="total" :data="data" />
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
  </div>
</template>
<script lang="ts" setup name="MakeChartSettings">
import { ref, watch, defineAsyncComponent } from 'vue'
import ChartSetting from './ChartSetting/_index.vue'
import DataSetting from './DataSetting/_index.vue'
// const ChartSetting = defineAsyncComponent(() => import('./ChartSetting/_index.vue'))
// const DataSetting = defineAsyncComponent(() => import('./DataSetting/_index.vue'))
import chartList from '../../chartList'

const props = defineProps({
  selectedChartId: String,
  open: Boolean
})

const emit = defineEmits(['save', 'close'])
const onSaveSetting = (fun: () => {}) => {
  emit('save', fun)
}

const onCloseSetting = () => {
  emit('close')
}

const data: any = ref(null)
const total: any = ref(null)
watch(
  () => props.selectedChartId,
  (val) => {
    if (val) {
      data.value = chartList.value[val].chartOption
      total.value = chartList.value[val]
    }
  },
  { immediate: true }
)
const activeTab = ref('样式')
</script>
<style lang="less">
.MakeChartSettings {
  .ant-drawer-body {
    padding-top: 0;

    .ant-tabs-tab-btn {
      font-size: 15px;
    }
  }
}
</style>
