<template>
  <a-checkable-tag :checked="checked" @change="onClickTag($event,name)">{{ name }}</a-checkable-tag>
</template>

<script>
import pull from 'lodash.pull'
import { ref } from 'vue'

export default {
  props: {
    name: {
      type: String,
      default: () => ''
    },
    defaultValue: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const checked = ref(props.defaultValue.includes(props.name))
    const onClickTag = (isChecked, name) => {
      checked.value = isChecked
      emit('tagChange', isChecked, name)
    }
    return {
      checked
    }
  }
}
</script>

<style lang="less" scoped>
.ant-tag.ant-tag-checkable {
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  margin-bottom: 10px;
}
.ant-tag-checkable-checked {
  background-color: #1890ff !important;
  border: 1px solid #1890ff !important;
}
</style>
