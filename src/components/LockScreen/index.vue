<template>
  <section class="LockScreen" v-if="lockScreen" :class="afterUnlock">
    <div
      class="bg"
      :class="isClickedUnlockBtn?'unlockClicked':''"
      :style="{backgroundImage: `url(${lockImg})`}"
    ></div>
    <div class="content">
      <!-- 点击解锁后出现输入框 -->
      <div class="iptPassword" v-if="isClickedUnlockBtn">
        <!-- <UserOutlined style="color:grey" class="avatar" /> -->
        <img :src="userinfo.avatar" class="avatar" />
        <div class="username">{{userinfo.username}}</div>
        <a-input-search
          v-model:value="password"
          placeholder="密码"
          style="width: 300px"
          @search="onUnlockScreen"
        >
          <template #enterButton>
            <a-button type="link">
              <template #icon>
                <div class="ArrowRightOutlined">
                  <ArrowRightOutlined />
                </div>
              </template>
            </a-button>
          </template>
        </a-input-search>
        <div class="wrongPwd" v-if="isWrongPwd">密码不正确</div>
      </div>
      <!-- 未点击解锁可修改背景图片 -->
      <a-upload :before-upload="onChangeBg" :showUploadList="false" v-else>
        <div class="uploadTxt">
          <SearchOutlined class="changeBg" />
          <div class="txt">点击更换背景图片</div>
        </div>
      </a-upload>
      <!-- 左下角时间 -->
      <div class="timeZone">
        <div class="currentTime">{{currentTime}}</div>
        <div class="dateTime">{{dateTime}}</div>
      </div>
      <!-- 右下角三个按钮 -->
      <div class="deviceStatus">
        <!-- 是否联网 -->
        <span class="onlineStatus">
          <img src="/icons/onLine.ico" v-show="isOnline" />
          <img src="/icons/offLine.ico" v-show="!isOnline" />
        </span>
        <!-- 是否充电 -->
        <SvgIcon
          :name="charging?'batteryCharge':'battery'"
          color="#fff"
          width="33px"
          height="33px"
          class="charge"
        />
        <!-- 解锁按钮 -->
        <a-tooltip>
          <template #title>{{isClickedUnlockBtn?'返回':'点击解锁'}}</template>
          <LockOutlined class="unlock" @click="onClickLockBtn" v-if="isClickedUnlockBtn" />
          <UnlockOutlined class="unlock" @click="onClickUnlockBtn" v-else />
        </a-tooltip>
      </div>
    </div>
  </section>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { lockScreen } from '@/store/useSiteSettings'
