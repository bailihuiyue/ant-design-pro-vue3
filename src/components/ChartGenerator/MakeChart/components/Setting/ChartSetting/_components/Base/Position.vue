<template>
  <div class="PositionSetting">
    <a-space size="large">
      <a-form-item :label="$t('上')" name="y" :rules="null">
        <a-input-number v-model:value="total.y" :min="0" />
      </a-form-item>
      <a-form-item :label="$t('左')" name="x" :rules="null">
        <a-input-number v-model:value="total.x" :min="0" />
      </a-form-item>
    </a-space>
    <a-space size="large">
      <a-form-item :label="$t('宽')" name="w" :rules="null">
        <a-input-number v-model:value="total.w" :min="0" @change="onChangeW" />
      </a-form-item>
      <a-form-item :label="$t('高')" name="h" :rules="null">
        <a-input-number v-model:value="total.h" :min="0" @change="onChangeH" />
      </a-form-item>
    </a-space>
  </div>
</template>
<script lang="ts" setup name="PositionSetting">
import { ref, onMounted } from 'vue'
import chartList from '@/components/ChartGenerator/MakeChart/chartList'
import * as echarts from 'echarts'

const props = defineProps({
  total: Object
})

let chartInstance: any = null
onMounted(() => {
  chartInstance = echarts.getInstanceByDom(document.getElementById(props.total.id))
})

const onChangeW = (val) => {
  chartInstance.resize({ width: val })
}
const onChangeH = (val) => {
  chartInstance.resize({ height: val })
}
</script>
<style lang="less">
.PositionSetting {}
</style>
