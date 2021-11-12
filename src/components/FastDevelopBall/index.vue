<template>
  <div class="FastDevelopBall">
    <p id="tz">aaaaa</p>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted } from "vue";
import useMove from "@/hooks/mouseMove";

export default {
  name: "about",
  setup() {
    const data = reactive({});

    onMounted(() => {
      const el = document.getElementById("tz");
      useMove(el);
    });

    const datas = toRefs(data);
    return {
      ...datas,
    };
  },
};
</script>
<style scoped>
#tz {
  width: 100px;
  height: 100px;
  top: calc(90% - 100px);
  left: calc(90% - 100px);
  z-index: 99999;
}
p {
  width: 100px;
  height: 100px;
  background: pink;
  margin: 0;
}
</style>
