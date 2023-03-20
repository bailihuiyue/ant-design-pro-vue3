<template>
  <a-form class="dynamicForm" :model="formModel">
    <a-row :gutter="24">
      <template v-for="({ type, label, options, onChange, name }) in formProps" :key="name">
        <a-col :span="24 / colNumber">
          <a-form-item :name="name">
            <template #label>
              <span>{{ label }}</span>
            </template>
            <a-input v-model:value="formModel[name]" style="width:100%" v-if="type === 'input'" />
            <a-select v-model:value="formModel[name]" style="width:100%" @change="onFieldChange($event, onChange)"
              v-else-if="type === 'select'" :allowClear="true">
              <a-select-option v-for="item in options" :key="item.value" :label="item.label">{{ item.label
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </template>
    </a-row>
    <slot name="zidingyi"></slot>
  </a-form>
</template>
<script lang='ts' setup name="DynamicForm">
const props = defineProps({
  disabledAll: {
    type: Boolean,
    default: true,
    required: false
  },
  formProps: {
    default: [],
    required: true
  },
  // 列数,默认每行2列
  colNumber: {
    type: Number,
    default: 2,
    required: false
  },
  formModel: {
    type: Object,
    default: {},
    required: true
  },
})
const formProps = props.formProps
const onFieldChange = (value, fn) => {
  if (fn) {
    fn(value)
  }
}
</script>
<style lang='less'>
</style>
