<template>
  <div class="TitleSetting">
    <a-form-item :label="$t('标题文字')" name="text" :rules="null">
      <a-input v-model:value="title.text" />
    </a-form-item>
    <a-form-item :label="$t('字体颜色')" name="color" :rules="null">
      <a-input v-model:value="title.textStyle.color">
        <template #suffix>
          <ColorPickerPopHover v-model:value="title.textStyle.color" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('字体加粗')" name="fontWeight" :rules="null">
      <a-select v-model:value="title.textStyle.fontWeight" style="width: 100%">
        <a-select-option value="normal">正常</a-select-option>
        <a-select-option value="bold">粗体</a-select-option>
        <a-select-option value="bolder">特粗</a-select-option>
        <a-select-option value="lighter">细体</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="$t('字体大小')" name="fontSize" :rules="null">
      <a-input-number style="width: 100%" v-model:value="title.textStyle.fontSize" :min="1" :max="30" />
    </a-form-item>
    <a-form-item :label="$t('标题位置')" name="textAlign" :rules="null">
      <LeftSelect v-model:value="title.left" />
    </a-form-item>
    <a-form-item :label="$t('顶边距')" name="textAlign" :rules="null">
      <a-slider v-model:value="title.padding" />
    </a-form-item>
  </div>
</template>
<script lang="ts" setup name="TitleSetting">
import { ref } from 'vue'
import ColorPickerPopHover from '@/components/ChartGenerator/MakeChart/components/ColorPicker/ColorPickerPopHover.vue'
import LeftSelect from '@/components/ChartGenerator/MakeChart/components/Setting/_components/LeftSelect.vue'

const props = defineProps({
  title: Object
})

const onChangeColor = (color) => {
  props.title.textStyle.color = color
}
</script>
<style lang="less">
.TitleSetting {}
</style>
