<template>
  <a-result status="500" title="500">
    <template #subTitle>
      <pre>
        {{ errorMsg || $t(title) }}
      </pre>
    </template>
    <template #extra>
      <a-button type="primary" @click="toHome">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts" setup name="Exception500">
import { useRouter } from 'vue-router'
const props = defineProps({
  title: {
    required: false,
    type: String,
    default: 'exception-Sorry, the server is reporting an error.'
  }
})
const toHome = () => {
  window.location.href = '/'
}

const router = useRouter()
const { errorMsg } = router.currentRoute.value.params
</script>
