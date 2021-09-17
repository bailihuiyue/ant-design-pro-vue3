<template>
  <span class="AddNewTag">
    <a-tag closable @close="onCloseTag(t)" v-for="t in tags" :key="t" :class="size">{{t}}</a-tag>
    <a-input
      v-if="tagInputVisible"
      ref="tagInputDomRef"
      type="text"
      :class="size+'Ipt'"
      :value="tagInputValue"
      @change="handleInputChange"
      @blur="handleTagInputConfirm"
      @keyup.enter="handleTagInputConfirm"
    />
    <a-tag v-if="!tagInputVisible&&tagAddVisible" @click="showTagInput" :class="[size,'addTag']">
      <PlusOutlined/>
    </a-tag>
  </span>
</template>

<script>
import { ref, reactive, nextTick, onMounted } from 'vue'
import pull from 'lodash.pull'
import { PlusOutlined } from '@ant-design/icons-vue'

export default {
  props: {
    max: {
      type: Number,
      default: () => 5
    },
    type: {
      type: String,
      default: () => ''
    },
    defaultAdded: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: () => 'small'
    }
  },
  components: { PlusOutlined },
  setup({ max, type, defaultAdded }, { emit }) {
    onMounted(() => {
      if (tags.value.length >= max) {
        tagAddVisible.value = false
      }
    })

    const tags = ref(defaultAdded)
    // 点击新增标签
    const tagInputVisible = ref(false)
    const tagInputDomRef = ref(null)
    const showTagInput = () => {
      tagInputVisible.value = true
      nextTick(() => {
        tagInputDomRef.value.focus()
      })
    }

    // 输入内容
    const tagInputValue = ref('')
    const handleInputChange = (e) => {
      tagInputValue.value = e.target.value
    }

    // 保存数据
    const tagAddVisible = ref(true)
    const handleTagInputConfirm = () => {
      const inputValue = tagInputValue.value
      let inputedTags = tags.value
      if (inputValue && !inputedTags.includes(inputValue)) {
        inputedTags = [...inputedTags, inputValue]
      }

      tags.value = inputedTags
      if (tags.value.length >= max) {
        tagAddVisible.value = false
      }
      tagInputVisible.value = false
      tagInputValue.value = ''
      emit('success', inputedTags, type)
    }

    // 删除标签
    const onCloseTag = (name) => {
      tags.value = pull(tags.value, name)
      if (tags.value.length < max) {
        tagAddVisible.value = true
      }
      emit('success', tags.value, type)
    }

    return {
      tagInputVisible,
      tagInputValue,
      handleInputChange,
      handleTagInputConfirm,
      showTagInput,
      tagInputDomRef,
      tagAddVisible,
      tags,
      onCloseTag
    }
  }
}
</script>

<style lang="less">
.AddNewTag {
  .addTag {
    background: #fff;
    border-style: dashed;
    cursor: pointer;
  }
  .middle {
    height: 30px;
    line-height: 28px;
    font-size: 15px;
  }
  .smallIpt {
    width: 78px;
    height: 20px;
  }
  .middleIpt {
    width: 90px;
    height: 30px;
  }
}
.darkMode {
  .AddNewTag {
    .addTag {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
