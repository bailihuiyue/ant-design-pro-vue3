<template>
  <a-tooltip>
    <template #title>{{ $t(txt) }}</template>
    <QuestionCircleOutlined style="margin-left: 5px;color: rgba(0,0,0,0.6);"/>
  </a-tooltip>
</template>
<script lang="ts" setup name="FormItemTooltip">
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  txt: {
    type: String,
    default: ' '
  }
})
</script>
