<template>
  <div v-if="useBall">
    <a-tooltip>
      <template #title>仿造umi ui做的一个用途图形界面操作命令行的球,生产环境下不会出现</template>
      <div class="FastDevelopBall" id="FastDevelopBall">
        <SvgIcon name="logo" width="30px" height="30px" @click="onShowFastDevelopModal" />
      </div>
    </a-tooltip>
    <FastDevelopModal :isShow="showModal" @close="() => (this.showModal = false)" />
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue'
import useMove from '@/hooks/mouseMove'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { isDev } from '@/utils/util'
import FastDevelopModal from './FastDevelopModal.vue'

export default {
  name: 'about',
  components: {
    SvgIcon,
    FastDevelopModal
  },
  setup() {
    const showModal = ref(false)
    const useBall = isDev && (import.meta.env.MODE === 'UseFastDevelopBall')
    onMounted(() => {
      if (useBall) {
        const el = document.getElementById('FastDevelopBall')
        useMove(el)
      }
    })
    const onShowFastDevelopModal = () => {
      showModal.value = true
    }
    return {
      useBall,
      showModal,
      onShowFastDevelopModal
    }
  }
}
</script>
<style scoped>
.FastDevelopBall {
  width: 50px;
  height: 50px;
  top: calc(90% - 100px);
  left: calc(90% - 100px);
  z-index: 99999;
  border: 3px solid #0094ff;
  border-radius: 50%;
  padding: 6.5px 0 0 6.5px;
  cursor: pointer;
  background-color: azure;
}
</style>
