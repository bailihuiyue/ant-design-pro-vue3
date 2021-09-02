<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
      <router-link
        v-if="item.name !== name"
        :to="{ path: item.path === '' ? '/' : item.path }"
      >{{ $t(item.meta.title) }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup(props) {
    const router = useRouter()
    const state = reactive<any>({ name: '', breadList: [] })

    const getBreadcrumb = () => {
      const route = router.currentRoute.value
      state.breadList = []
      // this.breadList.push({name: 'index', path: '/dashboard/', meta: {title: '首页'}})

      state.name = route.name
      route.matched.forEach((item) => {
        // item.name !== 'index' && this.breadList.push(item)
        state.breadList.push(item)
      })
    }

    watch(
      () => router.currentRoute.value,
      (newVal) => {
        getBreadcrumb()
      }
    )

    onMounted(() => {
      getBreadcrumb()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
