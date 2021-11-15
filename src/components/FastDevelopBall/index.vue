<template>
  <div v-if="isDev">
    <a-tooltip>
      <template #title>
        仿造umi ui做的一个用途图形界面操作命令行的球,生产环境下不会出现
      </template>
      <div class="FastDevelopBall" id="FastDevelopBall">
        <SvgIcon name="logo" width="40px" height="40px" @click="onShowFastDevelopModal" />
      </div>
    </a-tooltip>
    <FastDevelopModal :isShow="showModal" @close="() => (this.showModal = false)" />
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import useMove from "@/hooks/mouseMove";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { isDev } from "@/utils/util";
import FastDevelopModal from "./FastDevelopModal.vue";

export default {
  name: "about",
  components: {
    SvgIcon,
    FastDevelopModal,
  },
  setup() {
    const showModal = ref(false);
    onMounted(() => {
      if (isDev) {
        const el = document.getElementById("FastDevelopBall");
        useMove(el);
      }
    });
    const onShowFastDevelopModal = () => {
      showModal.value = true;
    };
    return {
      isDev,
      showModal,
      onShowFastDevelopModal,
    };
  },
};
</script>
<style scoped>
.FastDevelopBall {
  width: 50px;
  height: 50px;
  top: calc(90% - 100px);
  left: calc(90% - 100px);
  z-index: 99999;
  border: 1px solid #0094ff;
  border-radius: 50%;
  padding: 4.5px 0 0 4.5px;
  cursor: pointer;
}
</style>
