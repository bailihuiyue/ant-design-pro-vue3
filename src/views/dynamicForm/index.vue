<template>
  <div class="DynamicFormDemo">
    <a-alert style="margin-bottom:15px" message="提供一个思路,在表单内容较多时可以使用配置文件自动生成表单内容,精简版demo已写好,可自行扩展" />
    <DynamicForm :formProps="formProps" :formModel="formModel" :colNumber="1" :disabledAll="disabledAll"
      labelAlign="left">
      <template #zidingyi>
        <div>这里可以写一个自定义组件{{ formModel.input}}</div>
      </template>
    </DynamicForm>
  </div>
</template>
<script lang='ts' setup name="DynamicFormDemo">
import { ref } from 'vue'
import DynamicForm from '@/components/FormComponents/DynamicForm.vue'

const onSelectchange = (val) => {
  formModel.value.input = val
}

const formProps = ref([
  {
    name: 'select',
    type: 'select',
    label: '下拉框',
    hidden: false,
    disabled: false,
    rules: undefined,
    allowClear: false,
    options: [{ label: 1, value: 1 }, { label: 2, value: 2 }],
    onChange: onSelectchange
  },
  {
    name: 'input',
    type: 'input',
    label: '输入框',
    hidden: false,
    disabled: false,
    rules: undefined,
  },
])
const formModel = ref({ select: undefined, input: undefined })

const disabledAll = ref(false)

</script>
<style lang='less'>
.DynamicFormDemo {
  width: 350px;
}
</style>
