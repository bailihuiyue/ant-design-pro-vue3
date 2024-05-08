<template>
  <a-collapse :bordered="false" ghost class="collapse" accordion expandIconPosition="end">
    <a-collapse-panel key="Title" forceRender>
      <template #header> {{ $t('标题设置') }} </template>
      <Title :title="data.title" />
    </a-collapse-panel>
    <!-- <a-collapse-panel key="Grid" :header="$t('图形边距')" forceRender>
      <Grid :grid="data.grid" :legend="data.legend" />
    </a-collapse-panel> -->
    <a-collapse-panel key="Legend" :header="$t('图例')" forceRender>
      <Theme v-model:value="total.theme" :objs="data.series.data" />
      <a-form-item :label="$t('是否显示')" name="show" :rules="null">
        <a-switch v-model:checked="data.legend.show" />
      </a-form-item>
      <a-form-item :label="$t('字体大小')" name="fontSize" :rules="null">
        <a-input-number v-model:value="data.legend.textStyle.fontSize" />
      </a-form-item>
      <a-form-item :label="$t('方向')" name="orient" :rules="null">
        <a-switch v-model:checked="data.legend.orient" checked-children="横向" checkedValue="horizontal"
          un-checked-children="纵向" unCheckedValue="vertical" />
      </a-form-item>
      <a-form-item :label="$t('上边距')" name="top" :rules="null">
        <a-slider v-model:value="data.legend.top" />
      </a-form-item>
      <a-form-item :label="$t('位置')" name="left" :rules="null">
        <LeftSelect v-model:value="data.legend.left" />
      </a-form-item>
    </a-collapse-panel>
    <a-collapse-panel key="Pie" forceRender>
      <template #header> {{ $t('饼图设置') }} </template>
      <a-form-item :label="$t('显示标签')" name="label" :rules="null">
        <a-switch v-model:checked="data.series.label.show" />
      </a-form-item>
      <a-form-item :label="$t('字体大小')" name="fontSize" :rules="null">
        <a-input-number v-model:value="data.series.label.fontSize" />
      </a-form-item>
      <a-form-item :label="$t('外半径')" name="outer" :rules="null">
        <a-slider v-model:value="data.series.radius[1]" />
      </a-form-item>
      <a-form-item :label="$t('内半径')" name="inner" :rules="null">
        <a-slider v-model:value="data.series.radius[0]" />
      </a-form-item>
      <a-form-item :label="$t('饼图圆角')" name="borderRadius" :rules="null">
        <a-slider v-model:value="data.series.itemStyle.borderRadius" :min="0" :max="50" />
      </a-form-item>
      <a-form-item :label="$t('描边线宽')" name="borderWidth" :rules="null">
        <a-slider v-model:value="data.series.itemStyle.borderWidth" :min="0" :max="10" />
      </a-form-item>
      <a-form-item :label="$t('是否展示成南丁格尔图')" name="roseType" :rules="null">
        <a-switch v-model:checked="data.series.roseType" checked-children="是" un-checked-children="否"
          checkedValue="radius" :unCheckedValue="false" />
      </a-form-item>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" name="BarSetting" setup>
import { ref, watch, defineAsyncComponent, computed } from 'vue'
import { chartType } from '@/components/ChartGenerator/MakeChart/types'
import LeftSelect from '@/components/ChartGenerator/MakeChart/components/Setting/_components/LeftSelect.vue'
import { themes } from '@/components/ChartGenerator/MakeChart/components/Echarts/chartTools'
import Theme from './_components/Base/Theme.vue'

const Title = defineAsyncComponent(() => import('./_components/Base/Title.vue'))

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
</script>
<style lang="less">
.BarSetting {}
</style>
