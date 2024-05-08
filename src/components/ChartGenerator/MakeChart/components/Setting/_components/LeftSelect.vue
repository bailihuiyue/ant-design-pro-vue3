<template>
  <a-select class="LeftSelect" :value="value" style="width: 100%" @change="onChange" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
    <a-select-option value="left">{{ $t('左对齐') }}</a-select-option>
    <a-select-option value="center">{{ $t('居中') }}</a-select-option>
    <a-select-option value="right">{{ $t('右对齐') }}</a-select-option>
  </a-select>
</template>
<script lang="ts" setup name="LeftSelect">
import {} from 'vue'

const props = defineProps({
  value: String
})

const emit = defineEmits(['update:value'])
const onChange = (val) => {
  emit('update:value', val)
}
</script>
<style lang="less">
.LeftSelect {
}
</style>
