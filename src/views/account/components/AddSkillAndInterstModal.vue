<template>
  <a-modal
    :title="$t('account.selectSkillAndInterst')"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="onOk"
    :closable="false"
    destroyOnClose
    :keyboard="false"
    width="700px"
  >
    <a-button
      slot="footer"
      @click="onOk"
      type="primary"
      :disabled="disabledBtn"
    >{{$t('account.saveAndClose')}}</a-button>
    <a-spin :spinning="loading"></a-spin>
    <SelectSkillAndInterst
      @change="onSelectTag"
      @success="onAddSuccess"
      :userInfo="userInfo"
      :allSkills="allSkills"
      :allInterest="allInterest"
      size="middle"
    />
  </a-modal>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
import SelectSkillAndInterst from './SelectSkillAndInterst.vue'
import * as api from '../service'
import { separator } from '@/utils/util'
import { useMessage } from '@/hooks/useMessage'
import { UpdateUserLabel, UserInfo } from '../types'

export default {
  components: {
    SelectSkillAndInterst
  },
  setup() {
    const loading = ref(false)
    const visible = ref(false)
    const allSkills = ref([])
    const allInterest = ref([])
    let userInfo = reactive<Partial<UserInfo>>({})

    const savedData: Partial<UpdateUserLabel> = {}
    const onAddSuccess = (data, type) => {
      savedData[type === 'skills' ? 'mySkills' : 'myInterest'] = data
    }
    const onSelectTag = (tags, type) => {
      savedData[type] = tags
      if (type === 'skills') {
        disabledBtn.value = tags.length ? false : true
      }
    }

    const confirmLoading = ref(false)
    const disabledBtn = ref(true)
    // ajax 保存数据
    const onOk = async () => {
      loading.value = true
      const data: Partial<UserInfo> = {
        id: userInfo.id,
        interest: savedData.interest && savedData.interest.join(separator),
        myInterest: savedData.myInterest && savedData.myInterest?.join(separator),
        mySkills: savedData.mySkills && savedData.mySkills?.join(separator),
        skills: savedData.skills.join(separator)
      }

      disabledBtn.value = !!data.interest

      const res = await api.updateUserLabel(data)
      if (res) {
        const { createMessage } = useMessage()
        createMessage.success(window.i18n.tc('common.saveSuccess'))
        visible.value = false
      }
      loading.value = false
    }

    return {
      visible,
      onAddSuccess,
      onSelectTag,
      confirmLoading,
      onOk,
      userInfo,
      loading,
      allSkills,
      allInterest,
      disabledBtn
    }
  }
}
</script>

<style>
</style>
