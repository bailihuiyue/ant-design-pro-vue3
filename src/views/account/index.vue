<template>
  <a-spin :spinning="loading">
    <div class="page-header-index-wide page-header-wrapper-grid-content-main">
      <a-row :gutter="24">
        <a-col
          :md="24"
          :lg="7"
        >
          <a-card :bordered="false">
            <div class="account-center-avatarHolder">
              <!-- 上传头像 -->
              <UploadAvatar
                @ok="setavatar"
                :defaultAvatar="userInfo.avatar"
                v-if="showBaseSetting"
              />
              <div class="username">{{userInfo.adAccount}}</div>
              <div class="bio">{{userInfo.bio}}</div>
            </div>

            <!-- 详情 -->
            <div class="account-center-detail">
              <p>
                <UserAddOutlined />{{userInfo.chineseName}}
              </p>
              <p>
                <SmileOutlined />{{userInfo.nickname}}
              </p>
              <p>
                <IdcardOutlined />{{userInfo.empPosition}}
              </p>
            </div>
            <a-divider />

            <!-- 技能 -->
            <div class="account-center-tags">
              <div class="tagsTitle">{{$t('account.skills')}}</div>
              <div>
                <a-tag
                  v-for="tag in userInfo.skills"
                  :key="tag"
                >{{ tag }}</a-tag>
                <a-tag
                  v-for="tag in userInfo.mySkills"
                  :key="tag"
                >{{ tag }}</a-tag>
              </div>
              <div
                class="tagsTitle"
                style="margin-top:10px"
              >{{$t('account.interest')}}</div>
              <div>
                <a-tag
                  v-for="tag in userInfo.interest"
                  :key="tag"
                >{{ tag }}</a-tag>
                <a-tag
                  v-for="tag in userInfo.myInterest"
                  :key="tag"
                >{{ tag }}</a-tag>
              </div>
            </div>
            <a-divider :dashed="true" />

            <!-- 团队 -->
            <div class="account-center-team">
              <div class="teamTitle">{{$t('account.team')}}</div>
              <div class="members">
                <a-row>
                  <a-col :span="12">
                    <a>
                      <a-avatar
                        size="small"
                        src="/account/levelOneDept.png"
                      />
                      <span class="member">{{ userInfo.levelOneDept }}</span>
                    </a>
                  </a-col>
                  <a-col :span="12">
                    <a>
                      <a-avatar
                        size="small"
                        src="/account/levelTwoDept.png"
                      />
                      <span class="member">{{ userInfo.levelTwoDept }}</span>
                    </a>
                  </a-col>
                  <a-col :span="24">
                    <a>
                      <a-avatar
                        size="small"
                        src="/account/levelThreeDept.png"
                      />
                      <span class="member">{{ userInfo.levelThreeDept }}</span>
                    </a>
                  </a-col>
                </a-row>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col
          :md="24"
          :lg="17"
        >
          <a-card
            style="width:100%"
            :bordered="false"
            :tabList="tabListNoTitle"
            :activeTabKey="noTitleKey"
            @tabChange="key => handleTabChange(key, 'noTitleKey')"
          >
            <BaseSetting
              :userInfo="userInfo"
              :allSkills="allSkills"
              :allInterest="allInterest"
              v-if="showBaseSetting"
              @save="onSaveBaseSetting"
            />
          </a-card>
        </a-col>
      </a-row>
    </div>
  </a-spin>
</template>

<script lang="ts">
import BaseSetting from './components/BaseSetting.vue'
import { ref, reactive, onMounted } from 'vue'
import { useMessage } from '@/hooks/useMessage'
import * as api from './service'
import UploadAvatar from './components/UploadAvatar.vue'
import { divisionStringToArray, separator } from '@/utils/util'
import { getPersonDetail } from './hooks'
import { UpdateUserLabel, UserInfo } from './types'
import { UserAddOutlined ,SmileOutlined,IdcardOutlined} from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

export default {
  components: {
    BaseSetting,
    UploadAvatar,
    UserAddOutlined,
    SmileOutlined,
    IdcardOutlined
  },
  setup() {
    const { t } = useI18n()

    const tabListNoTitle = [
      {
        key: 'baseInfo',
        tab: t('account.baseInfo')
      }
    ]
    const noTitleKey = 'baseInfo'

    let userInfo = ref<Partial<UserInfo>>({})

    const loading = ref<Boolean>(false)
    const allSkills = ref<String[]>([])
    const allInterest = ref<String[]>([])

    const showBaseSetting = ref<Boolean>(false)

    const getInitData: (param: Boolean) => void = async needAllAlbel => {
      loading.value = true
      const res = await getPersonDetail(needAllAlbel)
      if (needAllAlbel) {
        allSkills.value = res.allSkills
        allInterest.value = res.allInterest
      }
      userInfo.value = res.userInfo
      loading.value = false
      showBaseSetting.value = true
    }

    onMounted(() => {
      getInitData(true)
    })

    const setavatar = async url => {
      userInfo.value.avatar = url
      loading.value = true
      const res = await api.updatePersonDetail({ id: userInfo.value.id, avatar: url })
      if (res) {
        createMessage.success(t('common.uploadSuccess'))
      }
      loading.value = false
    }

    const { createMessage } = useMessage()
    const onSaveBaseSetting = async data => {
      if (!data.skills.length) {
        createMessage.error(t('account.needSkills'))
        return
      }
      loading.value = true
      const res = await api.updatePersonDetail({
        skills: data.skills.join(separator),
        mySkills: data.mySkills.join(separator),
        interest: data.interest.join(separator),
        myInterest: data.myInterest.join(separator),
        avatar: userInfo.value.avatar,
        id: userInfo.value.id,
        nickname: data.nickname,
        bio: data.bio
      })
      if (res) {
        createMessage.success('保存成功')
        getInitData(false)
      }
      loading.value = false
    }

    const handleTabChange = (key, type) => {}
    return {
      userInfo,
      setavatar,
      handleTabChange,
      tabListNoTitle,
      noTitleKey,
      allSkills,
      allInterest,
      showBaseSetting,
      onSaveBaseSetting,
      loading
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 10px;
      position: relative;
    }

    i {
      // position: absolute;
      // height: 14px;
      // width: 14px;
      // left: 0;
      // top: 4px;
      padding-right: 5px;
      // background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          // max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}

.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto 10px auto;
  width: 100%;
  max-width: 130px;
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
