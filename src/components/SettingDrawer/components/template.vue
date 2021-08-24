<template>
  <div>

  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { TOGGLE_THEME } from '@/store/mutation-types'
import { navTheme } from '@/store/useSiteSettings'
import { CheckOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    CheckOutlined
  },
  setup() {
    const { commit } = useStore()

    const handleMenuTheme = (theme) => {
      commit(TOGGLE_THEME, theme)
    }
    return {
      handleMenuTheme,
      navTheme
    }
  }
})
</script>
<style lang="less">

</style>
