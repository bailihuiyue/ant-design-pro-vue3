<template>
  <div class="Settings">
    <BarSetting
      :item="item"
      :index="index"
      v-if="item.chartType===chartType.bar"
      @save="onSaveSetting"
    />
    <LineSetting
      :item="item"
      :index="index"
      v-if="item.chartType===chartType.line"
      @save="onSaveSetting"
    />
    <PieSetting
      :item="item"
      :index="index"
      v-if="item.chartType===chartType.pie"
      @save="onSaveSetting"
    />
    <CustomSetting
      :item="item"
      :index="index"
      v-if="item.chartType===chartType.custom"
      @save="onSaveSetting"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent} from 'vue';
import BarSetting from './BarSetting.vue'
import LineSetting from './LineSetting.vue'
import PieSetting from './PieSetting.vue'
import CustomSetting from './CustomSetting.vue'
import { chartType } from '../../types'

export default defineComponent({
  name: 'Settings',
  components: { BarSetting, LineSetting, PieSetting, CustomSetting },
  props: {
    item: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: -1
    },
  },
  setup(props, { emit }) {
    const onSaveSetting = (fun: () => {}) => {
      emit('save', fun)
    }
    return {
      chartType,
      onSaveSetting
    };
  },
})
</script>
<style lang="scss">
.Settings {
  padding-left: 5px;
}
</style>
