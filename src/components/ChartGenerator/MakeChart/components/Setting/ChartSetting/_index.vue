<template>
  <div class="ChartSetting">
    <a-form v-if="data">
      <LineOrBar :data="data" :total="total" v-if="[chartType.line, chartType.bar].includes(total.chartType)" />
      <Pie :data="data" :total="total" v-else-if="[chartType.pie].includes(total.chartType)" />
    </a-form>
  </div>
</template>
<script lang="ts" name="ChartSetting" setup>
import { ref, watch, defineAsyncComponent, computed } from 'vue'
import { chartType } from '@/components/ChartGenerator/MakeChart/types'
import LineOrBar from './LineOrBar.vue'
import Pie from './Pie.vue'
// const LineOrBar = defineAsyncComponent(() => import('./LineOrBar.vue'))

const props = defineProps({
  selectedChartId: String,
  data: {
    type: Object,
    default: null
  },
  total: {
    type: Object,
    default: null
  }
})

const activedCollapse = ref('YAxis')
</script>
<style lang="less">
@import '@/style/global.less';

.ChartSetting {
  .collapse {
    .ant-collapse-item {
      border-bottom: 1px solid #e8e8e8;
    }

    .ant-form-item {
      margin-bottom: 10px;
    }

    .ant-collapse-header-text {
      &:hover {
        color: @color-primary;
      }
    }

    .ant-collapse-item-active {
      .ant-collapse-header-text {
        font-weight: bold;
        color: @color-primary;
      }
    }
  }

  .YAxisTab {
    .ant-collapse-content-box {
      padding-top: 0 !important;

      .ant-tabs-tab {
        .ant-tabs-tab-btn {
          font-size: 13px;
        }

        padding-top: 0;
      }
    }
  }
}
</style>
