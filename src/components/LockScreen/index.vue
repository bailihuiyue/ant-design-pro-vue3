<template>
  <section v-if="lockScreen">
    <div class="LockScreen">
      锁屏{{lockScreen}}
      <div @click="onUnlockScreen">解锁</div>
    </div>
  </section>
</template>
<script>
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { lockScreen } from '@/store/useSiteSettings'
import { SET_LOCK_SCREEN } from '@/store/mutation-types'
import indexdb from '@/utils/indexDB'

export default defineComponent({
  name: 'LockScreen',
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
<style lang="less" scoped>
.LockScreen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  background-color: #fff;
}
</style>
