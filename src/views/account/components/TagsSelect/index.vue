<template>
  <span>
    <Tag
      :key="t"
      v-for="t in tags"
      @tagChange="onClickTag"
      :name="t"
      :defaultValue="defaultValue"
      :class="size"
    />
  </span>
</template>

<script>
import pull from 'lodash.pull'
import Tag from './Tag.vue'
import cloneDeep from 'lodash.clonedeep'

export default {
  props: ['tags', 'defaultValue', 'type', 'size'],
  components: {
    Tag,
  },
  data() {
    return {
      selectedTags: cloneDeep(this.defaultValue) || [],
    }
  },
  methods: {
    onClickTag(isChecked, name) {
      let temp = this.selectedTags
      if (!temp.includes(name)) {
        if (isChecked) {
          temp.push(name)
        }
      } else {
        if (!isChecked) {
          temp = pull(temp, name)
        }
      }
      this.selectedTags = temp
      this.$emit('change', temp, this.type)
    },
  },
}
</script>

<style lang="less" scoped>
.middle {
  height: 30px;
  line-height: 28px;
  font-size: 15px;
}
</style>
