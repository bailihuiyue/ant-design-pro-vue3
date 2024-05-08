<template>
  <a-col :span="item.span||8" class="Warpper">
      <div class="continer" :class="selected?'selected':''">
        <div class="btns" v-if="selected">
            <DeleteOutlined @click="onDelItem()" class="delBtn" />
        </div>
        <slot></slot>
      </div>
  </a-col>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'Warpper',
  components: { DeleteOutlined },
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: {}
    },
    currentIndex: {
      type: Number,
      default: -1
    },
  },
  setup(props, { emit }) {
    const onDelItem = () => {
      emit('remove', props.currentIndex, props.item)
    }
    return {
      onDelItem
    };
  },
})
</script>
<style lang="scss">
.Warpper {
  width: 100%;
//   height: 200px;
  position: relative;
  .continer {
    // position: absolute;
    width: 100%;
    height: 100%;
    &.selected {
      border: 2px dashed #0094ff;
    }
    .btns {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 9;
      .delBtn {
        cursor: pointer;
        background-color: #0094ff;
        color: #fff;
        font-size: 16px;
        padding: 5px;
      }
    }
  }
}
</style>
