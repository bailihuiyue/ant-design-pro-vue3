<template>
  <div class="DraggerToolBar">
    <a-space>
      <a-tooltip>
        <template #title>{{ $t('删除') }}</template>
        <CloseOutlined @click.stop="onDelChart" v-if="!locked" style="color: #f50" />
      </a-tooltip>
      <a-tooltip>
        <template #title>{{ $t((locked ? '解锁' : '锁定') + '位置') }}</template>
        <UnlockOutlined @click.stop="onClickLock(false)" v-if="locked" style="color: #3883fa" />
        <LockOutlined @click.stop="onClickLock(true)" v-else style="color: #3883fa" />
      </a-tooltip>
    </a-space>
  </div>
</template>

<script lang="ts" setup name="DraggerToolBar">
import { ref, onMounted } from 'vue'
import { LockOutlined, UnlockOutlined, CloseOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  locked: Boolean
})
const emit = defineEmits(['lock', 'del'])
const onClickLock = (isLock) => {
  emit('lock', isLock)
}

const onDelChart = () => {
  emit('del')
}
</script>
<style lang="less">
.DraggerToolBar {
  position: absolute;
  top: -25px;
  right: 8px;
}
</style>
