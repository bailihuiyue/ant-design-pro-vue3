<template>
  <div class="PieSetting">
    <a-form layout="horizontal" :model="form">
      <a-form-item label="主标题">
        <a-input v-model:value="form.text" />
      </a-form-item>
      <a-form-item label="副标题">
        <a-input v-model:value="form.subtext" />
      </a-form-item>
      <a-form-item label="图表名称">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="占用空间(1-24)">
        <a-input-number v-model:value="form.span" :min="1" :max="24" />
      </a-form-item>
      <a-form-item label="接口地址">
        <a-input v-model:value="form.interfaceUrl" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSaveSetting">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, Ref, watch, nextTick } from 'vue';
import _ from 'lodash'
export default defineComponent({
  name: 'PieSetting',
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
    const form = reactive({ text: '', subtext: '', span: 0, name: '', interfaceUrl: '' })
    watch(
      () => props.item,
      () => {
        nextTick(() => {
          form.text = _.cloneDeep(props.item.chartOption.title.text)
          form.subtext = _.cloneDeep(props.item.chartOption.title.subtext)
          form.interfaceUrl = _.cloneDeep(props.item.interfaceUrl)
          form.span = _.cloneDeep(props.item.span)
          form.name = _.cloneDeep(props.item.chartOption.series[0].name)
        })
      },
      { deep: true, immediate: true }
    );
    const onSaveSetting = () => {
      emit('save', (item: Ref<any>) => {
        item.value.chartOption.title.text = form.text
        item.value.chartOption.title.subtext = form.subtext
        item.value.span = form.span
        item.value.chartOption.series[0].name = form.name
        item.value.interfaceUrl = form.interfaceUrl
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
.PieSetting {
}
</style>
