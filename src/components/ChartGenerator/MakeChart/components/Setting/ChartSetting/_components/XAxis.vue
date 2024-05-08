<template>
  <div class="XAxisSetting">
    <a-form-item :label="$t('显示x轴')" name="show" :rules="null">
      <a-switch v-model:checked="xAxis.show" />
    </a-form-item>
    <a-form-item :label="$t('Id')" name="id" :rules="null">
      <a-input v-model:value="xAxis.id" />
    </a-form-item>
    <a-form-item :label="$t('坐标轴名称')" name="name" :rules="null">
      <a-input v-model:value="xAxis.name" @change="onChangeName" />
    </a-form-item>
    <a-form-item :label="$t('轴名称颜色')" name="nameTextStyleColor" :rules="null">
      <a-input v-model:value="xAxis.nameTextStyle.color">
        <template #suffix>
          <ColorPickerPopHover v-model:value="xAxis.nameTextStyle.color" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('刻度间隔')" name="interval" :rules="null">
      <a-slider v-model:value="xAxis.axisLabel.interval" :min="0" :max="6" />
    </a-form-item>
    <a-form-item :label="$t('文字颜色')" name="axisLabelColor" :rules="null">
      <a-input v-model:value="xAxis.axisLabel.color">
        <template #suffix>
          <ColorPickerPopHover v-model:value="xAxis.axisLabel.color" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('文字旋转')" name="rotate" :rules="null">
      <a-slider v-model:value="xAxis.axisLabel.rotate" :min="-90" :max="90" />
    </a-form-item>
    <a-form-item :label="$t('轴线颜色')" name="axisLineStyle" :rules="null">
      <a-input v-model:value="xAxis.axisLine.lineStyle.color">
        <template #suffix>
          <ColorPickerPopHover v-model:value="xAxis.axisLine.lineStyle.color" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('垂直分割线')" name="splitLineShow" :rules="null">
      <a-switch v-model:checked="xAxis.splitLine.show" />
    </a-form-item>
    <a-form-item :label="$t('垂直分割线样式')" name="splitLinelineStyle" :rules="null">
      <a-select v-model:value="xAxis.splitLine.lineStyle.type">
        <a-select-option value="solid"> 实线 </a-select-option>
        <a-select-option value="dashed"> 虚线 </a-select-option>
        <a-select-option value="dotted"> 点 </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="$t('轴底分割线')" name="axisTick" :rules="null">
      <a-switch v-model:checked="xAxis.axisTick.show" />
    </a-form-item>
    <!-- <a-form-item :label="$t('字体大小')" name="fontSize" :rules="null">
      <a-input-number
        style="width: 100%"
        v-model:value="xAxis.title.textStyle.fontSize"
        :min="1"
        :max="30"
      />
    </a-form-item> -->
    <!--     <LeftSelect v-model:value="xAxis.title.left" />
      <a-slider v-model:value="xAxis.title.padding" /> -->
    <!-- <a-form-item :label="$t('顶边距')" name="textAlign" :rules="null">
      <a-slider v-model:value="xAxis.title.padding" />
    </a-form-item> -->
  </div>
</template>
<script lang="ts" setup name="XAxisSetting">
import { ref } from 'vue'
import ColorPickerPopHover from '@/components/ChartGenerator/MakeChart/components/ColorPicker/ColorPickerPopHover.vue'
import LeftSelect from '../../components/LeftSelect.vue'

const props = defineProps({
  xAxis: Object,
  grid: Object
})

const onChangeColor = (color) => {
  props.xAxis.title.textStyle.color = color
}

const onChangeName = (e) => {
  props.grid.right = e.target.value.length * 12 + 15
}
</script>
<style lang="less">
.XAxisSetting {}
</style>