import { SET_LOCK_SCREEN } from '@/store/mutation-types'
import indexdb from '@/utils/indexDB'
import moment from 'moment'
import { getWeek } from '@/utils/util'
import { useBattery, useNetwork } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon/index.vue'
import {
  SearchOutlined,
  UnlockOutlined,
  LockOutlined,
  ArrowRightOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import { USER_INFO } from '@/store/mutation-types'
import ls from '@/utils/Storage'
import * as api from './service'

const userinfo = ls.get(USER_INFO)
const initBg =
  'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g6/M00/03/0B/ChMkKWECB-OIKeSVAFU590PRoH0AASPhQB7J0oAVToP393.jpg'

export default defineComponent({
  name: 'LockScreen',
  components: {
    SvgIcon,
    SearchOutlined,
    UnlockOutlined,
    LockOutlined,
    ArrowRightOutlined,
    UserOutlined
  },
  setup() {
    const { state, commit } = useStore()
    const isClickedUnlockBtn = ref(false)
    const onClickUnlockBtn = () => {
      isClickedUnlockBtn.value = true
    }
    const onClickLockBtn = () => {
      isClickedUnlockBtn.value = false
    }

    // 获取锁屏壁纸
    const lockImg = ref(null)
    onMounted(async () => {
      setTimeout(async () => {
        const bg = await indexdb.get('lockImg')
        lockImg.value = bg?.value || initBg
      }, 100)
    })

    // 获取左下角日期时间
    const getDateTime = () => {
      const week = moment().weekday()
      const formatedWeek = getWeek(week, false)
      const day = moment().date()
      const month = moment().month() + 1
      return month + '月' + day + '日' + ', ' + formatedWeek
    }
    const dateTime = ref(getDateTime())
    const currentTime = ref(moment().format('HH:mm'))
    setInterval(() => {
      currentTime.value = moment().format('HH:mm')
      dateTime.value = getDateTime()
    }, 1000)

    // 获取电池状态
    const { charging } = useBattery()
    // 获取网络状态
    const { isOnline } = useNetwork()

    const onChangeBg = (file) => {
      if (file.type.indexOf('image') < 0) {
        alert('只能传图片!')
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        indexdb.set('lockImg', this.result)
        lockImg.value = this.result
      }
      return false
    }

    const password = ref()
    const isWrongPwd = ref(false)
    const afterUnlock = ref()

    const onUnlockScreen = async () => {
      const res = await api.userLogin({ username: userinfo.username, password: password.value })
      if (!password.value) {
        isWrongPwd.value = true
        return false
      } else {
        isWrongPwd.value = false
      }
      if (res) {
        if (res.unlocked) {
          afterUnlock.value = 'afterUnlock'
          setTimeout(() => {
            commit('SET_LOCK_SCREEN', false)
            afterUnlock.value = null
            isWrongPwd.value = false
            isClickedUnlockBtn.value = false
            password.value = null
          }, 300)
        } else {
          isWrongPwd.value = true
        }
      } else {
        isWrongPwd.value = true
      }
    }

    return {
      lockScreen,
      onClickUnlockBtn,
      lockImg,
      currentTime,
      dateTime,
      charging,
      isOnline,
      onChangeBg,
      isClickedUnlockBtn,
      onClickLockBtn,
      userinfo,
      onUnlockScreen,
      password,
      isWrongPwd,
      afterUnlock
    }
  }
})
</script>
<style lang="less" scoped>
.afterUnlock{
  opacity: 0 !important;
  transition: opacity 0.3s;
}
.LockScreen {
  opacity: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 106;
  overflow: hidden;
  .bg {
    width: 100%;
    position: absolute;
    z-index: 1;
    background-color: #fff;
    background-size: 100% auto;
    background-repeat: no-repeat;
    height: 100%;
  }
  .unlockClicked {
    transform: scale(1.1);
    filter: blur(10px);
    transition: all 0.1s;
  }
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    .iptPassword {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .avatar {
        width: 130px;
        height: 130px;
        background-color: #e8eceb;
        border-radius: 50%;
        font-size: 80px;
        line-height: 130px;
        padding: 5px;
      }
      .username {
        color: #fff;
        font-size: 40px;
        margin: 10px auto 15px auto;
      }
      .wrongPwd {
        color: #f88070;
        font-size: 16px;
        text-align: left;
        margin: 5px 0;
        width: 100%;
      }
      ::v-deep(.ant-input) {
        border-radius: 0;
        &:hover {
          border-color: grey;
        }
      }
      .ant-btn.ant-btn-link {
        width: 32px;
        height: 32px;
        background-color: grey;
        border: 2px solid #fff;
        &:hover {
          color: #fff;
          border-color: #fff;
        }
        .ArrowRightOutlined {
          color: #fff;
          &:hover {
            color: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }
    .uploadTxt {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 45%;
      top: 50%;
      color: #fff;
      &:hover {
        color: #0094ff;
      }
      .changeBg {
        font-size: 20px;
        cursor: pointer;
        margin-right: 15px;
      }
      .txt {
        cursor: pointer;
      }
    }
    .timeZone {
      position: absolute;
      bottom: 50px;
      left: 20px;
      color: #fff;
      .currentTime {
        font-size: 100px;
        font-weight: 100;
        height: 90px;
        line-height: 90px;
      }
      .dateTime {
        font-size: 60px;
        font-weight: 300;
      }
    }
    .deviceStatus {
      position: absolute;
      bottom: 30px;
      right: 50px;
      .onlineStatus {
        margin-right: 20px;
        display: inline-block;
        img {
          width: 25px;
          height: 25px;
        }
      }
      .onlineStatus,
      .charge,
      .unlock {
        vertical-align: middle;
      }
      .unlock {
        font-size: 23px;
        color: #fff;
        margin-left: 20px;
        font-weight: 500;
        &:hover {
          color: #0094ff;
        }
      }
    }
  }
}
</style>
