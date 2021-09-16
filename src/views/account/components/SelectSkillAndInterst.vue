<template>
  <span>
    <!-- 技能 -->
    <a-form-item
      :label="$t('account.skills')"
      :required="false"
    >
      <TagsSelect
        :tags="allSkills"
        @change="onSelectTag"
        :defaultValue="userInfo.skills"
        type="skills"
        :size="size"
      />
      <AddNewTag
        @success="onAddSuccess"
        type="skills"
        :defaultAdded="userInfo.mySkills"
        :size="size"
      />
    </a-form-item>

    <!-- 爱好 -->
    <a-form-item
      :label="$t('account.interest')"
      :required="false"
      :size="size"
    >
      <TagsSelect
        :tags="allInterest"
        :defaultValue="userInfo.interest"
        @change="onSelectTag"
        type="interest"
        :size="size"
      />
      <AddNewTag
        @success="onAddSuccess"
        type="interest"
        :defaultAdded="userInfo.myInterest"
        :size="size"
      />
    </a-form-item>
  </span>
</template>

<script>
import AddNewTag from './TagsSelect/AddNewTag.vue'
import TagsSelect from './TagsSelect/index.vue'

export default {
  props: ['userInfo', 'size', 'allSkills', 'allInterest'],
  components: {
    AddNewTag,
    TagsSelect,
  },
  setup({ skills, interest, allSkills, allInterest }, { emit }) {
    const onAddSuccess = (data, type) => {
      emit('success', data, type)
    }
    const onSelectTag = (value, checked) => {
      emit('change', value, checked)
    }
    return { onAddSuccess, onSelectTag }
  },
}
</script>

<style>
</style>
