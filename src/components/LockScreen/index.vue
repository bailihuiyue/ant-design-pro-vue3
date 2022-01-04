<template>
  <div v-if="lockScreen">
    锁屏{{lockScreen}}
    <div @click="onUnlockScreen">解锁</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { lockScreen } from '@/store/useSiteSettings'
import { SET_LOCK_SCREEN } from '@/store/mutation-types'

export default defineComponent({
  setup() {
    const { state, commit } = useStore()
    const onUnlockScreen = () => {
      commit('SET_LOCK_SCREEN', false)
    }
    return {
      lockScreen,
      onUnlockScreen
    }
  }
})
</script>
<style lang="less">
</style>
