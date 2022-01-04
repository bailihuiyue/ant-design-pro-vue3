<template>
  <div :class="[prefixCls]">
    <span style="color: rgba(0,0,0,.65);" class="subtitle">
      <slot name="subtitle"></slot>
    </span>
    <div class="number-info-value">
      <span class="total">{{ total }}</span>
      <span class="sub-total">
        <span class="txt">{{ subTotal }}</span>
        <icon :type="`caret-${status}`" />
        <caret-up-outlined v-if="status==='up'" />
        <caret-down-outlined v-else />
      </span>
    </div>
  </div>
</template>

<script>
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'

export default {
  name: 'NumberInfo',
  components: {
    CaretUpOutlined,
    CaretDownOutlined
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-number-info'
    },
    total: {
      type: Number,
      required: true
    },
    subTotal: {
      type: Number,
      required: true
    },
    subTitle: {
      type: [String, Function],
      default: ''
    },
    status: {
      type: String,
      default: 'up'
    }
  }
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
