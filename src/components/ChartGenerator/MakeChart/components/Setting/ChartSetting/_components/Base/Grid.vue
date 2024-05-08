<template>
  <div class="GridSetting">
    <a-form-item :label="$t('上边距')" name="top" :rules="null">
      <a-slider v-model:value="grid.top" @change="onChangeTop" />
    </a-form-item>
    <a-form-item :label="$t('右边距')" name="right" :rules="null">
      <a-slider v-model:value="grid.right" />
    </a-form-item>
    <a-form-item :label="$t('下边距')" name="bottom" :rules="null">
      <a-slider v-model:value="grid.bottom" />
    </a-form-item>
    <a-form-item :label="$t('左边距')" name="left" :rules="null">
      <a-slider v-model:value="grid.left" />
    </a-form-item>
  </div>
</template>
<script lang="ts" setup name="GridSetting">
import { ref } from 'vue'
const props = defineProps({
  grid: Object,
  legend: Object
})

const onChangeTop = (val) => {
  props.grid.top = val
  props.legend.top = val - 35
}
</script>
<style lang="less">
.GridSetting {
}
</style>
