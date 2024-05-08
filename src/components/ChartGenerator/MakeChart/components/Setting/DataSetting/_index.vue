<template>
  <div class="DataSetting">
    <a-form v-if="data">
      <a-form-item :label="$t('数据源')" name="dataOrgion" :rules="null">
        <a-select v-model:value="dataOrgion" style="width: 100%">
          <a-select-option value="static">{{ $t('静态数据') }}</a-select-option>
          <a-select-option value="api">{{ $t('接口数据') }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="dataOrgion === 'api'" :label="$t('接口地址')" name="api" :rules="null">
        <a-input-search v-model:value="total.inerfaceurl" :enter-button="$t('测试')" @search="onTest(total.inerfaceurl)">
        </a-input-search>
      </a-form-item>
      <LineOrBar v-if="[chartType.line, chartType.bar].includes(total.chartType)" :data="data" :total="total"
        :dataOrgion="dataOrgion" />
      <Pie v-if="chartType.pie === total.chartType" :data="data" :total="total" :dataOrgion="dataOrgion" />
    </a-form>
  </div>
</template>
<script lang="ts" name="DataSetting" setup>
import { ref } from 'vue'
import LineOrBar from './AdvancedEdit/LineOrBar.vue'
import Pie from './AdvancedEdit/Pie.vue'
import { chartType } from '@/components/ChartGenerator/MakeChart/types'

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

const dataOrgion = ref('static')

const onTest = (url) => {
  console.log(url)
}
</script>
<style lang="less">
@import '@/style/global.less';

.DataSetting {
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

  .seriesWrapper {
    // border: 1px solid #e8e8e8;
    // border-radius: 8px;
    // padding: 10px;
    margin-bottom: 10px;

    // box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
    //   0 5px 12px 4px rgba(0, 0, 0, 0.09);
    // border-bottom: 1px solid #e8e8e8;
    .divider {
      margin-left: -24px;
      margin-right: -24px;
      width: auto;
    }
  }
}
</style>
