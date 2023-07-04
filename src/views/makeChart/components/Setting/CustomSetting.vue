<template>
  <div class="CustomSetting">
    <a-form layout="horizontal" :model="form">
      <a-form-item label="JSON配置">
        <a-textarea v-model:value="form.json" :autosize="{ minRows: 10, maxRows: 20 }" />
      </a-form-item>
      <a-form-item label="接口地址">
        <a-input v-model:value="form.interfaceUrl" />
      </a-form-item>
      <a-form-item label="占用空间(1-24)">
        <a-input-number v-model:value="form.span" :min="1" :max="24" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSaveSetting">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, Ref, watch, nextTick, getCurrentInstance } from 'vue';
import _ from 'lodash'
export default defineComponent({
  name: 'CustomSetting',
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
    const form = reactive({ json: '', interfaceUrl: '', span: 0 })
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    watch(
      () => props.item,
      () => {
        nextTick(() => {
          form.json = _.cloneDeep(JSON.stringify(props.item.chartOption, null, 2))
          form.span = _.cloneDeep(props.item.span)
          form.interfaceUrl = _.cloneDeep(props.item.interfaceUrl)
        })
      },
      { deep: true, immediate: true }
    );
    const onSaveSetting = () => {
      emit('save', (item: Ref<any>) => {
        proxy.$set(item.value, 'chartOption', eval("(" + _.cloneDeep(form.json) + ")"))
        item.value.interfaceUrl = form.interfaceUrl
        // item.value.json = form.json
        item.value.span = form.span
      })
    }
    return {
      form,
      onSaveSetting
    };
  },
})
</script>
<style lang="scss">
.CustomSetting {
}
</style>
