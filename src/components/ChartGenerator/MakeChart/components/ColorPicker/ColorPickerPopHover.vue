<template>
  <a-popover
    :title="$t('自定义颜色')"
    overlayClassName="themeColorCustomColor"
    placement="bottomRight"
  >
    <template #content>
      <ColorPicker
        @change="onChangeColor"
        format="hex"
        disableHistory
        disableAlpha
        disableColorInput
      />
    </template>
    <div class="ColorPickerPopHoverTagWrapper">
      <a-tag :color="value" class="colorBlock" />
    </div>
  </a-popover>
</template>
<script lang="ts" setup name="XAxisSetting">
import { ref } from 'vue'
import ColorPicker from './index.vue'

const props = defineProps(['value'])

const emit = defineEmits(['change', 'update:value'])
const onChangeColor = (val) => {
  emit('change', val)
  emit('update:value', val)
}
</script>
<style lang="less">
.ColorPickerPopHoverTagWrapper {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1px;
  .colorBlock {
    width: 15px;
    height: 15px;
    margin: 0;
  }
}
</style>
