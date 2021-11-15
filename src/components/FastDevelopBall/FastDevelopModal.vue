<template>
  <a-modal
    v-model:visible="isShow"
    title="快速开发面板"
    :footer="null"
    @cancel="onCancel"
    width="60%"
  >
    <p :style="{ height: '400px' }">Some contents...</p>
  </a-modal>
</template>
<script lang="ts">
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const onCancel = () => {
      emit("close");
    };
    return {
      onCancel,
    };
  },
};
</script>
<style lang="less"></style>
