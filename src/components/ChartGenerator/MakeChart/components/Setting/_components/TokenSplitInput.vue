<template>
  <div class="TokenSplitInput" @click.stop="onClick">
    <div class="tags" v-for="(item, index) in value">
      {{ item }}<CloseOutlined class="remove" @click.stop="onRemove(item, index)" />
    </div>
    <input type="text" class="input" @keypress.enter="onPressEnter" v-model="iptStr" @click.stop />
  </div>
</template>
<script lang="ts" setup name="TokenSplitInput">
import { ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  value: {
    type: Array,
    default: []
  },
  spliter: {
    type: String,
    default: ','
  }
})

const iptStr = ref('')
const emit = defineEmits(['update:value', 'change'])
const onPressEnter = () => {
  const temp = iptStr.value.split(props.spliter).filter((item) => item)
  emit('update:value', [...props.value, ...temp])
  emit('change', [...props.value, ...temp])
  iptStr.value = ''
}

const onClick = (e) => {
  e.srcElement.querySelector('input').focus()
}

const onRemove = (item, index) => {
  props.value.splice(index, 1)
  emit('change', props.value)
}
</script>
<style lang="less">
.TokenSplitInput {
  min-height: 30px;
  line-height: 20px;
  margin: 0;
  padding: 2px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  flex-wrap: wrap;
  &:hover {
    border-color: #4096ff;
    border-inline-end-width: 1px;
  }
  .input {
    display: inline-block;
    border: none;
    width: 0;
    flex: auto;
    &:focus {
      outline: none;
    }
  }
  .tags {
    // pointer-events: none;
    display: inline-block;
    min-height: 24px;
    margin-top: 2px;
    margin-bottom: 2px;
    line-height: 22px;
    background: rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(5, 5, 5, 0.06);
    border-radius: 4px;
    margin-inline-end: 4px;
    padding-inline-start: 8px;
    padding-inline-end: 4px;
    word-break: break-all;
    font-size: 12px;
    .remove {
      display: inline-block;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      font-weight: bold;
      font-size: 10px;
      cursor: pointer;
      vertical-align: baseline;
      padding-left: 3px;
      pointer-events: all;
    }
  }
}
</style>
