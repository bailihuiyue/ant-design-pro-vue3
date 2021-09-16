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
import { ref, reactive, onMounted, toRefs } from 'vue'
import SelectSkillAndInterst from './SelectSkillAndInterst.vue'
import * as api from '../service'
import { separator } from '@/utils/util'
import { useMessage } from '@/hooks/useMessage'
import { getPersonDetail } from '../hooks'
import { UpdateUserLabel, UserInfo } from '../types'
import { PERMISSION } from '@/store/mutation-types'
import Vue from 'vue'

export default {
  components: {
    SelectSkillAndInterst
  },
  setup(props, { root }) {
    const loading = ref(false)
    const visible = ref(false)
    const allSkills = ref([])
    const allInterest = ref([])
    let userInfo = reactive<Partial<UserInfo>>({})

    onMounted(() => {
      // TODO:在login页面(未登录)时,不获取personDetail,需要优化方案,不使用setTimeout
      setTimeout(async () => {
        if (location.pathname.indexOf('user/login') < 0) {
          const v: any = Vue
          const permisson = v.ls.get(PERMISSION)
          loading.value = true
          const res = await getPersonDetail()
          if (!res.userInfo.skills.length) {
            allSkills.value = res.allSkills
            allInterest.value = res.allInterest
            userInfo = res.userInfo
            visible.value = true
          }
          loading.value = false
        }
      }, 500)
    })

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
