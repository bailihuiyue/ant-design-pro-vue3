<template>
  <div class="LineOrBarDataSetting">
    <a-alert :message="$t('数据条数默认按照图例名称生成')" banner style="margin-bottom: 10px" />
    <!-- 图例名称 -->
    <LegendName :legend="data.legend" :total="total" />
    <a-form-item :label="$t('横轴数据')" name="xAxisData" :rules="null">
      <TokenSplitInput v-model:value="data.xAxis.data" />
    </a-form-item>
    <div v-if="['static', 'api'].includes(dataOrgion)">
      <a-button type="primary" size="small" style="margin-bottom: 10px" @click="onAddData">
        {{ $t('添加数据') }}
      </a-button>
    </div>
    <div v-for="(d, i) in data.series" class="seriesWrapper">
      <a-form-item :label="$t('数据名称')" name="dataOrgion" :rules="null">
        {{ d.name }}
        <a-tooltip>
          <template #title>{{ $t('删除数据') }}</template>
          <a-button type="link" danger @dblclick="onDelSeries(i, d.name)">
            <DeleteOutlined />
          </a-button>
        </a-tooltip>
      </a-form-item>
      <a-form-item name="Id" :rules="null">
        <template #label>Id
          <FormItemTooltip txt="Id可作为后端识别字段, 必须唯一" />
        </template>
        <a-input v-model:value="d.id" />
      </a-form-item>
      <a-form-item :label="$t('颜色')" name="color" :rules="null">
        <a-input v-model:value="d.itemStyle.color">
          <template #suffix>
            <ColorPickerPopHover v-model:value="d.itemStyle.color" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-if="dataOrgion === 'static'" :label="$t('内容')" name="dataOrgion" :rules="null">
        <TokenSplitInput v-model:value="d.data" />
      </a-form-item>
      <a-divider class="divider" />
    </div>
  </div>
</template>
<script lang="ts" setup name="LineOrBarDataSetting">
import { ref } from 'vue'
import LegendName from '../../ChartSetting/_components/Base/Legend/LegendName.vue'
import FormItemTooltip from '@/components/ChartGenerator/MakeChart/components/FormItemTooltip.vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import ColorPickerPopHover from '@/components/ChartGenerator/MakeChart/components/ColorPicker/ColorPickerPopHover.vue'
import TokenSplitInput from '@/components/ChartGenerator/MakeChart/components/Setting/_components/TokenSplitInput.vue'
import { themes, barGap } from '@/components/ChartGenerator/MakeChart/components/Echarts/chartTools'

const props = defineProps({
  selectedChartId: String,
  data: {
    type: Object,
    default: null
  },
  total: {
    type: Object,
    default: null
  },
  dataOrgion: {
    type: String,
    default: ''
  }
})

const onAddData = () => {
  props.data.series.push({
    id: null,
    data: [],
    type: props.total.name,
    // name,
    barGap,
    itemStyle: {
      color: themes[props.total.theme][props.data.series.length]
    }
  })
}

const onDelSeries = (index, name) => {
  const legend = props.data.legend.data
  legend.splice(legend.indexOf(name), 1)
  props.data.series.splice(index, 1)
}
</script>
<style lang="less">
.LineOrBarDataSetting {}
</style>
