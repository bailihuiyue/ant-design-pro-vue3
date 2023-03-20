<template>
  <div class="Logicflow">
    <a-button type="primary" @click="onSaveFlowData">保存</a-button>
    <LogicFlow ref="logicFlowRef" @parentNodes="onSetParentNodes" />
  </div>
</template>
<script lang='ts' setup name="Logicflow">
import { ref } from 'vue'
import LogicFlow from '@/components/LogicFlow/index.vue'
const logicFlowRef = ref()
const onSaveFlowData = () => {
  const data = logicFlowRef.value.getFlowJson()
  console.log(data)
}
const onSetParentNodes = data => {
  console.log(data)
}

</script>
<style lang='less'>
.Logicflow {}
</style>
