<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col
        :span="24"
        style="margin-bottom:15px"
      >
        <a-form layout="inline">
          <a-form-item
            :label="$t('account.id')"
            style="margin-right:40px"
          >
            <span>{{userInfo.employeeId}}</span>
          </a-form-item>
          <a-form-item label="邮箱">
            <span>{{userInfo.email}}</span>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col
        :md="24"
        :lg="18"
      >

        <!-- 更新表单 -->
        <a-form layout="vertical">
          <a-form-item :label="$t('account.nickname')">
            <a-input
              :placeholder="$t('account.giveAName')"
              v-model="nickname"
            />
          </a-form-item>
          <a-form-item :label="$t('account.signature')">
            <a-input
              placeholder="Talk is cheap. Show me the code."
              v-model="bio"
            />
          </a-form-item>

          <!-- 技能,爱好 -->
          <SelectSkillAndInterst
            @change="onSelectTag"
            @success="onAddSuccess"
            :userInfo="userInfo"
            :allSkills="allSkills"
            :allInterest="allInterest"
            size="middle"
          />

          <!-- 保存按钮 -->
          <a-form-item>
            <a-button
              type="primary"
              @click="onUpdatePersonDetail"
            >{{$t('account.updateBaseInfo')}}</a-button>
          </a-form-item>
        </a-form>

      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import SelectSkillAndInterst from './SelectSkillAndInterst.vue'
import { ref, reactive, onMounted, toRefs } from 'vue'
import { UserInfo } from '../types'

export default {
  props: ['userInfo', 'allSkills', 'allInterest'],
  components: {
    SelectSkillAndInterst
  },
  setup(props, { emit }) {
    const userInfo: Partial<UserInfo> = props.userInfo
    const nickname = ref<String>(userInfo.nickname)
    const bio = ref<String>(userInfo.bio)

    const skillsData:Partial<UserInfo>={
      skills: userInfo.skills,
      mySkills: userInfo.mySkills,
      interest: userInfo.interest,
      myInterest: userInfo.myInterest
    }

    const onAddSuccess = (data, type) => {
      skillsData[type === 'skills' ? 'mySkills' : 'myInterest'] = data
    }
    const onSelectTag = (tags, type) => {
      skillsData[type] = tags
    }

    const onUpdatePersonDetail = () => {
      emit('save', { ...skillsData, nickname: nickname.value, bio: bio.value })
    }

    return { onAddSuccess, onSelectTag, nickname, bio, skillsData, onUpdatePersonDetail }
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
