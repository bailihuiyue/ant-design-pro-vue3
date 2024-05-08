<template>
  <div class="StaticData">
    <div v-for="(d, i) in data.series" class="seriesWrapper">
      <a-form-item :label="$t('数据名称')" name="dataOrgion" :rules="null">
        {{ d.name }}
        <a-tooltip>
          <template #title>{{ $t('双击删除数据') }}</template>
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
      <a-form-item :label="$t('内容')" name="dataOrgion" :rules="null">
        <TokenSplitInput v-model:value="d.data" />
      </a-form-item>
    </div>
  </div>
</template>
<script lang="ts" setup name="StaticData">
import FormItemTooltip from '@/components/ChartGenerator/MakeChart/components/FormItemTooltip.vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import ColorPickerPopHover from '@/components/ChartGenerator/MakeChart/components/ColorPicker/ColorPickerPopHover.vue'
import TokenSplitInput from '@/components/ChartGenerator/MakeChart/components/Setting/_components/TokenSplitInput.vue'
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

const onDelSeries = (index, name) => {
  const legend = props.data.legend.data
  legend.splice(legend.indexOf(name), 1)
  props.data.series.splice(index, 1)
}
</script>
<style lang="less">
.StaticData {
  .seriesWrapper {
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
      0 5px 12px 4px rgba(0, 0, 0, 0.09);
  }
}
</style>
