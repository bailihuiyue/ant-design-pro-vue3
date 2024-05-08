<template>
  <div class="MakeChart">
    <a-button size="small" @click="showExcel = !showExcel">显示excel</a-button>
    <ChatAndExcel v-if="showExcel" />
    <OnlyChart v-else />
  </div>
</template>
<script lang="ts" setup name="MakeChart">
import { ref } from 'vue'
import ChatAndExcel from './ChatAndExcel.vue'
import OnlyChart from './OnlyChart.vue'

const showExcel = ref(true)
</script>
