<template>
  <div class="logo">
    <router-link :to="{ name: 'dashboard' }">
      <SvgIcon name="logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script lang="ts" setup name="Logo">
import SvgIcon from '@/components/SvgIcon/index.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Ant Design Pro',
    required: false,
  },
  showTitle: {
    type: Boolean,
    default: true,
    required: false,
  },
})
</script>
