<template>
  <a-result
    status="500"
    title="500"
  >
    <template #subTitle>
      <pre>
        {{ errorMsg || $t(title) }}
      </pre>
    </template>
    <template #extra>
      <a-button
        type="primary"
        @click="toHome"
      >
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Exception500',
  props: {
    title: {
      required: false,
      type: String,
      default: 'exception-Sorry, the server is reporting an error.'
    }
  },
  setup (props) {
    const toHome = () => {
      window.location.href = '/'
    }

    const router = useRouter()
    const { errorMsg } = router.currentRoute.value.params
    return { toHome, errorMsg }
  }
})
</script>
