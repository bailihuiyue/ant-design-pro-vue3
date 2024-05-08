<template>
  <div class="YAxisSetting">
    <div class="title">{{ title }}</div>
    <a-form-item :label="$t('显示y轴')" name="show" :rules="null">
      <a-switch v-model:checked="yAxis.show" />
    </a-form-item>
    <a-form-item :label="$t('Id')" name="id" :rules="null">
      <a-input v-model:value="yAxis.id" />
    </a-form-item>
    <a-form-item :label="$t('坐标轴名称')" name="name" :rules="null">
      <a-input v-model:value="yAxis.name" />
    </a-form-item>
    <a-form-item :label="$t('轴名称颜色')" name="nameTextStyleColor" :rules="null">
      <a-input v-model:value="yAxis.nameTextStyle.color">
        <template #suffix>
          <ColorPickerPopHover v-model:value="yAxis.nameTextStyle.color" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('文字颜色')" name="axisLabelColor" :rules="null">
      <a-input v-model:value="yAxis.axisLabel.color">
        <template #suffix>
          <ColorPickerPopHover v-model:value="yAxis.axisLabel.color" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('文字旋转')" name="rotate" :rules="null">
      <a-slider v-model:value="yAxis.axisLabel.rotate" :min="-90" :max="90" />
    </a-form-item>
    <a-form-item :label="$t('显示轴线')" name="axisLineShow" :rules="null">
      <a-switch v-model:checked="yAxis.axisLine.show" @change="onChangeAxisLineShow" />
    </a-form-item>
    <a-form-item :label="$t('轴线颜色')" name="axisLineStyle" :rules="null">
      <a-input v-model:value="yAxis.axisLine.lineStyle.color">
        <template #suffix>
          <ColorPickerPopHover v-model:value="yAxis.axisLine.lineStyle.color" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('水平分割线')" name="splitLineShow" :rules="null">
      <a-switch v-model:checked="yAxis.splitLine.show" />
    </a-form-item>
    <a-form-item :label="$t('水平分割线样式')" name="splitLinelineStyle" :rules="null">
      <a-select v-model:value="yAxis.splitLine.lineStyle.type">
        <a-select-option value="solid"> 实线 </a-select-option>
        <a-select-option value="dashed"> 虚线 </a-select-option>
        <a-select-option value="dotted"> 点 </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="$t('刻度分割线')" name="axisTick" :rules="null">
      <a-switch v-model:checked="yAxis.axisTick.show" />
    </a-form-item>
    <a-form-item :label="$t('自定义单位')" name="customLabel" :rules="null">
      <a-switch v-model:checked="yAxis.axisLabel.customLabel.open" @change="onChangeCustomLabel" />
    </a-form-item>
    <a-form-item :label="$t('缩小比例')" name="scale" :rules="null">
      <a-input-number v-model:value="yAxis.axisLabel.customLabel.scale" :min="1" @change="onChangeScale" />
    </a-form-item>
    <a-form-item :label="$t('单位文字')" name="unit" :rules="null">
      <a-input v-model:value="yAxis.axisLabel.customLabel.unit" @change="onChangeUnit" />
    </a-form-item>
  </div>
</template>
<script lang="ts" setup name="YAxisSetting">
import { ref } from 'vue'
import ColorPickerPopHover from '@/components/ChartGenerator/MakeChart/components/ColorPicker/ColorPickerPopHover.vue'
import LeftSelect from '../components/LeftSelect.vue'

const props = defineProps({
  yAxis: Object,
  grid: Object,
  title: String
})

const onChangeColor = (color) => {
  props.yAxis.title.textStyle.color = color
}

const onChangeAxisLineShow = (val) => {
  props.yAxis.axisLine.lineStyle.color = val ? '#888' : ''
}

const onChangeCustomLabel = (val) => {
  if (!val) {
    props.yAxis.axisLabel.customLabel.scale = 1
    props.yAxis.axisLabel.customLabel.unit = ''
  }
}

const onChangeScale = (val) => {
  console.log(val)
}

const onChangeUnit = (e) => {
  const val = e.target.value
}
</script>
<style lang="less">
.YAxisSetting {
  .title {}
}
</style>
